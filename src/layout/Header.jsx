import { Link } from "react-router-dom";
import { Search, ShoppingCart, Heart, User, ChevronDown } from "lucide-react";

export default function Header() {
  return (
    <header className="w-full">
      <div className="w-full bg-[#23856D] text-white">
        <div className="max-w-[1020px] mx-auto px-4 py-[10px] flex flex-col gap-2 md:flex-row md:items-center md:justify-between text-[12px] leading-[16px] tracking-[0.2px]">
          <div className="flex flex-col items-center gap-2 md:flex-row md:items-center md:gap-[10px]">
            <div className="flex items-center gap-[5px]">
              <span>(225) 555-0118</span>
            </div>
            <div className="flex items-center gap-[5px]">
              <span>michelle.rivera@example.com</span>
            </div>
          </div>

          <div className="text-center font-bold">
            Follow Us and get a chance to win 80% off
          </div>

          <div className="flex items-center justify-center gap-[10px] font-bold">
            <span>Follow Us :</span>
            <div className="flex items-center gap-[10px]">
              <span>📘</span>
              <span>📷</span>
              <span>🐦</span>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full bg-white">
        <div className="w-full max-w-[1322px] mx-auto px-4 h-[91px] flex items-center justify-between">
        {/* Brand */}
        <Link
          to="/"
          className="ml-32 text-[24px] leading-[32px] font-bold tracking-[0.1px] text-[#252B42]"
        >
          Bandage
        </Link>

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-[15px]">
          <Link
            to="/"
            className="text-[14px] leading-[24px] font-bold tracking-[0.2px] text-[#737373]"
          >
            Home
          </Link>
          <Link
            to="/shop"
            className="flex items-center gap-1 text-[14px] leading-[28px] font-medium tracking-[0.2px] text-[#252B42]"
          >
            Shop <ChevronDown size={16} />
          </Link>
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

        {/* Right */}
        <div className="flex items-center gap-3 md:-ml-4">
          <div className="hidden md:flex items-center gap-2 text-[14px] leading-[24px] font-bold tracking-[0.2px] text-[#23A6F0]">
            <User size={16} />
            <Link to="/login">Login</Link>
            <span>/</span>
            <Link to="/register">Register</Link>
          </div>

          <button type="button" className="p-2 text-[#23A6F0]">
            <Search size={18} />
          </button>

          <button type="button" className="p-2 text-[#23A6F0] flex items-center gap-1 ">
            <ShoppingCart size={18} />
            <span className="text-[12px] leading-[16px]">1</span>
          </button>

          <button type="button" className="p-2 text-[#23A6F0] flex items-center gap-1 mr-32">
            <Heart size={18} />
            <span className="text-[12px] leading-[16px]">1</span>
          </button>
        </div>
        </div>
      </div>
    </header>
  );
}