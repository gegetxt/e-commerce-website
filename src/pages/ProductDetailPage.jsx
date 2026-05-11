import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  Heart,
  ShoppingCart,
  Eye,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Clients from "../components/Clients.jsx";
import ProductGallery from "../components/ProductGallery.jsx";
import detailImg from "../assets/images/doritos-nacho-cheese.jpg";
import { fetchProductDetailThunk } from "../store/actions/thunks";
import { setSelectedProduct } from "../store/actions/productActions";
import { addToCart } from "../store/actions/shoppingCartActions";
import { toast } from "react-toastify";
import { api } from "../api/axios";
import productPlaceholder from "../assets/images/vegan-milk.jpg";
import { slugifyTR } from "../utils/slug";
import { BESTSELLER_FETCH_LIMIT } from "../utils/bestsellerProducts";
import { fetchProductsCached } from "../utils/productRequests";

const FAVORITES_STORAGE_KEY = "favoriteProductIds";
const COLOR_VARIANTS = [
  { className: "bg-[#23A6F0]", keywords: ["blue", "mavi"] },
  { className: "bg-[#2DC071]", keywords: ["green", "yesil", "yeşil"] },
  { className: "bg-[#E77C40]", keywords: ["orange", "turuncu"] },
  { className: "bg-[#252B42]", keywords: ["navy", "lacivert", "black", "siyah"] },
];

function readFavoriteProductIds() {
  if (typeof window === "undefined") return [];

  try {
    const raw = localStorage.getItem(FAVORITES_STORAGE_KEY);
    const ids = raw ? JSON.parse(raw) : [];
    return Array.isArray(ids) ? ids.map(String) : [];
  } catch {
    return [];
  }
}

function toGenderSlug(gender) {
  return gender === "e" ? "erkek" : "kadin";
}

function normalizeText(value = "") {
  return value
    .toLocaleLowerCase("tr-TR")
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/ı/g, "i")
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function getVariantFamilyKey(product) {
  const normalizedName = normalizeText(product?.name || product?.title || "");
  const colorWords = COLOR_VARIANTS.flatMap((variant) =>
    variant.keywords.map((keyword) => normalizeText(keyword))
  );
  const stripped = normalizedName
    .split(" ")
    .filter((word) => word && !colorWords.includes(word))
    .join(" ")
    .trim();

  return stripped || normalizedName;
}

function getProductColorIndex(product) {
  const haystack = normalizeText(
    `${product?.name || ""} ${product?.title || ""} ${product?.description || ""}`
  );

  return COLOR_VARIANTS.findIndex((variant) =>
    variant.keywords.some((keyword) => haystack.includes(normalizeText(keyword)))
  );
}

function buildProductPath(product, categoryById) {
  if (!product?.id) return "#";

  const categoryId = product?.category?.id || product?.category_id;
  const category = product?.category || categoryById.get(categoryId);
  const categoryTitle =
    category?.title ||
    category?.name ||
    "Kategori";
  const productSlug = slugifyTR(product?.name || product?.title || "product");

  if (!categoryId || !category?.gender) {
    return `/product/${product.id}`;
  }

  const genderSlug = toGenderSlug(category.gender);
  return `/shop/${genderSlug}/${slugifyTR(categoryTitle)}/${categoryId}/${productSlug}/${product.id}`;
}

function buildColorVariantSlots(product, products) {
  if (!product?.id) return COLOR_VARIANTS.map(() => null);

  const categoryId = product?.category?.id || product?.category_id;
  const productFamilyKey = getVariantFamilyKey(product);
  const sameCategoryProducts = (products || []).filter((item) => {
    const itemCategoryId = item?.category?.id || item?.category_id;
    return item?.id != null && itemCategoryId === categoryId;
  });

  const familyMatches = sameCategoryProducts.filter(
    (item) => getVariantFamilyKey(item) === productFamilyKey
  );
  const sourceProducts = familyMatches.length > 1 ? familyMatches : sameCategoryProducts;
  const slots = COLOR_VARIANTS.map(() => null);

  sourceProducts.forEach((item) => {
    const colorIndex = getProductColorIndex(item);
    if (colorIndex >= 0 && !slots[colorIndex]) {
      slots[colorIndex] = item;
    }
  });

  if (!slots.some((item) => item?.id === product.id)) {
    const currentColorIndex = getProductColorIndex(product);
    const targetIndex =
      currentColorIndex >= 0
        ? currentColorIndex
        : slots.findIndex((item) => item == null) >= 0
          ? slots.findIndex((item) => item == null)
          : 0;
    slots[targetIndex] = product;
  }

  const remainingProducts = sourceProducts.filter(
    (item) => !slots.some((slot) => slot?.id === item.id)
  );

  remainingProducts.forEach((item) => {
    const emptyIndex = slots.findIndex((slot) => slot == null);
    if (emptyIndex >= 0) {
      slots[emptyIndex] = item;
    }
  });

  return slots;
}

function ColorDot({ color, isSelected, onClick }) {
  return (
    <button
      type="button"
      className={`w-[30px] h-[30px] rounded-full ${color} ${
        isSelected ? "ring-2 ring-[#23A6F0] ring-offset-2 ring-offset-white" : ""
      }`}
      aria-pressed={isSelected}
      disabled={!onClick}
      aria-disabled={!onClick}
      onClick={onClick}
    />
  );
}

function BestsellerCard({ product, categoryName }) {
  const image =
    product?.images?.[0]?.url ||
    product?.images?.[0] ||
    product?.image ||
    productPlaceholder;
  const title = product?.name || "Product";
  const categoryTitle =
    product?.category?.title ||
    product?.category?.name ||
    categoryName ||
    "Kategori";
  const priceValue = Number(product?.price);
  const priceText = Number.isFinite(priceValue)
    ? new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(priceValue)
    : "";
  const oldPriceText =
    Number.isFinite(priceValue) && priceValue > 0
      ? new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
          priceValue * 1.2
        )
      : "";

  return (
    <Link to={`/product/${product?.id}`} className="w-full max-w-[239px] bg-white flex flex-col">
      <div className="w-full h-[280px] flex items-center justify-center overflow-hidden">
        <img src={image} alt={title} className="h-[220px] w-auto object-contain" />
      </div>
      <div className="flex flex-col items-center gap-[10px] px-[25px] pt-[25px] pb-[35px]">
        <div className="text-[16px] leading-[24px] tracking-[0.1px] font-bold text-[#252B42] text-center">
          {title}
        </div>
        <div className="text-[14px] leading-[24px] tracking-[0.2px] font-bold text-[#737373] text-center">
          {categoryTitle}
        </div>
        {priceText && (
          <div className="flex items-start gap-[5px] px-[3px] py-[5px]">
            {oldPriceText && (
              <span className="text-[16px] leading-[24px] tracking-[0.1px] font-bold text-[#BDBDBD]">
                {oldPriceText}
              </span>
            )}
            <span className="text-[16px] leading-[24px] tracking-[0.1px] font-bold text-[#23856D]">
              {priceText}
            </span>
          </div>
        )}
      </div>
    </Link>
  );
}

export default function ProductDetailPage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const product = useSelector((s) => s.product.selectedProduct);
  const productList = useSelector((s) => s.product.productList);
  const detailFetchState = useSelector((s) => s.product.detailFetchState);
  const categories = useSelector((s) => s.product.categories);
  const cart = useSelector((s) => s.shoppingCart.cart) || [];
  const [bestsellerProducts, setBestsellerProducts] = useState([]);
  const [variantProducts, setVariantProducts] = useState([]);
  const [favoriteProductIds, setFavoriteProductIds] = useState(readFavoriteProductIds);
  const [isQuickView, setIsQuickView] = useState(false);

  useEffect(() => {
    const syncFavoriteProductIds = () => {
      setFavoriteProductIds(readFavoriteProductIds());
    };

    window.addEventListener("favorites:changed", syncFavoriteProductIds);
    return () => {
      window.removeEventListener("favorites:changed", syncFavoriteProductIds);
    };
  }, []);

  const toggleFavorite = () => {
    const ids = readFavoriteProductIds();
    const idAsString = String(productId);
    const exists = ids.includes(idAsString);
    const next = exists ? ids.filter((id) => id !== idAsString) : [...ids, idAsString];
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(next));
    setFavoriteProductIds(next);
    window.dispatchEvent(new Event("favorites:changed"));
  };

  useEffect(() => {
    dispatch(fetchProductDetailThunk(productId));
  }, [dispatch, productId]);

  const displayProduct = useMemo(() => {
    const routeProductId = String(productId);
    const candidates = [product, ...variantProducts, ...(productList || [])];

    return (
      candidates.find(
        (item) => item?.id != null && String(item.id) === routeProductId
      ) || null
    );
  }, [product, productId, productList, variantProducts]);

  const galleryImages = displayProduct?.images?.length
    ? displayProduct.images
    : [{ url: detailImg, index: 0 }];
  const ratingValue = Number(displayProduct?.rating) || 0;
  const priceText = Number.isFinite(Number(displayProduct?.price))
    ? new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
        Number(displayProduct?.price)
      )
    : "$0.00";
  const availabilityText = displayProduct?.stock > 0 ? "In Stock" : "Out of Stock";
  const cartCount = cart.reduce((sum, item) => sum + (item?.count || 0), 0);
  const currentCategoryId = displayProduct?.category?.id || displayProduct?.category_id;
  const isFavorite = favoriteProductIds.includes(String(productId));

  useEffect(() => {
    let isMounted = true;

    const fetchProducts = async () => {
      try {
        const list = await fetchProductsCached({
          limit: BESTSELLER_FETCH_LIMIT,
          offset: 0,
        });
        const top8 = [...list]
          .filter((item) => String(item?.id) !== String(productId))
          .sort((a, b) => (b.sell_count ?? 0) - (a.sell_count ?? 0))
          .slice(0, 8)
          .map((p) => p);
        if (isMounted) {
          setBestsellerProducts(top8);
        }
      } catch (e) {
        console.error(e);
        if (isMounted) {
          setBestsellerProducts([]);
        }
      }
    };

    fetchProducts();
    return () => {
      isMounted = false;
    };
  }, [productId]);

  useEffect(() => {
    if (!currentCategoryId) {
      return;
    }

    let isMounted = true;

    const fetchVariantProducts = async () => {
      try {
        const res = await api.get("/products", {
          params: { category: currentCategoryId, limit: 100, offset: 0 },
        });
        const list = res.data?.products || res.data || [];
        if (isMounted) {
          setVariantProducts(list);
        }
      } catch (e) {
        console.error(e);
        if (isMounted) {
          setVariantProducts([]);
        }
      }
    };

    fetchVariantProducts();

    return () => {
      isMounted = false;
    };
  }, [currentCategoryId]);

  const categoryMap = useMemo(() => {
    const map = new Map();
    (categories || []).forEach((c) => {
      if (c?.id != null) {
        map.set(c.id, c.title || c.name || c.categoryName);
      }
    });
    return map;
  }, [categories]);

  const categoryById = useMemo(() => {
    const map = new Map();
    (categories || []).forEach((c) => {
      if (c?.id != null) {
        map.set(c.id, c);
      }
    });
    return map;
  }, [categories]);

  const colorVariantSlots = useMemo(
    () => buildColorVariantSlots(displayProduct, variantProducts),
    [displayProduct, variantProducts]
  );
  const selectedColorIndex = colorVariantSlots.findIndex(
    (item) => item?.id === displayProduct?.id
  );
  const shouldShowInitialLoading = detailFetchState === "FETCHING" && !displayProduct;
  const shouldShowLoadError = detailFetchState === "FAILED" && !displayProduct;
  const shouldShowProductDetail =
    Boolean(displayProduct) && !shouldShowLoadError && !shouldShowInitialLoading;

  useEffect(() => {
    colorVariantSlots.forEach((item) => {
      if (!Array.isArray(item?.images)) return;

      item.images.forEach((image) => {
        const url = typeof image === "string" ? image : image?.url;
        if (!url) return;
        const preloadImage = new Image();
        preloadImage.src = url;
      });
    });
  }, [colorVariantSlots]);

  const handleColorVariantClick = (targetProduct) => {
    if (!targetProduct?.id) return;
    if (String(targetProduct.id) === String(productId)) return;

    dispatch(setSelectedProduct(targetProduct));
    navigate(buildProductPath(targetProduct, categoryById), {
      state: { preserveScroll: true },
    });
  };

  return (
    <div className="w-full bg-white">
      {/* Breadcrumb */}
      <div className="w-full bg-[#FAFAFA]">
        <div className="max-w-[1050px] mx-auto px-4 py-[24px] flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <h2 className="text-[24px] leading-[32px] tracking-[0.1px] font-bold text-[#252B42]">
            Shop
          </h2>
          <div className="flex items-center gap-[15px] text-[14px] leading-[24px] tracking-[0.2px] font-bold">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="flex items-center gap-1 text-[#252B42]"
              aria-label="Back"
            >
              <ChevronLeft size={16} />
              Back
            </button>
            <Link to="/" className="text-[#252B42]">
              Home
            </Link>
            <span className="text-[#BDBDBD]">›</span>
            <span className="text-[#BDBDBD]">Shop</span>
            <span className="text-[#BDBDBD]">›</span>
            <span className="text-[#BDBDBD]">Product {productId}</span>
          </div>
        </div>
      </div>

      {/* Product detail */}
      <section className="w-full bg-[#FAFAFA]">
        {shouldShowInitialLoading && (
          <div className="max-w-[1050px] mx-auto px-4 py-[48px] flex items-center justify-center">
            <div className="w-10 h-10 rounded-full border-4 border-[#E6E6E6] border-t-[#23A6F0] animate-spin" />
          </div>
        )}

        {shouldShowLoadError && (
          <div className="max-w-[1050px] mx-auto px-4 py-[48px] text-center text-[#737373]">
            Product could not be loaded.
          </div>
        )}

        {shouldShowProductDetail && (
          <div className="max-w-[1050px] mx-auto px-4 py-[48px] flex flex-col lg:flex-row gap-[30px]">
            <div className="w-full lg:w-[510px]">
              <ProductGallery
                images={galleryImages}
                alt={displayProduct?.name || "Product"}
                resetKey={displayProduct?.id || productId}
              />
            </div>

            <div className="w-full lg:w-[510px] flex flex-col gap-[20px]">
              <div className="text-[20px] leading-[30px] tracking-[0.2px] text-[#252B42]">
                {displayProduct?.name || "Product"}
              </div>

            <div className="flex items-center gap-[10px] text-[14px] leading-[24px] tracking-[0.2px] text-[#737373] font-bold">
                <div className="flex items-center gap-[5px]">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className={
                        i < Math.round(ratingValue)
                          ? "text-[#F3CD03] fill-[#F3CD03]"
                          : "text-[#F3CD03]"
                      }
                    />
                  ))}
                </div>
              <span>10 Reviews</span>
              </div>

              <div className="text-[24px] leading-[32px] tracking-[0.1px] font-bold text-[#252B42]">
                {priceText}
              </div>

              <div className="text-[14px] leading-[24px] tracking-[0.2px] font-bold text-[#737373]">
                Availability : <span className="text-[#23A6F0]">{availabilityText}</span>
              </div>

              <p className="text-[14px] leading-[20px] tracking-[0.2px] text-[#858585]">
                {displayProduct?.description || "Product description is not available."}
              </p>

              <div className="h-[1px] bg-[#BDBDBD]" />

              <div className="flex items-center gap-[10px]">
                {COLOR_VARIANTS.map((variant, index) => {
                  const targetProduct = colorVariantSlots[index];
                  const isSelected =
                    selectedColorIndex >= 0 ? selectedColorIndex === index : index === 0;

                  return (
                  <ColorDot
                    key={variant.className}
                    color={variant.className}
                    isSelected={isSelected}
                    onClick={
                      targetProduct?.id
                        ? () => handleColorVariantClick(targetProduct)
                        : undefined
                    }
                  />
                  );
                })}
              </div>

              <div className="flex flex-wrap items-center gap-[10px]">
                <button
                  type="button"
                  className="h-[44px] px-[20px] bg-[#23A6F0] text-white rounded-[5px] text-[14px] leading-[24px] tracking-[0.2px] font-bold"
                  onClick={() => {
                    if (displayProduct) {
                      dispatch(addToCart(displayProduct));
                      toast.success("Sepete eklendi!");
                    }
                  }}
                >
                  Select Options
                </button>
                <button
                  type="button"
                  className="w-[40px] h-[40px] rounded-full border border-[#E8E8E8] flex items-center justify-center"
                  aria-label="Add to wishlist"
                  onClick={toggleFavorite}
                >
                  <Heart
                    size={18}
                    className={
                      isFavorite ? "text-[#E74040] fill-[#E74040]" : "text-[#252B42]"
                    }
                  />
                </button>
                <button
                  type="button"
                  className="relative w-[40px] h-[40px] rounded-full border border-[#E8E8E8] flex items-center justify-center"
                  aria-label="Add to cart"
                  onClick={() => {
                    if (displayProduct) dispatch(addToCart(displayProduct));
                  }}
                >
                  <ShoppingCart size={18} className="text-[#252B42]" />
                  {cartCount > 0 && (
                    <span className="absolute -right-1 -top-1 min-w-[16px] h-[16px] px-1 rounded-full bg-[#23A6F0] text-white text-[10px] leading-[16px] text-center">
                      {cartCount}
                    </span>
                  )}
                </button>
                <button
                  type="button"
                  className="w-[40px] h-[40px] rounded-full border border-[#E8E8E8] flex items-center justify-center"
                  aria-label="Quick view"
                  onClick={() => setIsQuickView((prev) => !prev)}
                >
                  <Eye size={18} className={isQuickView ? "text-[#23A6F0]" : "text-[#252B42]"} />
                </button>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Tabs */}
      <section className="w-full bg-white">
        <div className="max-w-[1050px] mx-auto px-4 border-b border-[#ECECEC]">
          <div className="flex flex-wrap items-center justify-center gap-[30px] py-[24px] text-[14px] leading-[24px] tracking-[0.2px] font-bold">
            <span className="text-[#737373]">Description</span>
            <span className="text-[#737373]">Additional Information</span>
            <span className="text-[#737373]">Reviews (0)</span>
          </div>
        </div>
      </section>

      {/* Description content */}
      <section className="w-full bg-white">
        <div className="max-w-[1056px] mx-auto px-4 py-[48px] flex flex-col lg:flex-row gap-[30px]">
          <div className="w-full lg:w-[332px]">
            <div className="w-full h-[392px] rounded-[9px] overflow-hidden bg-[#F6F6F6]">
              <img src={detailImg} alt="" className="w-full h-full object-cover" />
            </div>
          </div>

          <div className="w-full lg:w-[332px] flex flex-col gap-[20px]">
            <h4 className="text-[24px] leading-[32px] tracking-[0.1px] font-bold text-[#252B42]">
              the quick fox jumps over
            </h4>
            <p className="text-[14px] leading-[20px] tracking-[0.2px] text-[#737373]">
              Met minim Mollie non desert Alamo est sit cliquey dolor do met
              sent. RELIT official consequent door ENIM RELIT Mollie. Excitation
              venial consequent sent nostrum met.
            </p>
            <p className="text-[14px] leading-[20px] tracking-[0.2px] text-[#737373]">
              Met minim Mollie non desert Alamo est sit cliquey dolor do met
              sent. RELIT official consequent door ENIM RELIT Mollie. Excitation
              venial consequent sent nostrum met.
            </p>
            <p className="text-[14px] leading-[20px] tracking-[0.2px] text-[#737373]">
              Met minim Mollie non desert Alamo est sit cliquey dolor do met
              sent. RELIT official consequent sent nostrum met.
            </p>
          </div>

          <div className="w-full lg:w-[332px] flex flex-col gap-[30px]">
            <div className="flex flex-col gap-[20px]">
              <h4 className="text-[24px] leading-[32px] tracking-[0.1px] font-bold text-[#252B42]">
                the quick fox jumps over
              </h4>
              <div className="flex flex-col gap-[10px] text-[14px] leading-[24px] tracking-[0.2px] text-[#737373] font-bold">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className="flex items-center gap-[20px]">
                    <ChevronRight size={16} className="text-[#737373]" />
                    <span>the quick fox jumps over the lazy dog</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-[20px]">
              <h4 className="text-[24px] leading-[32px] tracking-[0.1px] font-bold text-[#252B42]">
                the quick fox jumps over
              </h4>
              <div className="flex flex-col gap-[10px] text-[14px] leading-[24px] tracking-[0.2px] text-[#737373] font-bold">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className="flex items-center gap-[20px]">
                    <ChevronRight size={16} className="text-[#737373]" />
                    <span>the quick fox jumps over the lazy dog</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bestseller products */}
      <section className="w-full bg-[#FAFAFA]">
        <div className="max-w-[1124px] mx-auto px-4 py-[48px] flex flex-col gap-[24px]">
          <div className="flex flex-col gap-[16px]">
            <h3 className="text-[24px] leading-[32px] tracking-[0.1px] font-bold text-[#252B42]">
              BESTSELLER PRODUCTS
            </h3>
            <div className="h-[2px] w-full bg-[#ECECEC]" />
          </div>
          <div className="flex flex-wrap justify-center gap-[30px]">
            {bestsellerProducts.map((item, index) => (
              <BestsellerCard
                key={item?.id || index}
                product={item}
                categoryName={categoryMap.get(item?.category_id)}
              />
            ))}
          </div>
        </div>
      </section>

      <Clients />
    </div>
  );
}
