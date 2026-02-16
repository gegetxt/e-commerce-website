import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrdersThunk } from "../store/actions/thunks";

export default function PreviousOrdersPage() {
  const dispatch = useDispatch();
  const orders = useSelector((s) => s.client.orders) || [];

  useEffect(() => {
    dispatch(fetchOrdersThunk());
  }, [dispatch]);

  const formatPrice = (value) =>
    new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY" }).format(
      Number(value) || 0
    );

  return (
    <div className="w-full bg-white">
      <section className="w-full bg-[#FAFAFA]">
        <div className="max-w-[1050px] mx-auto px-4 py-[24px]">
          <h2 className="text-[24px] leading-[32px] tracking-[0.1px] font-bold text-[#252B42]">
            Önceki Siparişlerim
          </h2>
        </div>
      </section>

      <section className="w-full bg-white">
        <div className="max-w-[1050px] mx-auto px-4 py-[32px]">
          {orders.length === 0 ? (
            <div className="text-center text-[#737373] py-12">Henüz sipariş yok.</div>
          ) : (
            <div className="flex flex-col gap-4">
              <div className="hidden md:grid grid-cols-[120px_1fr_140px_120px] gap-4 text-[12px] font-bold text-[#737373]">
                <div>Sipariş No</div>
                <div>Tarih</div>
                <div className="text-center">Tutar</div>
                <div className="text-center">Adres</div>
              </div>

              {orders.map((order) => {
                const products = order.products || order.items || [];
                return (
                  <details
                    key={order.id}
                    className="border border-[#E6E6E6] rounded-[6px] p-4"
                  >
                    <summary className="grid grid-cols-1 md:grid-cols-[120px_1fr_140px_120px] gap-4 cursor-pointer">
                      <div className="text-[14px] font-bold text-[#252B42]">
                        #{order.id}
                      </div>
                      <div className="text-[14px] text-[#737373]">
                        {order.order_date || order.date || "-"}
                      </div>
                      <div className="text-center text-[14px] font-bold text-[#F28F6B]">
                        {formatPrice(order.price)}
                      </div>
                      <div className="text-center text-[14px] text-[#737373]">
                        {order.address_id || "-"}
                      </div>
                    </summary>

                    <div className="mt-4 border-t border-[#ECECEC] pt-4">
                      {products.length ? (
                        <div className="flex flex-col gap-3">
                          {products.map((item, idx) => (
                            <div
                              key={item.product_id || idx}
                              className="flex items-center justify-between text-[14px]"
                            >
                              <div className="text-[#252B42]">
                                Ürün #{item.product_id}
                                {item.detail ? ` - ${item.detail}` : ""}
                              </div>
                              <div className="text-[#737373]">Adet: {item.count}</div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-[14px] text-[#737373]">
                          Ürün detayları bulunamadı.
                        </div>
                      )}
                    </div>
                  </details>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
