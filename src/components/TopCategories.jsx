import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { slugifyTR } from "../utils/slug";

function toGenderSlug(gender) {
  // API: "k" => kadın, "e" => erkek
  return gender === "e" ? "erkek" : "kadin";
}

export default function TopCategories() {
  const categories = useSelector((s) => s.product.categories) || [];

  const top5 = [...categories]
    .sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))
    .slice(0, 5);

  // hiç kategori gelmemişse (ilk yükleme vs.)
  if (!top5.length) return null;

  return (
    <section className="w-full bg-[#FAFAFA]">
      <div className="max-w-[1050px] mx-auto px-4 py-12">
        <div className="flex items-end justify-between gap-4 mb-6">
          <div>
            <h3 className="text-[#252B42] font-bold text-[20px] leading-[28px] tracking-[0.1px]">
              Top Categories
            </h3>
            <p className="text-[#737373] text-[14px] leading-[20px]">
              Highest rated categories
            </p>
          </div>

          <Link
            to="/shop"
            className="text-[#23A6F0] text-[14px] font-bold hover:underline"
          >
            View all
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
          {top5.map((c) => {
            const gender = toGenderSlug(c.gender);
            const title = c.title; // API: title
            const img = c.img;     // API: img

            return (
              <Link
                key={c.id}
                to={`/shop/${gender}/${slugifyTR(title)}/${c.id}`}
                className="group bg-white rounded-[10px] border border-[#E6E6E6] overflow-hidden hover:shadow-sm transition"
              >
                <div className="w-full h-[140px] overflow-hidden">
                  <img
                    src={img}
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition"
                    loading="lazy"
                  />
                </div>

                <div className="p-3">
                  <div className="font-bold text-[14px] text-[#252B42] leading-[20px]">
                    {title}
                  </div>
                  <div className="text-[12px] text-[#737373] mt-1">
                    Rating: {c.rating}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}