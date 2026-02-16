import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import ProductCard from "./ProductCard.jsx";
import leftBannerImg from "../assets/images/left-banner.jpg";
import productPlaceholder from "../assets/images/vegan-milk.jpg";
import { api } from "../api/axios";
export default function ProductSection() {
  const [products, setProducts] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const tabs = ["Men", "Women", "Accessories"];
  const categories = useSelector((s) => s.product.categories) || [];

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
      <div className="w-full max-w-[1077px] mx-auto px-4 py-[48px]">
        <div className="flex flex-col lg:flex-row gap-[30px] items-start">
          {/* LEFT BIG BANNER */}
          <div className="w-full lg:w-[389px] h-[664px] lg:h-[796px] bg-white border border-[#8EC2F2] overflow-hidden relative">
            <img
              src={leftBannerImg}
              alt="Left banner"
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* text overlay top */}
            <div className="relative z-10 flex flex-col gap-[5px] pt-6 pl-12 pr-6">
              <p className="font-bold tracking-[0.2px] text-[14px] leading-[24px] text-[#252B42]">
                FURNITURE
              </p>
              <p className="font-bold tracking-[0.2px] text-[14px] leading-[24px] text-[#737373]">
                5 Items
              </p>
            </div>
          </div>

          {/* RIGHT PRODUCTS */}
          <div className="w-full lg:w-[658px] flex flex-col gap-[10px]">
            {/* top row: title + tabs + arrows */}
            <div className="w-full flex items-center justify-between h-[50px]">
              <div className="flex items-center">
                <h3 className="font-bold tracking-[0.1px] text-[16px] leading-[24px] text-[#252B42]">
                  BESTSELLER PRODUCTS
                </h3>
              </div>

              <div className="flex items-center gap-4">
                {/* tabs */}
                <div className="hidden sm:flex items-center gap-[15px]">
                  {tabs.map((tab, index) => (
                    <button
                      key={tab}
                      className={
                        "h-[44px] px-[20px] rounded-[37px] font-bold text-[14px] leading-[24px] tracking-[0.2px] " +
                        (index === activeTab ? "text-[#23A6F0]" : "text-[#737373]")
                      }
                      type="button"
                      onClick={() => setActiveTab(index)}
                      aria-pressed={index === activeTab}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                {/* arrows */}
                <div className="flex items-center gap-[15px]">
                  <button
                    type="button"
                    className="group w-[49px] h-[49px] border border-[#BDBDBD] rounded-[34px] flex items-center justify-center transition-colors duration-200 hover:border-[#737373]"
                    onClick={() =>
                      setActiveTab((prev) => (prev - 1 + tabs.length) % tabs.length)
                    }
                  >
                    <ChevronLeft
                      className="text-[#BDBDBD] transition-colors duration-200 group-hover:text-[#737373] group-hover:-translate-x-0.5"
                      size={16}
                    />
                  </button>
                  <button
                    type="button"
                    className="group w-[49px] h-[49px] border border-[#BDBDBD] rounded-[33px] flex items-center justify-center transition-colors duration-200 hover:border-[#737373]"
                    onClick={() => setActiveTab((prev) => (prev + 1) % tabs.length)}
                  >
                    <ChevronRight
                      className="text-[#BDBDBD] transition-colors duration-200 group-hover:text-[#737373] group-hover:translate-x-0.5"
                      size={16}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* divider */}
            <div className="w-full h-[2px] bg-[#ECECEC]" />

            {/* products grid (3x2) */}
            <div className="w-full flex flex-col gap-[30px] pt-2">
              <div className="flex flex-wrap gap-[30px] justify-center lg:justify-start">
                {products.map((p) => {
                  const image =
                    p?.images?.[0]?.url || p?.images?.[0] || p?.image || productPlaceholder;
                  const category =
                    p?.category?.title ||
                    p?.category?.name ||
                    categoryMap.get(p?.category_id) ||
                    "Kategori";
                  const price = formatPrice(p.price);
                  const oldPrice = Number.isFinite(Number(p.price))
                    ? formatPrice(Number(p.price) * 1.2)
                    : "";

                  return (
                    <ProductCard
                      key={p.id}
                      image={image}
                      title={p.name}
                      category={category}
                      oldPrice={oldPrice}
                      price={price}
                      className="w-full max-w-[348px] sm:w-[calc(50%-15px)] lg:w-[183px]"
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}