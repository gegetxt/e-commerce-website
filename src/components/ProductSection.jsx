import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "./ProductCard.jsx";
import leftBannerImg from "../assets/images/left-banner.jpg";
import card1Img from "../assets/images/card-1.png";
import card2Img from "../assets/images/card-2.png";
import card3Img from "../assets/images/card-3.png";
export default function ProductSection() {
  return (
    <section className="w-full bg-white">
      <div className="w-full max-w-[1077px] mx-auto px-4 py-[48px]">
        <div className="flex flex-col lg:flex-row gap-[30px] items-start">
          {/* LEFT BIG BANNER */}
          <div className="w-full lg:w-[389px] h-[664px] lg:h-[796px] bg-white border border-[#8EC2F2] overflow-hidden relative">
            <img
              src={leftBannerImg}
              alt="Left banner"
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* text overlay top */}
            <div className="relative z-10 flex flex-col gap-[5px] pt-6 pl-12 pr-6">
              <p className="font-bold tracking-[0.2px] text-[14px] leading-[24px] text-[#252B42]">
                FURNITURE
              </p>
              <p className="font-bold tracking-[0.2px] text-[14px] leading-[24px] text-[#737373]">
                5 Items
              </p>
            </div>
          </div>

          {/* RIGHT PRODUCTS */}
          <div className="w-full lg:w-[658px] flex flex-col gap-[10px]">
            {/* top row: title + tabs + arrows */}
            <div className="w-full flex items-center justify-between h-[50px]">
              <div className="flex items-center">
                <h3 className="font-bold tracking-[0.1px] text-[16px] leading-[24px] text-[#252B42]">
                  BESTSELLER PRODUCTS
                </h3>
              </div>

              <div className="flex items-center gap-4">
                {/* tabs */}
                <div className="hidden sm:flex items-center">
                  <button className="h-[44px] px-[20px] rounded-[5px] font-bold text-[14px] leading-[24px] tracking-[0.2px] text-[#23A6F0]">
                    Men
                  </button>
                  <button className="h-[44px] px-[20px] rounded-[37px] font-bold text-[14px] leading-[24px] tracking-[0.2px] text-[#737373]">
                    Women
                  </button>
                  <button className="h-[44px] px-[20px] rounded-[37px] font-bold text-[14px] leading-[24px] tracking-[0.2px] text-[#737373]">
                    Accessories
                  </button>
                </div>

                {/* arrows */}
                <div className="flex items-center gap-[15px]">
                  <button className="w-[49px] h-[49px] border border-[#BDBDBD] rounded-[34px] flex items-center justify-center">
                    <ChevronLeft className="text-[#BDBDBD]" size={16} />
                  </button>
                  <button className="w-[49px] h-[49px] border border-[#737373] rounded-[33px] flex items-center justify-center">
                    <ChevronRight className="text-[#737373]" size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* divider */}
            <div className="w-full h-[2px] bg-[#ECECEC]" />

            {/* products grid (3x2) */}
            <div className="w-full flex flex-col gap-[30px] pt-2">
              <div className="flex flex-wrap gap-[30px] justify-center lg:justify-start">
                <ProductCard
                  image={card1Img}
                  className="w-full max-w-[348px] sm:w-[calc(50%-15px)] lg:w-[183px]"
                />
                <ProductCard
                  image={card2Img}
                  className="w-full max-w-[348px] sm:w-[calc(50%-15px)] lg:w-[183px]"
                />
                <ProductCard
                  image={card3Img}
                  className="w-full max-w-[348px] sm:w-[calc(50%-15px)] lg:w-[183px]"
                />
                <ProductCard
                  image={card1Img}
                  className="w-full max-w-[348px] sm:w-[calc(50%-15px)] lg:w-[183px]"
                />
                <ProductCard
                  image={card2Img}
                  className="w-full max-w-[348px] sm:w-[calc(50%-15px)] lg:w-[183px]"
                />
                <ProductCard
                  image={card3Img}
                  className="w-full max-w-[348px] sm:w-[calc(50%-15px)] lg:w-[183px]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}