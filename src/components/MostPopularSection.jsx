import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { api } from "../api/axios";
import mostPopularLeftImg from "../assets/images/most-popular-left.jpg";
import mostPopularProductImg from "../assets/images/most-popular-product.png";
import productPlaceholder from "../assets/images/vegan-milk.jpg";

export default function MostPopularSection() {
    const [featuredProduct, setFeaturedProduct] = useState(null);
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
    const [featuredCategoryId, setFeaturedCategoryId] = useState(null);

    useEffect(() => {
      let isMounted = true;

      const fetchTopRated = async () => {
        try {
          const res = await api.get("/products");
          const list = res.data?.products || res.data || [];
          const map = new Map();

          list.forEach((p) => {
            const key = p?.category_id ?? p?.category?.id ?? "unknown";
            const current = map.get(key);
            if (!current || (p?.rating ?? 0) > (current?.rating ?? 0)) {
              map.set(key, p);
            }
          });

          const topByCategory = Array.from(map.values()).sort(
            (a, b) => (b.rating ?? 0) - (a.rating ?? 0)
          );
          if (isMounted) {
            const selected = topByCategory[0] || null;
            setFeaturedProduct(selected);
            setFeaturedCategoryId(selected?.category_id ?? selected?.category?.id ?? null);
          }
        } catch (e) {
          console.error(e);
          if (isMounted) setFeaturedProduct(null);
        }
      };

      fetchTopRated();
      return () => {
        isMounted = false;
      };
    }, []);

    const featuredImage =
      featuredProduct?.images?.[0]?.url ||
      featuredProduct?.images?.[0] ||
      featuredProduct?.image ||
      mostPopularProductImg ||
      productPlaceholder;
    const featuredCategory =
      featuredProduct?.category?.title ||
      featuredProduct?.category?.name ||
      categoryMap.get(featuredProduct?.category_id) ||
      "Kategori";
    const features = [
      { no: "1.", title: "Easy to use", desc: "Things on a very small that you have any direct" },
      { no: "2.", title: "Easy to use", desc: "Things on a very small that you have any direct" },
      { no: "3.", title: "Easy to use", desc: "Things on a very small that you have any direct" },
      { no: "4.", title: "Easy to use", desc: "Things on a very small that you have any direct" },
    ];
  
    return (
      <section className="w-full bg-white">
        <div className="w-full max-w-[1440px] mx-auto px-4 py-[48px] flex flex-col items-center gap-[30px]">
          {/* TOP ROW */}
          <div className="w-full max-w-[1069px] flex flex-col lg:flex-row items-start">
            {/* LEFT IMAGE */}
            <div className="w-full lg:w-[674px] flex flex-col gap-[35px]">
              <div className="w-full h-[505px] md:h-[649px] overflow-hidden bg-[#EDEDED]">
                <img
                  src={mostPopularLeftImg}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
  
            {/* RIGHT CARD */}
            <div className="w-full lg:w-[401px] bg-[#FAFAFA] flex items-center justify-center py-[80px]">
              <div className="w-full max-w-[348px] flex flex-col items-center gap-[19px]">
                <h3 className="font-bold text-[24px] leading-[32px] tracking-[0.1px] text-center text-[#252B42]">
                  MOST POPULAR
                </h3>
  
                <p className="w-[280px] text-[14px] leading-[20px] tracking-[0.2px] text-center text-[#737373]">
                  We focus on ergonomics and meeting you where you work. It&apos;s only a keystroke away.
                </p>
  
                <div className="w-[348px] h-[300px] flex items-center justify-center overflow-hidden">
                  <img
                    src={featuredImage}
                    alt=""
                    className="max-w-[260px] max-h-[260px] w-auto h-auto object-contain"
                  />
                </div>
  
                <p className="font-bold text-[14px] leading-[24px] tracking-[0.2px] text-center text-[#252B42]">
                  {featuredCategory}
                </p>
  
                <div className="flex gap-[5px] px-[3px] py-[5px]">
                  <span className="font-bold text-[16px] leading-[24px] tracking-[0.1px] text-[#BDBDBD]">
                    $16.48
                  </span>
                  <span className="font-bold text-[16px] leading-[24px] tracking-[0.1px] text-[#23856D]">
                    $6.48
                  </span>
                </div>
              </div>
            </div>
          </div>
  
          {/* BOTTOM FEATURES ROW */}
          <div className="w-full max-w-[1066px] flex flex-col sm:flex-row sm:flex-wrap items-start">
            {features.map((f) => (
              <div key={f.no} className="w-full sm:w-1/2 lg:w-1/4 flex justify-center">
                <div className="w-[265px] h-[111px] bg-white flex flex-col items-start p-[25px]">
                  <div className="flex gap-[20px]">
                    <div className="font-bold text-[40px] leading-[50px] tracking-[0.2px] text-[#E74040]">
                      {f.no}
                    </div>
  
                    <div className="flex flex-col gap-[5px]">
                      <div className="font-bold text-[14px] leading-[24px] tracking-[0.2px] text-[#252B42]">
                        {f.title}
                      </div>
                      <div className="text-[12px] leading-[16px] tracking-[0.2px] text-[#737373]">
                        {f.desc}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
  
        </div>
      </section>
    );
  }