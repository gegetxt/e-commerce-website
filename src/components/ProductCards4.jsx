import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { api } from "../api/axios";
import mostPopularProductImg from "../assets/images/most-popular-product.jpg";
import mostPopularBannerImg from "../assets/images/most-popular-banner.png";
import productPlaceholder from "../assets/images/vegan-milk.jpg";

export default function ProductCards4() {
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
            const pick = topByCategory[1] || topByCategory[0] || null;
            setFeaturedProduct(pick);
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

    return (
      <section className="w-full bg-white">
        <div className="w-full max-w-[1440px] mx-auto px-4 py-[48px]">
          <div className="w-full max-w-[1069px] mx-auto flex flex-col md:flex-row items-stretch gap-6">
            {/* LEFT CARD */}
            <div className="order-2 md:order-1 w-full md:w-[401px] bg-[#FAFAFA] flex items-center justify-center py-[80px]">
              <div className="w-full max-w-[348px] flex flex-col items-center gap-[19px]">
                <h3 className="w-[200px] text-center font-bold text-[24px] leading-[32px] tracking-[0.1px] text-[#252B42]">
                  MOST POPULAR
                </h3>
  
                <p className="w-[280px] text-center font-normal text-[14px] leading-[20px] tracking-[0.2px] text-[#737373]">
                  We focus on ergonomics and meeting you where you work. It&apos;s only a keystroke away.
                </p>
  
                {/* image area */}
                <div className="w-full h-[300px] flex items-center justify-center overflow-hidden">
                  <img
                    src={featuredImage}
                    alt=""
                    className="max-w-[220px] max-h-[260px] w-auto h-auto object-contain"
                  />
                </div>
  
                <div className="font-bold text-[14px] leading-[24px] tracking-[0.2px] text-[#252B42] text-center">
                  {featuredCategory}
                </div>
  
                {/* sales row */}
                <div className="flex items-center gap-[10px]">
                  <span className="text-[#737373] text-[16px] leading-none">🛒</span>
                  <span className="font-bold text-[14px] leading-[24px] tracking-[0.2px] text-[#737373]">
                    15 Sales
                  </span>
                </div>
  
                {/* prices */}
                <div className="flex gap-[5px] px-[3px] py-[5px]">
                  <span className="font-bold text-[16px] leading-[24px] tracking-[0.1px] text-[#BDBDBD]">
                    $16.48
                  </span>
                  <span className="font-bold text-[16px] leading-[24px] tracking-[0.1px] text-[#23856D]">
                    $6.48
                  </span>
                </div>
  
                {/* colors */}
                <div className="flex items-center gap-[6px]">
                  <span className="w-[16px] h-[16px] rounded-full bg-[#23A6F0]" />
                  <span className="w-[16px] h-[16px] rounded-full bg-[#23856D]" />
                  <span className="w-[16px] h-[16px] rounded-full bg-[#E77C40]" />
                  <span className="w-[16px] h-[16px] rounded-full bg-[#252B42]" />
                </div>
              </div>
            </div>
  
            {/* RIGHT IMAGE */}
            <div className="order-1 md:order-2 w-full md:w-[674px]">
              <div className="w-full h-[505px] md:h-[784px] overflow-hidden">
                <img
                  src={mostPopularBannerImg}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }