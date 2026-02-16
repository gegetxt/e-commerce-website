import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Heart, User, ChevronDown, Search, ShoppingCart, Phone, Mail } from "lucide-react";
import { SiInstagram, SiYoutube, SiFacebook, SiX } from "react-icons/si";
import { useDispatch, useSelector } from "react-redux";
import Gravatar from "react-gravatar";

import searchIcon from "../assets/icons/search.png";
import cartIcon from "../assets/icons/cart.png";
import { slugifyTR } from "../utils/slug";
import productPlaceholder from "../assets/images/vegan-milk.jpg";
import { setUser } from "../store/actions/clientActions";
import { clearAuthToken } from "../api/axios";

// API gender alanı farklı gelebilir diye map
function toGenderSlug(gender) {
  const g = (gender || "").toString().toLowerCase();

  // örnek olasılıklar: "kadin", "kadın", "women", "female", "k"
  if (g.includes("kad") || g.includes("women") || g === "k" || g.includes("female")) return "kadin";

  // örnek olasılıklar: "erkek", "men", "male", "e"
  if (g.includes("erk") || g.includes("men") || g === "e" || g.includes("male")) return "erkek";

  // default
  return "kadin";
}

const STATIC_AVATAR_EMAIL = "gizemgunduz77@gmail.com";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const dispatch = useDispatch();
  const location = useLocation();
  const user = useSelector((s) => s.client.user);
  const categories = useSelector((s) => s.product.categories);
  const cart = useSelector((s) => s.shoppingCart.cart) || [];

  const email = user?.email;
  const name =
    user?.name ||
    user?.full_name ||
    user?.username ||
    [user?.first_name, user?.last_name].filter(Boolean).join(" ") ||
    "User";
  const isLoggedIn = !!email;

  const womenCats = (categories || []).filter((c) => toGenderSlug(c.gender) === "kadin");
  const menCats = (categories || []).filter((c) => toGenderSlug(c.gender) === "erkek");
  const cartCount = cart.reduce((sum, item) => sum + (item?.count || 0), 0);

  return (
    <header className="w-full">
      {/* TOP BAR (desktop only) */}
      <div className="hidden md:block w-full bg-[#23856D] text-white">
        <div className="max-w-[1020px] mx-auto py-[10px] text-[12px] leading-[16px] tracking-[0.2px]">
          <div className="flex items-center justify-between">
            {/* LEFT: phone + email */}
            <div className="flex items-center gap-[20px] font-medium">
              <div className="flex items-center gap-[6px]">
                <Phone size={14} strokeWidth={2} />
                <span>(225) 555-0118</span>
              </div>

              <div className="flex items-center gap-[6px]">
                <Mail size={14} strokeWidth={2} />
                <span>michelle.rivera@example.com</span>
              </div>
            </div>

            {/* CENTER */}
            <div className="font-bold text-center whitespace-nowrap">
              Follow Us and get a chance to win 80% off
            </div>

            {/* RIGHT: social */}
            <div className="flex items-center gap-[10px] font-bold">
              <span>Follow Us :</span>
              <div className="flex items-center gap-[10px]">
                <SiInstagram size={14} className="text-white" />
                <SiYoutube size={14} className="text-white" />
                <SiFacebook size={14} className="text-white" />
                <SiX size={14} className="text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN HEADER */}
      <div className="w-full bg-white">
        <div className="w-full max-w-[1322px] mx-auto px-4 h-[91px] flex items-center justify-between">
          {/* Brand */}
          <Link
            to="/"
            className="ml-0 md:ml-32 text-[24px] leading-[32px] font-bold tracking-[0.1px] text-[#252B42]"
            onClick={() => setMobileOpen(false)}
          >
            Bandage
          </Link>

          {/* Nav (desktop) */}
          <nav className="hidden md:flex items-center gap-[15px] relative">
            <Link
              to="/"
              className="text-[14px] leading-[24px] font-bold tracking-[0.2px] text-[#737373]"
            >
              Home
            </Link>

            {/* SHOP dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setShopOpen(true)}
                onMouseLeave={() => setShopOpen(false)}
              >
              <Link
                to="/shop"
                className="flex items-center gap-1 text-[14px] leading-[28px] font-medium tracking-[0.2px] text-[#252B42]"
              >
                Shop <ChevronDown size={16} />
              </Link>

              {shopOpen && (
                <div
                  className="absolute left-0 top-full mt-3 w-[520px] bg-white shadow-lg rounded-lg p-8 z-50"
                  onMouseEnter={() => setShopOpen(true)}
                  onMouseLeave={() => setShopOpen(false)}
                >
                  <div className="grid grid-cols-2 gap-10">
                    {/* KADIN */}
                    <div>
                      <h4 className="font-bold text-[#252B42] mb-4">Kadın</h4>
                      <div className="flex flex-col gap-3">
                        {womenCats.length ? (
                          womenCats.map((c) => {
                            const title = c.title || c.name || c.categoryName || "category";
                            return (
                              <Link
                                key={c.id}
                                to={`/shop/kadin/${slugifyTR(title)}/${c.id}`}
                                className="text-[#737373] hover:text-[#23A6F0]"
                              >
                                {title}
                              </Link>
                            );
                          })
                        ) : (
                          <span className="text-[#737373] text-[14px]">No categories</span>
                        )}
                      </div>
                    </div>

                    {/* ERKEK */}
                    <div>
                      <h4 className="font-bold text-[#252B42] mb-4">Erkek</h4>
                      <div className="flex flex-col gap-3">
                        {menCats.length ? (
                          menCats.map((c) => {
                            const title = c.title || c.name || c.categoryName || "category";
                            return (
                              <Link
                                key={c.id}
                                to={`/shop/erkek/${slugifyTR(title)}/${c.id}`}
                                className="text-[#737373] hover:text-[#23A6F0]"
                              >
                                {title}
                              </Link>
                            );
                          })
                        ) : (
                          <span className="text-[#737373] text-[14px]">No categories</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {shopOpen && (
                <div
                  className="absolute left-0 top-full h-3 w-[520px]"
                  onMouseEnter={() => setShopOpen(true)}
                  onMouseLeave={() => setShopOpen(false)}
                />
              )}
            </div>

            {["About", "Blog", "Contact", "Pages"].map((t) => (
              <Link
                key={t}
                to={`/${t.toLowerCase()}`}
                className="text-[14px] leading-[24px] font-bold tracking-[0.2px] text-[#737373]"
              >
                {t}
              </Link>
            ))}
          </nav>

          {/* RIGHT */}
          <div className="flex items-center gap-2 md:gap-6">
            {/* DESKTOP: user info OR login/register */}
            <div className="hidden md:flex items-center gap-2 text-[#23A6F0] font-bold text-[14px] leading-[24px] tracking-[0.2px]">
              {isLoggedIn ? (
                <div
                  className="relative"
                  onMouseEnter={() => setUserMenuOpen(true)}
                  onMouseLeave={() => setUserMenuOpen(false)}
                >
                  <div className="flex items-center gap-2 cursor-pointer">
                    <Gravatar
                      email={STATIC_AVATAR_EMAIL}
                      size={32}
                      default="identicon"
                      className="rounded-full"
                    />
                    <span className="text-[#252B42] font-semibold">{name}</span>
                    <ChevronDown size={16} className="text-[#252B42]" />
                  </div>
                  {userMenuOpen && (
                    <div
                      className="absolute left-0 top-full mt-2 w-[180px] bg-white shadow-lg rounded-lg p-3 z-50"
                      onMouseEnter={() => setUserMenuOpen(true)}
                      onMouseLeave={() => setUserMenuOpen(false)}
                    >
                      <Link
                        to="/orders"
                        className="block text-[14px] text-[#252B42] hover:text-[#23A6F0] py-1"
                      >
                        Siparişlerim
                      </Link>
                      <button
                        type="button"
                        className="block w-full text-left text-[14px] text-[#252B42] hover:text-[#23A6F0] py-1"
                        onClick={() => {
                          localStorage.removeItem("token");
                          clearAuthToken();
                          dispatch(setUser({}));
                          setUserMenuOpen(false);
                        }}
                      >
                        Logout
                      </button>
                    </div>
                  )}
                  {userMenuOpen && (
                    <div
                      className="absolute left-0 top-full h-2 w-[180px]"
                      onMouseEnter={() => setUserMenuOpen(true)}
                      onMouseLeave={() => setUserMenuOpen(false)}
                    />
                  )}
                </div>
              ) : (
                <>
                  <User size={20} strokeWidth={2} color="#23A6F0" />
                  <Link to="/login">Login</Link>
                  <span>/</span>
                  <Link to="/signup">Register</Link>
                </>
              )}
            </div>

            <button
              type="button"
              className="hidden md:flex items-center justify-center"
              aria-label="Search"
            >
              <Search size={20} strokeWidth={2} color="#23A6F0" />
            </button>

            <div
              className="relative hidden md:block"
              onMouseEnter={() => setCartOpen(true)}
              onMouseLeave={() => setCartOpen(false)}
            >
              <Link to="/cart" className="hidden md:flex items-center gap-1" aria-label="Cart">
                <ShoppingCart size={20} strokeWidth={2} color="#23A6F0" />
                <span className="text-[12px] leading-[16px] text-[#23A6F0]">
                  {cartCount}
                </span>
              </Link>

              {cartOpen && (
                <div
                  className="absolute right-0 top-full mt-3 w-[360px] bg-white shadow-lg rounded-lg p-4 z-50"
                  onMouseEnter={() => setCartOpen(true)}
                  onMouseLeave={() => setCartOpen(false)}
                >
                  <div className="text-[14px] font-bold text-[#252B42] mb-3">
                    Sepetim ({cartCount} Ürün)
                  </div>
                  <div className="flex flex-col gap-3 max-h-[320px] overflow-auto">
                    {cart.length ? (
                      cart.map((item) => {
                        const product = item.product || {};
                        const image =
                          product?.images?.[0]?.url ||
                          product?.images?.[0] ||
                          product?.image ||
                          productPlaceholder;
                        const title = product?.name || product?.title || "Product";
                        const price = Number.isFinite(Number(product?.price))
                          ? new Intl.NumberFormat("tr-TR", {
                              style: "currency",
                              currency: "TRY",
                            }).format(Number(product?.price))
                          : "";

                        return (
                          <div key={product?.id} className="flex items-center gap-3">
                            <img
                              src={image}
                              alt={title}
                              className="w-[52px] h-[52px] object-cover rounded"
                            />
                            <div className="flex-1">
                              <div className="text-[14px] font-bold text-[#252B42] line-clamp-1">
                                {title}
                              </div>
                              <div className="text-[12px] text-[#737373]">
                                Adet: {item.count}
                              </div>
                            </div>
                            <div className="text-[14px] font-bold text-[#F28F6B]">
                              {price}
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div className="text-[14px] text-[#737373]">Sepet boş.</div>
                    )}
                  </div>
                  {cart.length > 0 && (
                    <div className="mt-4 flex items-center gap-3">
                      <Link
                        to="/cart"
                        className="flex-1 h-[40px] border border-[#E6E6E6] rounded-[5px] text-[14px] font-bold text-[#252B42] flex items-center justify-center"
                      >
                        Sepete Git
                      </Link>
                      <Link
                        to="/order"
                        className="flex-1 h-[40px] bg-[#F28F6B] rounded-[5px] text-[14px] font-bold text-white flex items-center justify-center"
                      >
                        Siparişi Tamamla
                      </Link>
                    </div>
                  )}
                </div>
              )}
              {cartOpen && (
                <div
                  className="absolute right-0 top-full h-3 w-[360px]"
                  onMouseEnter={() => setCartOpen(true)}
                  onMouseLeave={() => setCartOpen(false)}
                />
              )}
            </div>

            <button
              type="button"
              className="hidden md:flex items-center gap-1 md:mr-32"
              aria-label="Favorites"
            >
              <Heart size={20} strokeWidth={2} color="#23A6F0" />
              <span className="text-[12px] leading-[16px] text-[#23A6F0]">1</span>
            </button>

            {/* MOBILE: icons */}
            <button type="button" className="md:hidden p-2" aria-label="Search">
              <img src={searchIcon} alt="" className="w-6 h-6" />
            </button>

            <Link to="/cart" className="md:hidden p-2 relative" aria-label="Cart">
              <img src={cartIcon} alt="" className="w-6 h-6" />
            </Link>

            {/* MOBILE: hamburger */}
            <button
              type="button"
              className="md:hidden p-2"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              <span className="relative block w-6 h-[14px]">
                <span className="absolute right-0 top-0 h-[2px] w-6 rounded-full bg-[#252B42] transition-all duration-300 ease-in-out" />
                <span
                  className={`absolute right-0 top-1/2 -translate-y-1/2 h-[2.5px] rounded-full bg-[#252B42] transition-all duration-300 ease-in-out ${
                    mobileOpen ? "w-[18px]" : "w-6"
                  }`}
                />
                <span
                  className={`absolute right-0 bottom-0 h-[2px] rounded-full bg-[#252B42] transition-all duration-300 ease-in-out ${
                    mobileOpen ? "w-[12px]" : "w-6"
                  }`}
                />
              </span>
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        <div
          className={`md:hidden overflow-hidden bg-white transition-all duration-300 ease-in-out ${
            mobileOpen ? "max-h-[720px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <nav className="flex flex-col items-center justify-center gap-6 py-12 overflow-y-auto max-h-[720px]">
            {[
              { label: "Home", to: "/" },
              { label: "Shop", to: "/shop" },
              { label: "About", to: "/about" },
              { label: "Blog", to: "/blog" },
              { label: "Contact", to: "/contact" },
              { label: "Pages", to: "/pages" },
            ].map((item, index) => {
              const isActive =
                location.pathname === item.to ||
                (item.to !== "/" && location.pathname.startsWith(item.to));
              return (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setMobileOpen(false)}
                className={`text-[30px] leading-[45px] font-normal ${
                  isActive ? "text-[#252B42] font-bold" : "text-[#737373]"
                }`}
              >
                {item.label}
              </Link>
            )})}

            <div className="flex items-center gap-2 text-[#23A6F0] font-bold text-[16px] leading-[24px] mt-4">
              {isLoggedIn ? (
                <>
                  <Gravatar
                    email={STATIC_AVATAR_EMAIL}
                    size={32}
                    default="identicon"
                    className="rounded-full"
                  />
                  <span className="text-[#252B42] font-semibold">{name}</span>
                </>
              ) : (
                <>
                  <User size={20} strokeWidth={2} color="#23A6F0" />
                  <Link to="/login" onClick={() => setMobileOpen(false)}>
                    Login
                  </Link>
                  <span>/</span>
                  <Link to="/signup" onClick={() => setMobileOpen(false)}>
                    Register
                  </Link>
                </>
              )}
            </div>

            <div className="flex flex-col items-center gap-3 text-[#23A6F0] mt-2">
              <button type="button" className="p-2" aria-label="Search">
                <Search size={26} strokeWidth={2} color="#23A6F0" />
              </button>
              <Link to="/cart" className="relative p-2" aria-label="Cart" onClick={() => setMobileOpen(false)}>
                <ShoppingCart size={26} strokeWidth={2} color="#23A6F0" />
                <span className="absolute -right-1 -top-1 text-[12px] leading-[16px] text-[#23A6F0]">
                  {cartCount}
                </span>
              </Link>
              <button type="button" className="relative p-2" aria-label="Favorites">
                <Heart size={26} strokeWidth={2} color="#23A6F0" />
                <span className="absolute -right-1 -top-1 text-[12px] leading-[16px] text-[#23A6F0]">
                  1
                </span>
              </button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
