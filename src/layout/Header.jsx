import { Link } from "react-router-dom";
import { Search, ShoppingCart, Heart, User, ChevronDown } from "lucide-react";

export default function Header() {
  return (
    <header className="w-full bg-white">
      <div className="w-full max-w-[1322px] mx-auto px-4 h-[91px] flex items-center justify-between">
        {/* Brand */}
        <Link
          to="/"
          className="text-[24px] leading-[32px] font-bold tracking-[0.1px] text-[#252B42]"
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
          <div className="flex items-center gap-1 text-[14px] leading-[28px] font-medium tracking-[0.2px] text-[#252B42]">
            Shop <ChevronDown size={16} />
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

        {/* Right */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 text-[14px] leading-[24px] font-bold tracking-[0.2px] text-[#23A6F0]">
            <User size={16} />
            <Link to="/login">Login</Link>
            <span>/</span>
            <Link to="/register">Register</Link>
          </div>

          <button type="button" className="p-2 text-[#23A6F0]">
            <Search size={18} />
          </button>

          <button type="button" className="p-2 text-[#23A6F0] flex items-center gap-1">
            <ShoppingCart size={18} />
            <span className="text-[12px] leading-[16px]">1</span>
          </button>

          <button type="button" className="p-2 text-[#23A6F0] flex items-center gap-1">
            <Heart size={18} />
            <span className="text-[12px] leading-[16px]">1</span>
          </button>
        </div>
      </div>
    </header>
  );
}