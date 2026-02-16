import { Grid2X2, List } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Clients from "../components/Clients.jsx";
import { slugifyTR } from "../utils/slug";
import { fetchProductsThunk } from "../store/actions/thunks";
import { setCategoryId, setFilter, setOffset, setSort } from "../store/actions/productActions";

import productPlaceholder from "../assets/images/vegan-milk.jpg";

const CATEGORY_IMAGE_BASES = [
  "https://workintech-fe-ecommerce.onrenderer.com/assets/category-img",
  "https://workintech-fe-ecommerce.onrender.com/assets/category-img",
];

function toGenderSlug(gender) {
  // API: "k" => kadin, "e" => erkek
  return gender === "e" ? "erkek" : "kadin";
}

function CategoryCard({ id, categoryId, img, title, rating, gender }) {
  const g = toGenderSlug(gender);
  const resolvedId = categoryId ?? id;
  const resolvedTitle = title || "Kategori";
  const categorySlug = slugifyTR(resolvedTitle);
  const fallbackUrls = CATEGORY_IMAGE_BASES.map(
    (base) => `${base}/category_${g}_${categorySlug}.jpg`
  );
  const resolvedImage = img || fallbackUrls[0];

  return (
    <Link
      to={`/shop/${g}/${slugifyTR(resolvedTitle)}/${resolvedId}`}
      className="relative w-full h-[300px] sm:h-[223px] overflow-hidden block rounded-[6px]"
      aria-label={`${resolvedTitle} category`}
    >
      <img
        src={resolvedImage}
        alt={resolvedTitle}
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
        data-fallback-index={img ? "-1" : "0"}
        onError={(e) => {
          const currentIndex = Number(e.currentTarget.dataset.fallbackIndex || "0");
          const nextIndex = currentIndex + 1;
          if (nextIndex < fallbackUrls.length) {
            e.currentTarget.dataset.fallbackIndex = String(nextIndex);
            e.currentTarget.src = fallbackUrls[nextIndex];
            return;
          }

          if (e.currentTarget.src !== productPlaceholder) {
            e.currentTarget.src = productPlaceholder;
          }
        }}
      />
      <div className="absolute inset-0 bg-black/25" />

      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center gap-1 text-white">
        <div className="text-[16px] leading-[24px] tracking-[0.1px] font-bold">
          {resolvedTitle}
        </div>
        <div className="text-[14px] leading-[20px] tracking-[0.2px]">
          Rating: {rating}
        </div>
      </div>
    </Link>
  );
}

function ShopProductCard({ imageCandidates, to, title, category, oldPrice, price }) {
  const initialImage = imageCandidates?.[0];
  return (
    <Link
      to={to}
      className="w-full max-w-[240px] flex flex-col bg-white cursor-pointer transition-shadow hover:shadow-md"
    >
      <div className="w-full h-[300px] flex items-center justify-center overflow-hidden">
        <img
          src={initialImage}
          alt={title}
          className="max-h-[260px] w-auto object-contain"
          data-fallback-index="0"
          onError={(e) => {
            const list = imageCandidates || [];
            const currentIndex = Number(e.currentTarget.dataset.fallbackIndex || "0");
            const nextIndex = currentIndex + 1;
            if (nextIndex < list.length) {
              e.currentTarget.dataset.fallbackIndex = String(nextIndex);
              e.currentTarget.src = list[nextIndex];
            }
          }}
        />
      </div>

      <div className="flex flex-col items-center gap-[10px] px-[25px] pt-[25px] pb-[35px]">
        <div className="text-[16px] leading-[24px] tracking-[0.1px] font-bold text-[#252B42] text-center">
          {title}
        </div>
        <div className="text-[14px] leading-[24px] tracking-[0.2px] font-bold text-[#737373] text-center">
          {category}
        </div>
        {(oldPrice || price) && (
          <div className="flex items-start gap-[5px] px-[3px] py-[5px]">
            {oldPrice && (
              <span className="text-[16px] leading-[24px] tracking-[0.1px] font-bold text-[#BDBDBD]">
                {oldPrice}
              </span>
            )}
            {price && (
              <span className="text-[16px] leading-[24px] tracking-[0.1px] font-bold text-[#23856D]">
                {price}
              </span>
            )}
          </div>
        )}
        <div className="flex items-center gap-[6px]">
          <span className="w-[16px] h-[16px] rounded-full bg-[#23A6F0]" />
          <span className="w-[16px] h-[16px] rounded-full bg-[#23856D]" />
          <span className="w-[16px] h-[16px] rounded-full bg-[#E77C40]" />
          <span className="w-[16px] h-[16px] rounded-full bg-[#252B42]" />
        </div>
      </div>
    </Link>
  );
}

export default function ShopPage() {
  // ✅ Redux'tan categories al
  const categoriesFromStore = useSelector((s) => s.product.categories) || [];
  const productList = useSelector((s) => s.product.productList) || [];
  const total = useSelector((s) => s.product.total) || 0;
  const fetchState = useSelector((s) => s.product.fetchState);
  const limit = useSelector((s) => s.product.limit) || 25;
  const offset = useSelector((s) => s.product.offset) || 0;
  const filter = useSelector((s) => s.product.filter) || "";
  const sort = useSelector((s) => s.product.sort) || "";
  const categoryId = useSelector((s) => s.product.categoryId);
  const dispatch = useDispatch();
  const { categoryId: categoryIdParam } = useParams();

  const parsedCategoryId = useMemo(() => {
    const id = Number(categoryIdParam);
    return Number.isFinite(id) ? id : null;
  }, [categoryIdParam]);

  // ✅ rating'e göre top 5 seç
  const top5Categories = [...categoriesFromStore]
    .sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))
    .slice(0, 5);
  const normalizedTopCategories = top5Categories.map((c) => ({
    ...c,
    categoryId: c.id ?? c.category_id,
    title: c.title || c.name || c.categoryName || "Kategori",
  }));

  const categoryMap = useMemo(() => {
    const map = new Map();
    categoriesFromStore.forEach((c) => {
      if (c?.id != null) {
        map.set(c.id, c.title || c.name || c.categoryName);
      }
    });
    return map;
  }, [categoriesFromStore]);

  const [sortDraft, setSortDraft] = useState(sort);

  useEffect(() => {
    setSortDraft(sort);
  }, [sort]);

  useEffect(() => {
    if (parsedCategoryId !== categoryId) {
      dispatch(setCategoryId(parsedCategoryId));
      dispatch(setOffset(0));
    }
  }, [dispatch, parsedCategoryId, categoryId]);

  useEffect(() => {
    dispatch(fetchProductsThunk());
  }, [dispatch, categoryId, filter, sort, limit, offset]);

  const formatPrice = (value) =>
    Number.isFinite(value)
      ? new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value)
      : "";

  const getCategoryImageCandidates = (product) => {
    const categoryTitle =
      product?.category?.title || product?.category?.name || product?.categoryName;
    if (!categoryTitle) return [];
    const g = toGenderSlug(product?.category?.gender);
    const categorySlug = slugifyTR(categoryTitle);
    return CATEGORY_IMAGE_BASES.map((base) => `${base}/category_${g}_${categorySlug}.jpg`);
  };

  const getProductImageCandidates = (product) => {
    const productImages = [];
    if (product?.images?.[0]?.url) productImages.push(product.images[0].url);
    if (product?.images?.[0] && typeof product.images[0] === "string") {
      productImages.push(product.images[0]);
    }
    if (product?.image) productImages.push(product.image);

    const categoryImages = getCategoryImageCandidates(product);

    return [...productImages, ...categoryImages, productPlaceholder].filter(Boolean);
  };

  const totalPages = Math.max(1, Math.ceil(total / limit));
  const currentPage = Math.min(totalPages, Math.floor(offset / limit) + 1);
  const pageNumbers = useMemo(() => {
    if (totalPages <= 3) return Array.from({ length: totalPages }, (_, i) => i + 1);
    if (currentPage <= 2) return [1, 2, 3];
    if (currentPage >= totalPages - 1)
      return [totalPages - 2, totalPages - 1, totalPages];
    return [currentPage - 1, currentPage, currentPage + 1];
  }, [currentPage, totalPages]);

  return (
    <div className="w-full bg-white">
      {/* Page header */}
      <section aria-label="Page header">
        {/* MOBILE */}
        <div className="w-full bg-[#FAFAFA] md:hidden">
          <div className="max-w-[1050px] mx-auto px-4 py-[48px]">
            <div className="flex flex-col items-center text-center gap-4">
              <h1 className="font-montserrat text-[24px] leading-[56px] tracking-[0.1px] font-bold text-[#252B42]">
                Shop
              </h1>

              <div className="h-[30px]" />

              <div className="flex items-center justify-center gap-2 text-[14px] leading-[24px] tracking-[0.2px] font-bold">
                <Link to="/" className="text-[#252B42]">
                  Home
                </Link>
                <span className="text-[#BDBDBD]">›</span>
                <span className="text-[#BDBDBD]">Shop</span>
              </div>
            </div>
          </div>
        </div>

        <div className="h-[24px]" />

        {/* DESKTOP */}
        <div className="hidden md:block w-full bg-[#FAFAFA]">
          <div className="max-w-[1050px] mx-auto px-4 py-[24px] flex items-center justify-between">
            <h2 className="font-montserrat text-[24px] leading-[32px] tracking-[0.1px] font-bold text-[#252B42]">
              Shop
            </h2>

            <div className="flex items-center gap-[15px] text-[14px] leading-[24px] tracking-[0.2px] font-bold">
              <Link to="/" className="text-[#252B42]">
                Home
              </Link>
              <span className="text-[#BDBDBD]">›</span>
              <span className="text-[#BDBDBD]">Shop</span>
            </div>
          </div>
        </div>
      </section>

      {/* Categories (Top 5) */}
      <div className="w-full bg-[#FAFAFA]">
        <div className="max-w-[1088px] mx-auto px-4 pb-[48px]">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-[15px]">
            {normalizedTopCategories.length ? (
              normalizedTopCategories.map((c, idx) => (
                <CategoryCard key={c.categoryId ?? c.id ?? idx} {...c} />
              ))
            ) : (
              // kategori yoksa boş ekran olmasın
              <div className="col-span-full text-center text-[#737373] py-10">
                Categories are loading...
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Filter row */}
      <div className="w-full bg-white">
        <div className="max-w-[1050px] mx-auto px-4 py-[24px] flex flex-col gap-4 items-center text-center lg:flex-row lg:items-center lg:justify-between lg:text-left">
          <div className="text-[14px] leading-[24px] tracking-[0.2px] font-bold text-[#737373]">
            {fetchState === "FETCHING" ? "Loading products..." : `Showing all ${total} results`}
          </div>

          <div className="flex items-center justify-center gap-[15px]">
            <span className="text-[14px] leading-[24px] tracking-[0.2px] font-bold text-[#737373]">
              Views:
            </span>
            <div className="flex items-center gap-[10px]">
              <button
                type="button"
                className="w-[46px] h-[46px] border border-[#ECECEC] rounded-[5px] flex items-center justify-center"
                aria-label="Grid view"
              >
                <Grid2X2 size={16} className="text-[#252B42]" />
              </button>
              <button
                type="button"
                className="w-[46px] h-[46px] border border-[#ECECEC] rounded-[5px] flex items-center justify-center"
                aria-label="List view"
              >
                <List size={16} className="text-[#737373]" />
              </button>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-[15px]">
            <select
              value={sortDraft}
              onChange={(e) => setSortDraft(e.target.value)}
              className="h-[50px] w-[180px] border border-[#DDDDDD] bg-[#F9F9F9] rounded-[5px] px-4 text-[14px] leading-[28px] tracking-[0.2px] text-[#737373]"
              aria-label="Sort products"
            >
              <option value="">Sort</option>
              <option value="price:asc">price:asc</option>
              <option value="price:desc">price:desc</option>
              <option value="rating:asc">rating:asc</option>
              <option value="rating:desc">rating:desc</option>
            </select>
            <input
              value={filter}
              onChange={(e) => {
                dispatch(setFilter(e.target.value));
                dispatch(setOffset(0));
              }}
              placeholder="Filter"
              className="h-[50px] w-[180px] border border-[#DDDDDD] bg-white rounded-[5px] px-4 text-[14px] leading-[28px] tracking-[0.2px] text-[#737373]"
              aria-label="Filter products"
            />
            <button
              type="button"
              className="h-[50px] px-[20px] bg-[#23A6F0] text-white rounded-[5px] text-[14px] leading-[24px] tracking-[0.2px] font-bold"
              onClick={() => {
                dispatch(setSort(sortDraft));
                dispatch(setOffset(0));
              }}
            >
              Filter
            </button>
          </div>
        </div>
      </div>

      {/* Products */}
      <div className="w-full bg-white">
        <div className="max-w-[1124px] mx-auto px-4 py-[48px] flex flex-wrap justify-center gap-[30px]">
          {fetchState === "FETCHING" && (
            <div className="w-full flex items-center justify-center py-10">
              <div className="w-10 h-10 rounded-full border-4 border-[#E6E6E6] border-t-[#23A6F0] animate-spin" />
            </div>
          )}

          {fetchState === "FAILED" && (
            <div className="w-full text-center text-[#737373] py-10">
              Products could not be loaded.
            </div>
          )}

          {fetchState !== "FETCHING" &&
            fetchState !== "FAILED" &&
            productList.map((product) => {
              const title = product?.name || product?.title || "Product";
              const categoryTitle =
                product?.category?.title ||
                product?.category?.name ||
                product?.categoryName ||
                categoryMap.get(product?.category_id) ||
                "Kategori";
              const categoryIdValue = product?.category?.id || product?.category_id || 0;
              const genderSlug = toGenderSlug(product?.category?.gender);
              const productSlug = slugifyTR(title);
              const categorySlug = slugifyTR(categoryTitle);
              const priceValue = Number(product?.price);
              const price = formatPrice(priceValue);
              const oldPrice =
                Number.isFinite(priceValue) && priceValue > 0
                  ? formatPrice(priceValue * 1.2)
                  : "";

              return (
                <ShopProductCard
                  key={product.id}
                  imageCandidates={getProductImageCandidates(product)}
                  to={`/shop/${genderSlug}/${categorySlug}/${categoryIdValue}/${productSlug}/${product.id}`}
                  title={title}
                  category={categoryTitle}
                  oldPrice={oldPrice}
                  price={price}
                />
              );
            })}
          {fetchState === "FETCHED" && productList.length === 0 && (filter || sort) && (
            <div className="w-full text-center text-[#737373] py-10">
              Bu filtrelere uygun ürün bulunamadı.
              <div className="mt-4">
                <button
                  type="button"
                  className="h-[40px] px-4 bg-[#23A6F0] text-white rounded-[5px] text-[14px] font-bold"
                  onClick={() => {
                    dispatch(setFilter(""));
                    dispatch(setSort(""));
                    dispatch(setOffset(0));
                    setSortDraft("");
                  }}
                >
                  Filtreleri temizle
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Pagination */}
      <div className="w-full bg-white">
        <div className="max-w-[1124px] mx-auto px-4 pb-[48px] flex items-center justify-center">
          <div className="flex items-center border border-[#BDBDBD] rounded-[6.7276px] shadow-[0px_2px_4px_rgba(0,0,0,0.1)] overflow-hidden text-[14px] leading-[24px] tracking-[0.2px] font-bold">
            <button
              type="button"
              className="h-[74px] px-[25px] bg-[#F3F3F3] text-[#BDBDBD]"
              onClick={() => dispatch(setOffset(0))}
              disabled={currentPage === 1}
              aria-label="First page"
            >
              First
            </button>
            {pageNumbers.map((page) => (
              <button
                key={page}
                type="button"
                className={`h-[74px] px-[20px] ${
                  page === currentPage ? "bg-[#23A6F0] text-white" : "text-[#23A6F0]"
                }`}
                onClick={() => dispatch(setOffset((page - 1) * limit))}
                aria-current={page === currentPage ? "page" : undefined}
              >
                {page}
              </button>
            ))}
            <button
              type="button"
              className="h-[74px] px-[25px] text-[#23A6F0]"
              onClick={() => dispatch(setOffset(Math.min(totalPages - 1, currentPage) * limit))}
              disabled={currentPage === totalPages}
              aria-label="Next page"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      <Clients />
    </div>
  );
}