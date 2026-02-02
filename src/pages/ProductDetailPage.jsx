import { Link, useParams } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  Heart,
  ShoppingCart,
  Eye,
} from "lucide-react";
import Clients from "../components/Clients.jsx";
import heroImg from "../assets/images/doritos-chips.jpg";
import thumb1Img from "../assets/images/doritos-chips-back.png";
import thumb2Img from "../assets/images/doritos-chips-unpacked.jpg";
import detailImg from "../assets/images/doritos-nacho-cheese.jpg";
import bestseller1Img from "../assets/images/bestseller-1.png";
import bestseller2Img from "../assets/images/bestseller-2.png";
import bestseller3Img from "../assets/images/bestseller-3.png";
import bestseller4Img from "../assets/images/bestseller-4.png";

function ColorDot({ color }) {
  return <span className={`w-[30px] h-[30px] rounded-full ${color}`} />;
}

function BestsellerCard({ image }) {
  return (
    <div className="w-full max-w-[239px] bg-white flex flex-col">
      <div className="w-full h-[280px] flex items-center justify-center overflow-hidden">
        <img src={image} alt="" className="h-[220px] w-auto object-contain" />
      </div>
      <div className="flex flex-col items-center gap-[10px] px-[25px] pt-[25px] pb-[35px]">
        <div className="text-[16px] leading-[24px] tracking-[0.1px] font-bold text-[#252B42] text-center">
          Graphic Design
        </div>
        <div className="text-[14px] leading-[24px] tracking-[0.2px] font-bold text-[#737373] text-center">
          English Department
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
  const { id } = useParams();
  const thumbnails = [thumb1Img, thumb2Img];
  const bestsellerProducts = [
    bestseller1Img,
    bestseller2Img,
    bestseller3Img,
    bestseller4Img,
    bestseller2Img,
    bestseller3Img,
    bestseller1Img,
    bestseller4Img,
  ];

  return (
    <div className="w-full bg-white">
      {/* Breadcrumb */}
      <div className="w-full bg-[#FAFAFA]">
        <div className="max-w-[1050px] mx-auto px-4 py-[24px] flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <h2 className="text-[24px] leading-[32px] tracking-[0.1px] font-bold text-[#252B42]">
            Shop
          </h2>
          <div className="flex items-center gap-[15px] text-[14px] leading-[24px] tracking-[0.2px] font-bold">
            <Link to="/" className="text-[#252B42]">
              Home
            </Link>
            <span className="text-[#BDBDBD]">›</span>
            <span className="text-[#BDBDBD]">Shop</span>
            <span className="text-[#BDBDBD]">›</span>
            <span className="text-[#BDBDBD]">Product {id}</span>
          </div>
        </div>
      </div>

      {/* Product detail */}
      <section className="w-full bg-[#FAFAFA]">
        <div className="max-w-[1050px] mx-auto px-4 py-[48px] flex flex-col lg:flex-row gap-[30px]">
          <div className="w-full lg:w-[510px] flex flex-col gap-[19px]">
            <div className="relative w-full h-[450px] rounded-[5px] overflow-hidden bg-white">
              <img src={heroImg} alt="Floating Phone" className="w-full h-full object-cover" />
              <button
                type="button"
                className="absolute left-[24px] top-1/2 -translate-y-1/2 text-white"
                aria-label="Previous image"
              >
                <ChevronLeft size={32} />
              </button>
              <button
                type="button"
                className="absolute right-[24px] top-1/2 -translate-y-1/2 text-white"
                aria-label="Next image"
              >
                <ChevronRight size={32} />
              </button>
            </div>
            <div className="flex items-center gap-[19px]">
              {thumbnails.map((img, index) => (
                <div
                  key={index}
                  className="w-[100px] h-[75px] rounded-[5px] overflow-hidden bg-white"
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          <div className="w-full lg:w-[510px] flex flex-col gap-[20px]">
            <div className="text-[20px] leading-[30px] tracking-[0.2px] text-[#252B42]">
              Floating Phone
            </div>

            <div className="flex items-center gap-[10px] text-[14px] leading-[24px] tracking-[0.2px] text-[#737373] font-bold">
              <div className="flex items-center gap-[5px]">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className="text-[#F3CD03] fill-[#F3CD03]"
                  />
                ))}
                <Star size={18} className="text-[#F3CD03]" />
              </div>
              <span>10 Reviews</span>
            </div>

            <div className="text-[24px] leading-[32px] tracking-[0.1px] font-bold text-[#252B42]">
              $1,139.33
            </div>

            <div className="text-[14px] leading-[24px] tracking-[0.2px] font-bold text-[#737373]">
              Availability : <span className="text-[#23A6F0]">In Stock</span>
            </div>

            <p className="text-[14px] leading-[20px] tracking-[0.2px] text-[#858585]">
              Met minim Mollie non desert Alamo est sit cliquey dolor do met
              sent. RELIT official consequent door ENIM RELIT Mollie. Excitation
              venial consequent sent nostrum met.
            </p>

            <div className="h-[1px] bg-[#BDBDBD]" />

            <div className="flex items-center gap-[10px]">
              <ColorDot color="bg-[#23A6F0]" />
              <ColorDot color="bg-[#2DC071]" />
              <ColorDot color="bg-[#E77C40]" />
              <ColorDot color="bg-[#252B42]" />
            </div>

            <div className="flex flex-wrap items-center gap-[10px]">
              <button
                type="button"
                className="h-[44px] px-[20px] bg-[#23A6F0] text-white rounded-[5px] text-[14px] leading-[24px] tracking-[0.2px] font-bold"
              >
                Select Options
              </button>
              <button
                type="button"
                className="w-[40px] h-[40px] rounded-full border border-[#E8E8E8] flex items-center justify-center"
                aria-label="Add to wishlist"
              >
                <Heart size={18} className="text-[#252B42]" />
              </button>
              <button
                type="button"
                className="w-[40px] h-[40px] rounded-full border border-[#E8E8E8] flex items-center justify-center"
                aria-label="Add to cart"
              >
                <ShoppingCart size={18} className="text-[#252B42]" />
              </button>
              <button
                type="button"
                className="w-[40px] h-[40px] rounded-full border border-[#E8E8E8] flex items-center justify-center"
                aria-label="Quick view"
              >
                <Eye size={18} className="text-[#252B42]" />
              </button>
            </div>
          </div>
        </div>
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
            {bestsellerProducts.map((image, index) => (
              <BestsellerCard key={index} image={image} />
            ))}
          </div>
        </div>
      </section>

      <Clients />
    </div>
  );
}
