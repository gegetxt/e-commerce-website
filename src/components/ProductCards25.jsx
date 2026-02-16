import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { api } from "../api/axios";
import productPlaceholder from "../assets/images/vegan-milk.jpg";
import rightBannerImg from "../assets/images/right-banner.jpg";

export default function ProductCards25() {
  const [products, setProducts] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const categories = useSelector((s) => s.product.categories) || [];

  const tabs = ["Men", "Women", "Accessories"];

  const categoryMap = useMemo(() => {
    const map = new Map();
    categories.forEach((c) => {
      if (c?.id != null) {
        map.set(c.id, c.title || c.name || c.categoryName);
      }
    });
    return map;
  }, [categories]);

  useEffect(() => {
    let isMounted = true;
    const fetchTopProducts = async () => {
      try {
        const res = await api.get("/products");
        const list = res.data?.products || res.data || [];
        const top6 = [...list]
          .sort((a, b) => (b.sell_count ?? 0) - (a.sell_count ?? 0))
          .slice(0, 6);
        if (isMounted) setProducts(top6);
      } catch (e) {
        console.error(e);
        if (isMounted) setProducts([]);
      }
    };

    fetchTopProducts();
    return () => {
      isMounted = false;
    };
  }, []);

  const formatPrice = (value) =>
    Number.isFinite(Number(value))
      ? new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
          Number(value)
        )
      : "";
  
  return (
    <section className="w-full bg-white">
      <div className="w-full max-w-[1440px] mx-auto px-4 py-[48px]">
        <div className="w-full max-w-[1077px] mx-auto flex flex-col lg:flex-row gap-[30px] items-start">
          {/* LEFT: products area */}
          <div className="order-2 lg:order-1 w-full lg:w-[658px]">
            {/* Header row */}
            <div className="w-full">
              {/* desktop */}
              <div className="hidden md:flex items-center justify-between h-[50px]">
                <div className="font-bold text-[16px] leading-[24px] tracking-[0.1px] text-[#252B42] whitespace-nowrap">
                  BESTSELLER PRODUCTS
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-[15px]">
                    {tabs.map((t, i) => (
                      <button
                        key={t}
                        className={
                          "text-[14px] leading-[24px] tracking-[0.2px] font-bold px-4 py-2 rounded-[37px] " +
                          (i === activeTab ? "text-[#23A6F0]" : "text-[#737373]")
                        }
                        type="button"
                        onClick={() => setActiveTab(i)}
                        aria-pressed={i === activeTab}
                      >
                        {t}
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center gap-[15px]">
                    <button
                      type="button"
                      className="group w-[49px] h-[49px] border border-[#BDBDBD] rounded-[34px] flex items-center justify-center transition-colors duration-200 hover:border-[#737373]"
                      aria-label="Prev"
                      onClick={() =>
                        setActiveTab((prev) => (prev - 1 + tabs.length) % tabs.length)
                      }
                    >
                      <span className="text-[#BDBDBD] text-[18px] leading-none transition-colors duration-200 group-hover:text-[#737373]">
                        ‹
                      </span>
                    </button>
                    <button
                      type="button"
                      className="group w-[49px] h-[49px] border border-[#BDBDBD] rounded-[33px] flex items-center justify-center transition-colors duration-200 hover:border-[#737373]"
                      aria-label="Next"
                      onClick={() => setActiveTab((prev) => (prev + 1) % tabs.length)}
                    >
                      <span className="text-[#BDBDBD] text-[18px] leading-none transition-colors duration-200 group-hover:text-[#737373]">
                        ›
                      </span>
                    </button>
                  </div>
                </div>
              </div>

              {/* mobile */}
              <div className="md:hidden flex flex-col items-center gap-4 py-2">
                <div className="font-bold text-[16px] leading-[24px] tracking-[0.1px] text-[#252B42] text-center">
                  BESTSELLER PRODUCTS
                </div>

                <div className="flex items-center justify-center gap-[18px]">
                  {tabs.map((t, i) => (
                    <button
                      key={t}
                      className={
                        "text-[14px] leading-[24px] tracking-[0.2px] font-bold " +
                        (i === activeTab ? "text-[#23A6F0]" : "text-[#737373]")
                      }
                      type="button"
                      onClick={() => setActiveTab(i)}
                      aria-pressed={i === activeTab}
                    >
                      {t}
                    </button>
                  ))}
                </div>

                <div className="mt-1 flex items-center justify-center gap-[15px]">
                  <button
                    type="button"
                    className="group w-[49px] h-[49px] border border-[#BDBDBD] rounded-[34px] flex items-center justify-center transition-colors duration-200 hover:border-[#737373]"
                    aria-label="Prev"
                    onClick={() =>
                      setActiveTab((prev) => (prev - 1 + tabs.length) % tabs.length)
                    }
                  >
                    <span className="text-[#BDBDBD] text-[18px] leading-none transition-colors duration-200 group-hover:text-[#737373]">
                      ‹
                    </span>
                  </button>
                  <button
                    type="button"
                    className="group w-[49px] h-[49px] border border-[#737373] rounded-[33px] flex items-center justify-center transition-colors duration-200 hover:border-[#737373]"
                    aria-label="Next"
                    onClick={() => setActiveTab((prev) => (prev + 1) % tabs.length)}
                  >
                    <span className="text-[#737373] text-[18px] leading-none transition-colors duration-200">
                      ›
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* divider */}
            <div className="w-full h-[2px] bg-[#ECECEC] mt-4" />

            {/* products grid (2 rows x 3) */}
            <div className="mt-6 flex flex-wrap justify-center gap-[30px]">
              {products.map((p) => {
                const image =
                  p?.images?.[0]?.url || p?.images?.[0] || p?.image || productPlaceholder;
                const dept =
                  p?.category?.title ||
                  p?.category?.name ||
                  categoryMap.get(p?.category_id) ||
                  "Kategori";
                const price = formatPrice(p.price);
                const oldPrice = Number.isFinite(Number(p.price))
                  ? formatPrice(Number(p.price) * 1.2)
                  : "";

                return (
                  <div
                    key={p.id}
                    className="w-full max-w-[348px] md:w-[183px] md:max-w-none bg-white flex flex-col"
                  >
                    <div className="w-full h-[162px] bg-white flex items-center justify-center">
                      <img src={image} alt="" className="w-[120px] h-auto object-contain" />
                    </div>

                    <div className="flex flex-col items-center px-[25px] pt-[25px] pb-[35px] gap-[10px]">
                      <div className="font-bold text-[16px] leading-[24px] tracking-[0.1px] text-[#252B42] text-center">
                        {p.name}
                      </div>

                      <div className="font-bold text-[14px] leading-[24px] tracking-[0.2px] text-[#737373] text-center">
                        {dept}
                      </div>

                      <div className="flex gap-[5px] px-[3px] py-[5px]">
                        {oldPrice && (
                          <span className="font-bold text-[16px] leading-[24px] tracking-[0.1px] text-[#BDBDBD]">
                            {oldPrice}
                          </span>
                        )}
                        <span className="font-bold text-[16px] leading-[24px] tracking-[0.1px] text-[#23856D]">
                          {price}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
  
            {/* RIGHT: banner card */}
            <div className="order-1 lg:order-2 w-full lg:w-[389px]">
              <div className="w-full h-[700px] lg:h-[796px] border border-[#8EC2F2] bg-white overflow-hidden relative">
                <img
                  src={rightBannerImg}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover"
                />
  
                <div className="absolute top-0 left-0 right-0 h-[101px] flex flex-col justify-center items-start gap-[5px] px-[48px] py-[24px]">
                  <div className="font-bold text-[14px] leading-[24px] tracking-[0.2px] text-[#252B42]">
                    FURNITURE
                  </div>
                  <div className="font-bold text-[14px] leading-[24px] tracking-[0.2px] text-[#737373]">
                    5 Items
                  </div>
                </div>
              </div>
            </div>
  
          </div>
        </div>
    </section>
  );
}