import card1Img from "../assets/images/card-1.png";
import card2Img from "../assets/images/card-2.png";
import card3Img from "../assets/images/card-3.png";

export default function ShopCards() {
    const cards = [
      {
        id: 1,
        kicker: "Your Space",
        title: "Unique\nLife",
        cta: "Explore Items",
        image: card1Img,
      },
      {
        id: 2,
        kicker: "Ends Today",
        title: "Elements\nStyle",
        cta: "Explore Items",
        image: card2Img,
      },
      {
        id: 3,
        kicker: "Ends Today",
        title: "Elements\nStyle",
        cta: "Explore Items",
        image: card3Img,
      },
    ];
  
    return (
      <section className="w-full bg-[#FAFAFA]">
        <div className="w-full max-w-[1084px] mx-auto px-4 py-[80px]">
          <div className="flex flex-col md:flex-row md:justify-between gap-[10px]">
            {cards.map((c) => (
              <div
                key={c.id}
                className="w-full md:w-[332px] h-[232px] bg-white border border-[#ECECEC] flex items-center justify-between overflow-hidden"
              >
                {/* Text */}
                <div className="flex flex-col gap-3 pl-6">
                  <p className="text-[14px] leading-[20px] tracking-[0.2px] text-[#737373]">
                    {c.kicker}
                  </p>
  
                  <h3 className="whitespace-pre-line text-[24px] leading-[32px] tracking-[0.1px] font-bold text-[#252B42]">
                    {c.title}
                  </h3>
  
                  <p className="text-[12px] leading-[16px] tracking-[0.2px] text-[#252B42]">
                    {c.cta}
                  </p>
                </div>
  
                {/* Image */}
                <div className="h-full w-[160px] md:w-[180px] flex items-center justify-center pr-4">
                  <img
                    src={c.image}
                    alt=""
                    className="h-[160px] w-auto object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }