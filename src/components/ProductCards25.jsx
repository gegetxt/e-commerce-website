import card1Img from "../assets/images/card-1.png";
import card2Img from "../assets/images/card-2.png";
import card3Img from "../assets/images/card-3.png";
import rightBannerImg from "../assets/images/right-banner.jpg";

export default function ProductCards25() {
    const products = [
      { id: 1, title: "Graphic Design", dept: "English Department", old: "$16.48", now: "$6.48", img: card1Img },
      { id: 2, title: "Graphic Design", dept: "English Department", old: "$16.48", now: "$6.48", img: card2Img },
      { id: 3, title: "Graphic Design", dept: "English Department", old: "$16.48", now: "$6.48", img: card3Img },
      { id: 4, title: "Graphic Design", dept: "English Department", old: "$16.48", now: "$6.48", img: card1Img },
      { id: 5, title: "Graphic Design", dept: "English Department", old: "$16.48", now: "$6.48", img: card2Img },
      { id: 6, title: "Graphic Design", dept: "English Department", old: "$16.48", now: "$6.48", img: card3Img },
    ];
  
    const tabs = ["Men", "Women", "Accessories"];
  
    return (
      <section className="w-full bg-white">
        <div className="w-full max-w-[1440px] mx-auto px-4 py-[48px]">
          <div className="w-full max-w-[1077px] mx-auto flex flex-col lg:flex-row gap-[30px] items-start">
            {/* LEFT: products area */}
            <div className="w-full lg:w-[658px]">
              {/* Header row */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="font-bold text-[16px] leading-[24px] tracking-[0.1px] text-[#252B42]">
                  BESTSELLER PRODUCTS
                </div>
  
                <div className="flex items-center gap-3">
                  {/* tabs */}
                  <div className="flex items-center gap-[15px]">
                    {tabs.map((t, i) => (
                      <button
                        key={t}
                        className={
                          "text-[14px] leading-[24px] tracking-[0.2px] font-bold px-4 py-2 rounded-[37px] " +
                          (i === 0 ? "text-[#23A6F0]" : "text-[#737373]")
                        }
                        type="button"
                      >
                        {t}
                      </button>
                    ))}
                  </div>
  
                  {/* arrows */}
                  <div className="flex items-center gap-[15px]">
                    <button
                      type="button"
                      className="w-[48px] h-[48px] rounded-[34px] border border-[#BDBDBD] flex items-center justify-center"
                      aria-label="Prev"
                    >
                      <span className="text-[#BDBDBD] text-[18px] leading-none">‹</span>
                    </button>
                    <button
                      type="button"
                      className="w-[49px] h-[49px] rounded-[33px] border border-[#737373] flex items-center justify-center"
                      aria-label="Next"
                    >
                      <span className="text-[#737373] text-[18px] leading-none">›</span>
                    </button>
                  </div>
                </div>
              </div>
  
              {/* divider */}
              <div className="w-full h-[2px] bg-[#ECECEC] mt-4" />
  
              {/* products grid (2 rows x 3) */}
              <div className="mt-6 flex flex-wrap justify-center gap-[30px]">
                {products.map((p) => (
                  <div
                    key={p.id}
                    className="w-full max-w-[348px] md:w-[183px] md:max-w-none bg-white flex flex-col"
                  >
                    <div className="w-full h-[162px] bg-white flex items-center justify-center">
                      <img src={p.img} alt="" className="w-[120px] h-auto object-contain" />
                    </div>
  
                    <div className="flex flex-col items-center px-[25px] pt-[25px] pb-[35px] gap-[10px]">
                      <div className="font-bold text-[16px] leading-[24px] tracking-[0.1px] text-[#252B42] text-center">
                        {p.title}
                      </div>
  
                      <div className="font-bold text-[14px] leading-[24px] tracking-[0.2px] text-[#737373] text-center">
                        {p.dept}
                      </div>
  
                      <div className="flex gap-[5px] px-[3px] py-[5px]">
                        <span className="font-bold text-[16px] leading-[24px] tracking-[0.1px] text-[#BDBDBD]">
                          {p.old}
                        </span>
                        <span className="font-bold text-[16px] leading-[24px] tracking-[0.1px] text-[#23856D]">
                          {p.now}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
  
            {/* RIGHT: banner card */}
            <div className="w-full lg:w-[389px]">
              <div className="w-full h-[520px] lg:h-[796px] border border-[#8EC2F2] bg-white overflow-hidden relative">
                <img
                  src={rightBannerImg}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover"
                />
  
                <div className="absolute top-0 left-0 right-0 h-[101px] flex flex-col justify-center items-start gap-[5px] px-[48px] py-[24px]">
                  <div className="font-bold text-[14px] leading-[24px] tracking-[0.2px] text-[#252B42]">
                    FURNITURE
                  </div>
                  <div className="font-bold text-[14px] leading-[24px] tracking-[0.2px] text-[#737373]">
                    5 Items
                  </div>
                </div>
              </div>
            </div>
  
          </div>
        </div>
      </section>
    );
  }