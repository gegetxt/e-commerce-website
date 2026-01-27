import bestseller1Img from "../assets/images/bestseller-1.png";
import bestseller2Img from "../assets/images/bestseller-2.png";
import bestseller3Img from "../assets/images/bestseller-3.png";
import bestseller4Img from "../assets/images/bestseller-4.png";

export default function BestsellerProducts() {
    const products = [
      {
        id: 1,
        img: bestseller1Img,
        title: "Graphic Design",
        category: "English Department",
        oldPrice: "$16.48",
        price: "$6.48",
      },
      {
        id: 2,
        img: bestseller2Img,
        title: "Graphic Design",
        category: "English Department",
        oldPrice: "$16.48",
        price: "$6.48",
      },
      {
        id: 3,
        img: bestseller3Img,
        title: "Graphic Design",
        category: "English Department",
        oldPrice: "$16.48",
        price: "$6.48",
      },
      {
        id: 4,
        img: bestseller4Img,
        title: "Graphic Design",
        category: "English Department",
        oldPrice: "$16.48",
        price: "$6.48",
      },
    ];
  
    return (
      <section className="w-full bg-[#FAFAFA]">
        <div className="w-full max-w-[1124px] mx-auto px-4 py-[48px] flex flex-col items-center gap-6">
          {/* title row */}
          <div className="w-full max-w-[1040px]">
            <h3 className="text-[24px] leading-[32px] font-bold tracking-[0.1px] text-[#252B42]">
              BESTSELLER PRODUCTS
            </h3>
            <div className="mt-4 h-[2px] w-full bg-[#ECECEC]" />
          </div>
  
          {/* cards row */}
          <div className="w-full max-w-[1049px] flex flex-wrap justify-center gap-[30px] lg:flex-nowrap lg:justify-between">
            {products.map((p) => (
              <div key={p.id} className="w-full max-w-[240px] flex flex-col lg:flex-1 lg:max-w-none">
                {/* image box */}
                <div className="w-full h-[280px] bg-white flex items-center justify-center">
                  <img
                    src={p.img}
                    alt={p.title}
                    className="max-h-[220px] w-auto object-contain"
                  />
                </div>
  
                {/* content */}
                <div className="bg-white px-[25px] pt-[25px] pb-[35px] flex flex-col gap-[10px]">
                  <h5 className="text-[#252B42] font-bold text-[16px] leading-[24px] tracking-[0.1px]">
                    {p.title}
                  </h5>
  
                  <span className="text-[#737373] font-bold text-[14px] leading-[24px] tracking-[0.2px]">
                    {p.category}
                  </span>
  
                  <div className="flex items-start gap-[5px] px-[3px] py-[5px]">
                    <span className="text-[#BDBDBD] font-bold text-[16px] leading-[24px] tracking-[0.1px]">
                      {p.oldPrice}
                    </span>
                    <span className="text-[#23856D] font-bold text-[16px] leading-[24px] tracking-[0.1px]">
                      {p.price}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }