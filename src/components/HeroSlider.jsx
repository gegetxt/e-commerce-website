import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import chickenNuggetsImg from "../assets/images/theChickenNuggets.png";
import { Link } from "react-router-dom";
export default function HeroSlider() {
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const slides = [
    {
      id: 1,
      image: chickenNuggetsImg,
      title: "GROCERIES DELIVERY",
      description:
        "We know how large objects will act, but things on a small scale just do not act that way.",
      button: "Start Now",
    },
    {
      id: 2,
      image: chickenNuggetsImg,
      title: "FAST DELIVERY",
      description:
        "Enjoy quick delivery and fresh groceries right at your doorstep.",
      button: "Shop Now",
    },
  ];

  return (
    <section className="w-full bg-white">
      <div className="relative w-full h-[638px] md:h-[640px] border border-[#DEDEDE] rounded-[5px] overflow-hidden">
        <Swiper
          loop
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          className="w-full h-full"
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className="relative w-full h-full">
                <img
                  src={slide.image}
                  alt="Hero background"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/35" />

                <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-4">
                  <div className="w-full max-w-[280px] md:max-w-[701px] flex flex-col items-center gap-[24px]">
                    <h1 className="text-white text-center font-bold tracking-[0.2px] text-[40px] leading-[50px] md:text-[58px] md:leading-[80px]">
                      {slide.title}
                    </h1>

                    <p className="text-white text-center font-normal tracking-[0.2px] text-[18px] md:text-[20px] leading-[30px] max-w-[536px]">
                      {slide.description}
                    </p>

                    <Link
  to="/shop"
  className="h-[62px] w-[204px] md:w-auto px-[30px]
             bg-[#23A6F0] rounded-[5px]
             flex items-center justify-center
             hover:bg-[#1e8fd1] transition-colors"
>
  <span className="text-white font-bold tracking-[0.1px] text-[24px] leading-[32px]">
    {slide.button}
  </span>
</Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <button
          type="button"
          className="absolute left-[24px] md:left-[40px] top-1/2 -translate-y-1/2 z-20"
          aria-label="Previous"
          onClick={() => swiperRef.current?.slidePrev()}
        >
          <ChevronLeft className="text-white" size={45} />
        </button>

        <button
          type="button"
          className="absolute right-[24px] md:right-[40px] top-1/2 -translate-y-1/2 z-20"
          aria-label="Next"
          onClick={() => swiperRef.current?.slideNext()}
        >
          <ChevronRight className="text-white" size={45} />
        </button>

        <div className="absolute bottom-[25px] left-1/2 -translate-x-1/2 flex items-center">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={
                (index === activeIndex
                  ? "w-[62px] bg-white"
                  : "w-[63px] bg-white/50") + " h-[10px]"
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}