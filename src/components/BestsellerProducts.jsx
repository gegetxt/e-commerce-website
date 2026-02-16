import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { api } from "../api/axios";
import productPlaceholder from "../assets/images/vegan-milk.jpg";

export default function BestsellerProducts() {
  const [products, setProducts] = useState([]);
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

    const fetchBestSellers = async () => {
      try {
        const res = await api.get("/products");
        const list = res.data?.products || res.data || [];
        const top4 = [...list]
          .sort((a, b) => (b.sell_count ?? 0) - (a.sell_count ?? 0))
          .slice(0, 4);

        if (isMounted) setProducts(top4);
      } catch (e) {
        console.error(e);
        if (isMounted) setProducts([]);
      }
    };

    fetchBestSellers();
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
    <section className="w-full bg-[#FAFAFA]">
      <div className="w-full max-w-[1124px] mx-auto px-4 py-[48px] flex flex-col items-center gap-6">
        {/* title row */}
        <div className="w-full max-w-[1040px]">
          <h3 className="text-[24px] leading-[32px] font-bold tracking-[0.1px] text-[#252B42]">
            BESTSELLER PRODUCTS
          </h3>
          <div className="mt-4 h-[2px] w-full bg-[#ECECEC]" />
        </div>

        {/* cards row */}
        <div className="w-full max-w-[1049px] flex flex-wrap justify-center gap-[30px] lg:flex-nowrap lg:justify-between">
          {products.map((p) => (
            <div key={p.id} className="w-full max-w-[240px] flex flex-col lg:flex-1 lg:max-w-none">
              {/* image box */}
              <div className="w-full h-[280px] bg-white flex items-center justify-center">
                <img
                  src={p?.images?.[0]?.url || productPlaceholder}
                  alt={p.name}
                  className="max-h-[220px] w-auto object-contain"
                />
              </div>

              {/* content */}
              <div className="bg-white px-[25px] pt-[25px] pb-[35px] flex flex-col gap-[10px]">
                <h5 className="text-[#252B42] font-bold text-[16px] leading-[24px] tracking-[0.1px]">
                  {p.name}
                </h5>

                <span className="text-[#737373] font-bold text-[14px] leading-[24px] tracking-[0.2px]">
                  {p?.category?.title ||
                    p?.category?.name ||
                    categoryMap.get(p?.category_id) ||
                    "Kategori"}
                </span>

                <div className="flex items-start gap-[5px] px-[3px] py-[5px]">
                  <span className="text-[#23856D] font-bold text-[16px] leading-[24px] tracking-[0.1px]">
                    {formatPrice(p.price)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}