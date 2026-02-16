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
import { addToCart } from "../store/actions/shoppingCartActions";
import { toast } from "react-toastify";
import { api } from "../api/axios";
import productPlaceholder from "../assets/images/vegan-milk.jpg";

function ColorDot({ color, isSelected, onClick }) {
  return (
    <button
      type="button"
      className={`w-[30px] h-[30px] rounded-full ${color} ${
        isSelected ? "ring-2 ring-[#23A6F0] ring-offset-2 ring-offset-white" : ""
      }`}
      aria-pressed={isSelected}
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

  return (
    <div className="w-full max-w-[239px] bg-white flex flex-col">
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
        <div className="flex items-start gap-[5px] px-[3px] py-[5px]">
          <span className="text-[16px] leading-[24px] tracking-[0.1px] font-bold text-[#BDBDBD]">
            $16.48
          </span>
          <span className="text-[16px] leading-[24px] tracking-[0.1px] font-bold text-[#23856D]">
            $6.48
          </span>
        </div>
      </div>
    </div>
  );
}

export default function ProductDetailPage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const product = useSelector((s) => s.product.selectedProduct);
  const detailFetchState = useSelector((s) => s.product.detailFetchState);
  const categories = useSelector((s) => s.product.categories) || [];
  const cart = useSelector((s) => s.shoppingCart.cart) || [];
  const [bestsellerProducts, setBestsellerProducts] = useState([]);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isQuickView, setIsQuickView] = useState(false);

  useEffect(() => {
    dispatch(fetchProductDetailThunk(productId));
  }, [dispatch, productId]);

  const galleryImages = product?.images?.length
    ? product.images
    : [{ url: detailImg, index: 0 }];
  const ratingValue = Number(product?.rating) || 0;
  const priceText = Number.isFinite(Number(product?.price))
    ? new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
        Number(product?.price)
      )
    : "$0.00";
  const availabilityText = product?.stock > 0 ? "In Stock" : "Out of Stock";
  const colorOptions = ["bg-[#23A6F0]", "bg-[#2DC071]", "bg-[#E77C40]", "bg-[#252B42]"];
  const cartCount = cart.reduce((sum, item) => sum + (item?.count || 0), 0);
  useEffect(() => {
    let isMounted = true;

    const fetchBestSellers = async () => {
      try {
        const res = await api.get("/products");
        const list = res.data?.products || res.data || [];
        const top8 = [...list]
          .sort((a, b) => (b.sell_count ?? 0) - (a.sell_count ?? 0))
          .slice(0, 8)
          .map((p) => p);
        if (isMounted) setBestsellerProducts(top8);
      } catch (e) {
        console.error(e);
        if (isMounted) setBestsellerProducts([]);
      }
    };

    fetchBestSellers();
    return () => {
      isMounted = false;
    };
  }, []);

  const categoryMap = useMemo(() => {
    const map = new Map();
    categories.forEach((c) => {
      if (c?.id != null) {
        map.set(c.id, c.title || c.name || c.categoryName);
      }
    });
    return map;
  }, [categories]);

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
        {detailFetchState === "FETCHING" && (
          <div className="max-w-[1050px] mx-auto px-4 py-[48px] flex items-center justify-center">
            <div className="w-10 h-10 rounded-full border-4 border-[#E6E6E6] border-t-[#23A6F0] animate-spin" />
          </div>
        )}

        {detailFetchState === "FAILED" && (
          <div className="max-w-[1050px] mx-auto px-4 py-[48px] text-center text-[#737373]">
            Product could not be loaded.
          </div>
        )}

        {detailFetchState !== "FETCHING" && detailFetchState !== "FAILED" && (
          <div className="max-w-[1050px] mx-auto px-4 py-[48px] flex flex-col lg:flex-row gap-[30px]">
            <div className="w-full lg:w-[510px]">
              <ProductGallery
                images={galleryImages}
                alt={product?.name || "Product"}
                resetKey={product?.id || productId}
              />
            </div>

            <div className="w-full lg:w-[510px] flex flex-col gap-[20px]">
              <div className="text-[20px] leading-[30px] tracking-[0.2px] text-[#252B42]">
                {product?.name || "Product"}
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
                {product?.description || "Product description is not available."}
              </p>

              <div className="h-[1px] bg-[#BDBDBD]" />

              <div className="flex items-center gap-[10px]">
                {colorOptions.map((color, index) => (
                  <ColorDot
                    key={color}
                    color={color}
                    isSelected={selectedColorIndex === index}
                    onClick={() => setSelectedColorIndex(index)}
                  />
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-[10px]">
                <button
                  type="button"
                  className="h-[44px] px-[20px] bg-[#23A6F0] text-white rounded-[5px] text-[14px] leading-[24px] tracking-[0.2px] font-bold"
                  onClick={() => {
                    if (product) {
                      dispatch(addToCart(product));
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
                  onClick={() => setIsFavorite((prev) => !prev)}
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
                    if (product) dispatch(addToCart(product));
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
