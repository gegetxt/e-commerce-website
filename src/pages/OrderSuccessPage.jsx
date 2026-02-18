import { Check } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import productPlaceholder from "../assets/images/vegan-milk.jpg";

export default function OrderSuccessPage() {
  const location = useLocation();
  const totalPrice = location.state?.totalPrice;
  const orderItems = location.state?.orderItems || [];
  const orderNo = location.state?.orderNo || `#B${Date.now().toString().slice(-5)}`;

  const formatPrice = (value) =>
    Number.isFinite(Number(value))
      ? new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY" }).format(
          Number(value)
        )
      : null;

  const resolvedItems =
    orderItems.length > 0
      ? orderItems
      : [
          {
            id: "fallback-1",
            name: "Half Sleeve 100% Cotton Shirts",
            detail: "For Women",
            count: 1,
            price: 800,
            image: productPlaceholder,
          },
        ];

  const resolvedTotal =
    Number.isFinite(Number(totalPrice)) && Number(totalPrice) > 0
      ? Number(totalPrice)
      : resolvedItems.reduce((sum, item) => sum + (Number(item.price) || 0) * (item.count || 1), 0);

  return (
    <div className="w-full bg-[#F5F5F5]">
      <section className="w-full">
        <div className="max-w-[900px] mx-auto px-4 py-[56px] md:py-[72px] flex flex-col items-center text-center">
          <div className="w-[84px] h-[84px] rounded-full bg-[#58C28B] flex items-center justify-center">
            <Check size={48} className="text-white" strokeWidth={2.2} />
          </div>

          <h2 className="mt-8 text-[34px] leading-[42px] font-semibold text-[#111111]">
            Thank you for your purchase
          </h2>
          <p className="mt-3 text-[14px] md:text-[20px] text-[#3D3D3D] max-w-[620px]">
            We&apos;ve received your order will ship in 5-7 business days.
          </p>
          <p className="text-[26px] text-[#3D3D3D]">Your order number is {orderNo}</p>

          <div className="mt-10 w-full max-w-[620px] bg-[#F9F9F9] border border-[#E5E5E5] rounded-[14px] p-5 md:p-6 text-left">
            <h3 className="text-[30px] md:text-[38px] leading-[38px] font-semibold text-[#111111]">
              Order Summary
            </h3>

            <div className="mt-4">
              {resolvedItems.map((item, index) => (
                <div
                  key={`${item.id || item.name}-${index}`}
                  className={`flex items-center justify-between gap-3 py-3 ${
                    index !== resolvedItems.length - 1 ? "border-b border-[#E3E3E3]" : ""
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={item.image || productPlaceholder}
                      alt={item.name}
                      className="w-[68px] h-[68px] object-cover rounded-[4px] bg-white border border-[#ECECEC]"
                    />
                    <div className="min-w-0">
                      <p className="text-[14px] md:text-[15px] text-[#2A2A2A] leading-[20px] truncate">
                        {item.name}
                      </p>
                      <p className="text-[13px] text-[#555555] leading-[18px]">
                        {item.detail || "Qty"} {item.count > 1 ? `x${item.count}` : ""}
                      </p>
                    </div>
                  </div>
                  <p className="text-[24px] md:text-[30px] font-semibold text-[#111111] whitespace-nowrap">
                    {formatPrice((Number(item.price) || 0) * (item.count || 1))}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-2 pt-3 border-t border-[#E3E3E3] flex items-center justify-between">
              <span className="text-[24px] md:text-[32px] font-semibold text-[#111111]">Total</span>
              <span className="text-[26px] md:text-[36px] font-semibold text-[#111111]">
                {formatPrice(resolvedTotal)}
              </span>
            </div>
          </div>

          <Link
            to="/"
            className="mt-8 h-[52px] px-8 bg-[#23A6F0] rounded-[5px] text-[22px] md:text-[24px] font-bold text-white hover:bg-[#1e8fd1] transition-colors flex items-center justify-center"
          >
            Back to Home
          </Link>
        </div>
      </section>
    </div>
  );
}
