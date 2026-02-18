import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  createAddressThunk,
  deleteAddressThunk,
  fetchAddressListThunk,
  updateAddressThunk,
  createCardThunk,
  deleteCardThunk,
  fetchCardsThunk,
  updateCardThunk,
  createOrderThunk,
} from "../store/actions/thunks";
import { clearCart } from "../store/actions/shoppingCartActions";
import { toast } from "react-toastify";

const cities = [
  "istanbul",
  "ankara",
  "izmir",
  "bursa",
  "antalya",
  "adana",
  "konya",
  "gaziantep",
  "kocaeli",
  "mersin",
];

const emptyAddress = {
  title: "",
  name: "",
  surname: "",
  phone: "",
  city: "",
  district: "",
  neighborhood: "",
};

const emptyCard = {
  name_on_card: "",
  card_no: "",
  expire_month: "",
  expire_year: "",
  card_ccv: "",
};

const CVV_STORAGE_KEY = "cardCvvByNo";

export default function CreateOrderPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const addressList = useSelector((s) => s.client.addressList) || [];
  const creditCards = useSelector((s) => s.client.creditCards) || [];
  const cart = useSelector((s) => s.shoppingCart.cart) || [];

  const [step, setStep] = useState(1);
  const [sameAddress, setSameAddress] = useState(true);
  const [selectedShippingId, setSelectedShippingId] = useState(null);
  const [selectedReceiptId, setSelectedReceiptId] = useState(null);

  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [addressForm, setAddressForm] = useState(emptyAddress);

  const [showCardForm, setShowCardForm] = useState(false);
  const [editingCard, setEditingCard] = useState(null);
  const [cardForm, setCardForm] = useState(emptyCard);
  const [selectedCardId, setSelectedCardId] = useState(null);
  const [cardCvv, setCardCvv] = useState("");
  const [cvvMap, setCvvMap] = useState(() => {
    try {
      const raw = localStorage.getItem(CVV_STORAGE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    dispatch(fetchAddressListThunk());
    dispatch(fetchCardsThunk());
  }, [dispatch]);

  useEffect(() => {
    if (addressList.length && selectedShippingId == null) {
      setSelectedShippingId(addressList[0].id);
      setSelectedReceiptId(addressList[0].id);
    }
  }, [addressList, selectedShippingId]);

  useEffect(() => {
    if (creditCards.length && selectedCardId == null) {
      setSelectedCardId(creditCards[0].id);
    }
  }, [creditCards, selectedCardId]);
  useEffect(() => {
    if (selectedCardId != null) {
      const selected = creditCards.find((card) => card.id === selectedCardId);
      const savedCvv = selected?.card_no ? cvvMap[selected.card_no] : "";
      setCardCvv(savedCvv || "");
    }
  }, [creditCards, selectedCardId, cvvMap]);

  useEffect(() => {
    if (sameAddress) {
      setSelectedReceiptId(selectedShippingId);
    }
  }, [sameAddress, selectedShippingId]);

  const productTotal = useMemo(
    () =>
      cart.reduce((sum, item) => {
        if (!item.checked) return sum;
        const price = Number(item.product?.price) || 0;
        return sum + price * item.count;
      }, 0),
    [cart]
  );

  const shipping = productTotal > 0 ? 29.99 : 0;
  const discount = 0;
  const grandTotal = Math.max(0, productTotal + shipping - discount);

  const formatPrice = (value) =>
    new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY" }).format(value);

  const openNewAddressForm = () => {
    setEditingAddress(null);
    setAddressForm(emptyAddress);
    setShowAddressForm(true);
  };

  const openEditAddressForm = (address) => {
    setEditingAddress(address);
    setAddressForm({
      title: address.title || "",
      name: address.name || "",
      surname: address.surname || "",
      phone: address.phone || "",
      city: address.city || "",
      district: address.district || "",
      neighborhood: address.neighborhood || "",
    });
    setShowAddressForm(true);
  };

  const submitAddress = async (e) => {
    e.preventDefault();
    if (editingAddress?.id) {
      await dispatch(updateAddressThunk({ id: editingAddress.id, ...addressForm }));
    } else {
      await dispatch(createAddressThunk(addressForm));
    }
    setShowAddressForm(false);
    setEditingAddress(null);
    setAddressForm(emptyAddress);
  };

  const openNewCardForm = () => {
    setEditingCard(null);
    setCardForm(emptyCard);
    setCardCvv("");
    setShowCardForm(true);
  };

  const openEditCardForm = (card) => {
    setEditingCard(card);
    const savedCvv = card?.card_no ? cvvMap[card.card_no] : "";
    setCardForm({
      name_on_card: card.name_on_card || "",
      card_no: card.card_no || "",
      expire_month: card.expire_month || "",
      expire_year: card.expire_year || "",
      card_ccv: savedCvv || "",
    });
    setCardCvv(savedCvv || "");
    setShowCardForm(true);
  };

  const submitCard = async (e) => {
    e.preventDefault();
    const { card_ccv, ...cardPayload } = cardForm;
    const nextCvvMap = {
      ...cvvMap,
      ...(cardForm.card_no ? { [cardForm.card_no]: card_ccv } : {}),
    };
    let result;
    if (editingCard?.id) {
      result = await dispatch(updateCardThunk({ id: editingCard.id, ...cardPayload }));
    } else {
      result = await dispatch(createCardThunk(cardPayload));
    }
    if (result?.ok) {
      setCvvMap(nextCvvMap);
      localStorage.setItem(CVV_STORAGE_KEY, JSON.stringify(nextCvvMap));
    }
    setShowCardForm(false);
    setEditingCard(null);
    setCardForm(emptyCard);
    setCardCvv("");
  };

  const selectedCard = creditCards.find((card) => card.id === selectedCardId);

  const submitOrder = async () => {
    if (!selectedShippingId) {
      toast.error("Lütfen teslimat adresi seçin.");
      return;
    }
    if (!selectedCard) {
      toast.error("Lütfen bir kart seçin.");
      return;
    }
    if (!cardCvv) {
      toast.error("Lütfen CVV girin.");
      return;
    }

    const selectedCartItems = cart.filter((item) => item.checked);

    const products = selectedCartItems
      .filter((item) => item.checked)
      .map((item) => ({
        product_id: item.product?.id,
        count: item.count,
        detail: item.product?.detail || item.product?.name || "",
      }))
      .filter((p) => p.product_id);

    if (!products.length) {
      toast.error("Sipariş için en az bir ürün seçin.");
      return;
    }

    const payload = {
      address_id: selectedShippingId,
      order_date: new Date().toISOString(),
      card_no: selectedCard.card_no,
      card_name: selectedCard.name_on_card,
      card_expire_month: Number(selectedCard.expire_month),
      card_expire_year: Number(selectedCard.expire_year),
      card_ccv: Number(cardCvv),
      price: Number(grandTotal.toFixed(2)),
      products,
    };

    const result = await dispatch(createOrderThunk(payload));
    if (result.ok) {
      const selectedAddress = addressList.find((address) => address.id === selectedShippingId);
      const last4 = String(selectedCard.card_no || "").slice(-4);
      const orderItems = selectedCartItems.map((item) => ({
        id: item.product?.id,
        name: item.product?.name || item.product?.title || "Ürün",
        detail: item.product?.detail || "",
        count: item.count,
        price: Number(item.product?.price) || 0,
        image:
          item.product?.images?.[0]?.url ||
          item.product?.images?.[0] ||
          item.product?.image ||
          "",
      }));
      const generatedOrderNo = `#B${Date.now().toString().slice(-5)}`;

      toast.success("Siparişiniz başarıyla oluşturuldu. Teşekkürler!");
      dispatch(clearCart());
      setCardCvv("");
      navigate("/order-success", {
        replace: true,
        state: {
          orderNo: generatedOrderNo,
          totalPrice: grandTotal,
          itemCount: products.length,
          orderDate: payload.order_date,
          shippingAddress: selectedAddress
            ? `${selectedAddress.neighborhood}, ${selectedAddress.district} / ${selectedAddress.city}`
            : "",
          receiverName: selectedAddress
            ? `${selectedAddress.name} ${selectedAddress.surname}`
            : "",
          paymentMethod: last4 ? `**** **** **** ${last4}` : "",
          orderItems,
        },
      });
    } else {
      toast.error("Sipariş oluşturulamadı.");
    }
  };

  return (
    <div className="w-full bg-white">
      <section className="w-full bg-[#FAFAFA]">
        <div className="max-w-[1070px] mx-auto px-4 py-[24px]">
          <h2 className="text-[24px] leading-[32px] tracking-[0.1px] font-bold text-[#252B42]">
            Sipariş Oluştur
          </h2>
        </div>
      </section>

      <section className="w-full bg-white">
        <div className="max-w-[1070px] mx-auto px-4 py-[32px] flex flex-col lg:flex-row gap-6">
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <button
                type="button"
                onClick={() => setStep(1)}
                className={`h-[56px] border rounded-[6px] px-4 text-left ${
                  step === 1 ? "border-[#F28F6B] text-[#F28F6B]" : "border-[#E6E6E6]"
                }`}
              >
                <div className="text-[14px] font-bold">1 Adres Bilgileri</div>
                <div className="text-[12px] text-[#737373]">
                  Teslimat ve fatura adresini seç
                </div>
              </button>
              <button
                type="button"
                onClick={() => setStep(2)}
                className={`h-[56px] border rounded-[6px] px-4 text-left ${
                  step === 2 ? "border-[#F28F6B] text-[#F28F6B]" : "border-[#E6E6E6]"
                }`}
              >
                <div className="text-[14px] font-bold">2 Ödeme Seçenekleri</div>
                <div className="text-[12px] text-[#737373]">Kart bilgilerini seç</div>
              </button>
            </div>

            {step === 1 && (
              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-[18px] font-bold text-[#252B42]">Teslimat Adresi</h3>
                  <button
                    type="button"
                    className="text-[#23A6F0] text-[14px] font-bold"
                    onClick={openNewAddressForm}
                  >
                    + Yeni Adres Ekle
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {addressList.map((address) => (
                    <label
                      key={address.id}
                      className={`border rounded-[6px] p-4 flex gap-3 cursor-pointer ${
                        selectedShippingId === address.id ? "border-[#F28F6B]" : "border-[#E6E6E6]"
                      }`}
                    >
                      <input
                        type="radio"
                        name="shipping"
                        className="mt-1"
                        checked={selectedShippingId === address.id}
                        onChange={() => setSelectedShippingId(address.id)}
                      />
                      <div className="flex-1">
                        <div className="text-[14px] font-bold text-[#252B42]">
                          {address.title}
                        </div>
                        <div className="text-[12px] text-[#737373]">
                          {address.name} {address.surname}
                        </div>
                        <div className="text-[12px] text-[#737373]">
                          {address.neighborhood}, {address.district} / {address.city}
                        </div>
                        <div className="flex items-center gap-3 mt-2">
                          <button
                            type="button"
                            className="text-[12px] text-[#23A6F0]"
                            onClick={(e) => {
                              e.preventDefault();
                              openEditAddressForm(address);
                            }}
                          >
                            Düzenle
                          </button>
                          <button
                            type="button"
                            className="text-[12px] text-[#F28F6B]"
                            onClick={(e) => {
                              e.preventDefault();
                              dispatch(deleteAddressThunk(address.id));
                            }}
                          >
                            Sil
                          </button>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>

                <label className="flex items-center gap-2 text-[14px] text-[#737373]">
                  <input
                    type="checkbox"
                    checked={sameAddress}
                    onChange={(e) => setSameAddress(e.target.checked)}
                  />
                  Faturamı Aynı Adrese Gönder
                </label>

                {!sameAddress && (
                  <>
                    <div className="flex items-center justify-between">
                      <h3 className="text-[18px] font-bold text-[#252B42]">Fatura Adresi</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {addressList.map((address) => (
                        <label
                          key={address.id}
                          className={`border rounded-[6px] p-4 flex gap-3 cursor-pointer ${
                            selectedReceiptId === address.id
                              ? "border-[#F28F6B]"
                              : "border-[#E6E6E6]"
                          }`}
                        >
                          <input
                            type="radio"
                            name="receipt"
                            className="mt-1"
                            checked={selectedReceiptId === address.id}
                            onChange={() => setSelectedReceiptId(address.id)}
                          />
                          <div className="flex-1">
                            <div className="text-[14px] font-bold text-[#252B42]">
                              {address.title}
                            </div>
                            <div className="text-[12px] text-[#737373]">
                              {address.name} {address.surname}
                            </div>
                            <div className="text-[12px] text-[#737373]">
                              {address.neighborhood}, {address.district} / {address.city}
                            </div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </>
                )}

                {showAddressForm && (
                  <form
                    onSubmit={submitAddress}
                    className="border border-[#E6E6E6] rounded-[6px] p-4 bg-[#FAFAFA]"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[12px] font-bold text-[#252B42] mb-1">
                          Adres Başlığı
                        </label>
                        <input
                          value={addressForm.title}
                          onChange={(e) =>
                            setAddressForm((prev) => ({ ...prev, title: e.target.value }))
                          }
                          className="w-full h-10 border border-[#E6E6E6] rounded-[5px] px-3"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-[12px] font-bold text-[#252B42] mb-1">
                          Ad
                        </label>
                        <input
                          value={addressForm.name}
                          onChange={(e) =>
                            setAddressForm((prev) => ({ ...prev, name: e.target.value }))
                          }
                          className="w-full h-10 border border-[#E6E6E6] rounded-[5px] px-3"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-[12px] font-bold text-[#252B42] mb-1">
                          Soyad
                        </label>
                        <input
                          value={addressForm.surname}
                          onChange={(e) =>
                            setAddressForm((prev) => ({ ...prev, surname: e.target.value }))
                          }
                          className="w-full h-10 border border-[#E6E6E6] rounded-[5px] px-3"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-[12px] font-bold text-[#252B42] mb-1">
                          Telefon
                        </label>
                        <input
                          value={addressForm.phone}
                          onChange={(e) =>
                            setAddressForm((prev) => ({ ...prev, phone: e.target.value }))
                          }
                          className="w-full h-10 border border-[#E6E6E6] rounded-[5px] px-3"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-[12px] font-bold text-[#252B42] mb-1">
                          İl
                        </label>
                        <select
                          value={addressForm.city}
                          onChange={(e) =>
                            setAddressForm((prev) => ({ ...prev, city: e.target.value }))
                          }
                          className="w-full h-10 border border-[#E6E6E6] rounded-[5px] px-3"
                          required
                        >
                          <option value="">Seç</option>
                          {cities.map((city) => (
                            <option key={city} value={city}>
                              {city}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-[12px] font-bold text-[#252B42] mb-1">
                          İlçe
                        </label>
                        <input
                          value={addressForm.district}
                          onChange={(e) =>
                            setAddressForm((prev) => ({ ...prev, district: e.target.value }))
                          }
                          className="w-full h-10 border border-[#E6E6E6] rounded-[5px] px-3"
                          required
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-[12px] font-bold text-[#252B42] mb-1">
                          Mahalle / Adres Detayı
                        </label>
                        <textarea
                          value={addressForm.neighborhood}
                          onChange={(e) =>
                            setAddressForm((prev) => ({
                              ...prev,
                              neighborhood: e.target.value,
                            }))
                          }
                          className="w-full min-h-[88px] border border-[#E6E6E6] rounded-[5px] px-3 py-2"
                          required
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-3 mt-4">
                      <button
                        type="submit"
                        className="h-[40px] px-4 bg-[#23A6F0] text-white rounded-[5px] font-bold text-[14px]"
                      >
                        Kaydet
                      </button>
                      <button
                        type="button"
                        className="h-[40px] px-4 border border-[#E6E6E6] rounded-[5px] text-[14px]"
                        onClick={() => {
                          setShowAddressForm(false);
                          setEditingAddress(null);
                        }}
                      >
                        İptal
                      </button>
                    </div>
                  </form>
                )}

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="h-[44px] px-6 bg-[#F28F6B] text-white rounded-[6px] font-bold"
                  >
                    Kaydet ve Devam Et
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-[18px] font-bold text-[#252B42]">Kart Bilgileri</h3>
                  <button
                    type="button"
                    className="text-[#23A6F0] text-[14px] font-bold"
                    onClick={openNewCardForm}
                  >
                    + Yeni Kart Ekle
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {creditCards.map((card) => (
                    <label
                      key={card.id}
                      className={`border rounded-[6px] p-4 flex gap-3 cursor-pointer ${
                        selectedCardId === card.id ? "border-[#F28F6B]" : "border-[#E6E6E6]"
                      }`}
                    >
                      <input
                        type="radio"
                        name="card"
                        className="mt-1"
                        checked={selectedCardId === card.id}
                        onChange={() => setSelectedCardId(card.id)}
                      />
                      <div className="flex-1">
                        <div className="text-[14px] font-bold text-[#252B42]">
                          {card.name_on_card}
                        </div>
                        <div className="text-[12px] text-[#737373]">
                          **** **** **** {String(card.card_no || "").slice(-4)}
                        </div>
                        <div className="text-[12px] text-[#737373] mt-1">
                          {card.expire_month}/{card.expire_year}
                        </div>
                        <div className="flex items-center gap-3 mt-2">
                          <button
                            type="button"
                            className="text-[12px] text-[#23A6F0]"
                            onClick={(e) => {
                              e.preventDefault();
                              openEditCardForm(card);
                            }}
                          >
                            Düzenle
                          </button>
                          <button
                            type="button"
                            className="text-[12px] text-[#F28F6B]"
                            onClick={(e) => {
                              e.preventDefault();
                              dispatch(deleteCardThunk(card.id));
                            }}
                          >
                            Sil
                          </button>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>

                {showCardForm && (
                  <form
                    onSubmit={submitCard}
                    className="border border-[#E6E6E6] rounded-[6px] p-4 bg-[#FAFAFA]"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <label className="block text-[12px] font-bold text-[#252B42] mb-1">
                          Kart Üzerindeki İsim
                        </label>
                        <input
                          value={cardForm.name_on_card}
                          onChange={(e) =>
                            setCardForm((prev) => ({ ...prev, name_on_card: e.target.value }))
                          }
                          className="w-full h-10 border border-[#E6E6E6] rounded-[5px] px-3"
                          required
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-[12px] font-bold text-[#252B42] mb-1">
                          Kart Numarası
                        </label>
                        <input
                          value={cardForm.card_no}
                          onChange={(e) =>
                            setCardForm((prev) => ({ ...prev, card_no: e.target.value }))
                          }
                          className="w-full h-10 border border-[#E6E6E6] rounded-[5px] px-3"
                          required
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-[12px] font-bold text-[#252B42] mb-1">
                          CVV
                        </label>
                        <input
                          value={cardForm.card_ccv}
                          onChange={(e) => {
                            const nextValue = e.target.value;
                            setCardForm((prev) => ({ ...prev, card_ccv: nextValue }));
                            setCardCvv(nextValue);
                          }}
                          className="w-full h-10 border border-[#E6E6E6] rounded-[5px] px-3"
                          placeholder="123"
                          maxLength={4}
                        />
                      </div>
                      <div>
                        <label className="block text-[12px] font-bold text-[#252B42] mb-1">
                          Son Kullanma Ay
                        </label>
                        <input
                          value={cardForm.expire_month}
                          onChange={(e) =>
                            setCardForm((prev) => ({ ...prev, expire_month: e.target.value }))
                          }
                          className="w-full h-10 border border-[#E6E6E6] rounded-[5px] px-3"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-[12px] font-bold text-[#252B42] mb-1">
                          Son Kullanma Yıl
                        </label>
                        <input
                          value={cardForm.expire_year}
                          onChange={(e) =>
                            setCardForm((prev) => ({ ...prev, expire_year: e.target.value }))
                          }
                          className="w-full h-10 border border-[#E6E6E6] rounded-[5px] px-3"
                          required
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-3 mt-4">
                      <button
                        type="submit"
                        className="h-[40px] px-4 bg-[#23A6F0] text-white rounded-[5px] font-bold text-[14px]"
                      >
                        Kaydet
                      </button>
                      <button
                        type="button"
                        className="h-[40px] px-4 border border-[#E6E6E6] rounded-[5px] text-[14px]"
                        onClick={() => {
                          setShowCardForm(false);
                          setEditingCard(null);
                        }}
                      >
                        İptal
                      </button>
                    </div>
                  </form>
                )}

                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="h-[44px] px-6 border border-[#E6E6E6] rounded-[6px] font-bold text-[#252B42]"
                  >
                    Geri
                  </button>
                  <button
                    type="button"
                    className="h-[44px] px-6 bg-[#F28F6B] text-white rounded-[6px] font-bold"
                    onClick={submitOrder}
                  >
                    Ödeme Yap
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="w-full lg:w-[320px]">
            <div className="sticky top-[24px] flex flex-col gap-4">
              <div className="border border-[#E6E6E6] rounded-[6px] p-4 bg-white">
                <div className="text-[16px] font-bold text-[#252B42] mb-3">
                  Sipariş Özeti
                </div>
                <div className="flex items-center justify-between text-[14px] text-[#737373] mb-2">
                  <span>Ürünlerin Toplamı</span>
                  <span className="font-bold text-[#252B42]">{formatPrice(productTotal)}</span>
                </div>
                <div className="flex items-center justify-between text-[14px] text-[#737373] mb-2">
                  <span>Kargo Toplam</span>
                  <span className="font-bold text-[#252B42]">{formatPrice(shipping)}</span>
                </div>
                <div className="flex items-center justify-between text-[14px] text-[#737373] mb-2">
                  <span>İndirim</span>
                  <span className="font-bold text-[#F28F6B]">
                    -{formatPrice(discount)}
                  </span>
                </div>
                <div className="h-[1px] bg-[#ECECEC] my-3" />
                <div className="flex items-center justify-between text-[16px] font-bold text-[#252B42]">
                  <span>Toplam</span>
                  <span className="text-[#F28F6B]">{formatPrice(grandTotal)}</span>
                </div>
              </div>
              <button
                type="button"
                className="h-[44px] bg-[#F28F6B] text-white rounded-[6px] font-bold"
                onClick={submitOrder}
              >
                Create Order
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
