import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Trash2 } from "lucide-react";
import {
  decrementCartItem,
  incrementCartItem,
  removeFromCart,
  toggleCartItem,
} from "../store/actions/shoppingCartActions";
import productPlaceholder from "../assets/images/vegan-milk.jpg";

export default function ShoppingCartPage() {
  const cart = useSelector((s) => s.shoppingCart.cart) || [];
  const dispatch = useDispatch();

  const productTotal = cart.reduce((sum, item) => {
    if (!item.checked) return sum;
    const price = Number(item.product?.price) || 0;
    return sum + price * item.count;
  }, 0);

  const shipping = productTotal > 0 ? 29.99 : 0;
  const discount = 0;
  const grandTotal = Math.max(0, productTotal + shipping - discount);

  const formatPrice = (value) =>
    new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY" }).format(value);

  return (
    <div className="w-full bg-white">
      <section className="w-full bg-[#FAFAFA]">
        <div className="max-w-[1070px] mx-auto px-4 py-[24px]">
          <h2 className="text-[24px] leading-[32px] tracking-[0.1px] font-bold text-[#252B42]">
            Sepetim
          </h2>
        </div>
      </section>

      <section className="w-full bg-white">
        <div className="max-w-[1070px] mx-auto px-4 py-[32px]">
          {cart.length === 0 ? (
            <div className="text-center text-[#737373] py-12">Sepet boş.</div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="flex-1 flex flex-col gap-4">
                <div className="hidden md:grid grid-cols-[40px_2.4fr_140px_140px_140px_60px] gap-4 text-[12px] font-bold text-[#737373]">
                  <div />
                  <div className="pl-4">Ürün</div>
                  <div className="text-center -ml-12">Fiyat</div>
                  <div className="text-center -ml-8" >Adet</div>
                  <div className="text-center -ml-10">Toplam</div>
                  <div />
                </div>

                {cart.map((item) => {
                  const product = item.product || {};
                  const image =
                    product?.images?.[0]?.url ||
                    product?.images?.[0] ||
                    product?.image ||
                    productPlaceholder;
                  const title = product?.name || product?.title || "Product";
                  const price = Number(product?.price) || 0;
                  const rowTotal = price * item.count;

                  return (
                    <div
                      key={product?.id}
                      className="grid grid-cols-1 md:grid-cols-[40px_1.4fr_140px_140px_140px_60px] gap-4 items-center bg-white border border-[#E6E6E6] rounded-[6px] p-4"
                    >
                      <div className="flex items-center justify-start md:justify-center">
                        <input
                          type="checkbox"
                          checked={!!item.checked}
                          onChange={() => dispatch(toggleCartItem(product?.id))}
                          className="w-4 h-4"
                          aria-label="Select product"
                        />
                      </div>

                      <div className="flex items-center gap-3">
                        <img
                          src={image}
                          alt={title}
                          className="w-[72px] h-[72px] object-cover rounded"
                        />
                        <div>
                          <div className="text-[14px] font-bold text-[#252B42]">{title}</div>
                          <div className="text-[12px] text-[#737373] line-clamp-2">
                            {product?.description || ""}
                          </div>
                        </div>
                      </div>

                      <div className="text-center text-[14px] font-bold text-[#252B42]">
                        {formatPrice(price)}
                      </div>

                      <div className="flex items-center justify-center gap-2">
                        <button
                          type="button"
                          className="w-[28px] h-[28px] rounded border border-[#E6E6E6] text-[#252B42]"
                          onClick={() => dispatch(decrementCartItem(product?.id))}
                          aria-label="Decrease count"
                          disabled={item.count <= 1}
                        >
                          -
                        </button>
                        <span className="w-[32px] text-center">{item.count}</span>
                        <button
                          type="button"
                          className="w-[28px] h-[28px] rounded border border-[#E6E6E6] text-[#252B42]"
                          onClick={() => dispatch(incrementCartItem(product?.id))}
                          aria-label="Increase count"
                        >
                          +
                        </button>
                      </div>

                      <div className="text-center text-[14px] font-bold text-[#F28F6B]">
                        {formatPrice(rowTotal)}
                      </div>

                      <div className="flex items-center justify-end md:justify-center">
                        <button
                          type="button"
                          className="text-[#737373] hover:text-[#F28F6B]"
                          onClick={() => dispatch(removeFromCart(product?.id))}
                          aria-label="Remove product"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="w-full lg:w-[320px]">
                <div className="sticky top-[24px] flex flex-col gap-4">
                  <div className="border border-[#E6E6E6] rounded-[6px] p-4 bg-white">
                    <div className="text-[16px] font-bold text-[#252B42] mb-3">
                      Sipariş Özeti
                    </div>
                    <div className="flex items-center justify-between text-[14px] text-[#737373] mb-2">
                      <span>Ürünlerin Toplamı</span>
                      <span className="font-bold text-[#252B42]">
                        {formatPrice(productTotal)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-[14px] text-[#737373] mb-2">
                      <span>Kargo Toplam</span>
                      <span className="font-bold text-[#252B42]">
                        {formatPrice(shipping)}
                      </span>
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
              <Link
                to="/order"
                className="h-[44px] bg-[#F28F6B] text-white rounded-[6px] font-bold flex items-center justify-center"
              >
                Create Order
              </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
