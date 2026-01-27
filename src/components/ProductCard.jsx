export default function ProductCard({
  title = "Graphic Design",
  category = "English Department",
  oldPrice = "$16.48",
  price = "$6.48",
  image = "/images/p1.png",
  className = "",
}) {
  return (
    <div className={`h-[324px] bg-white flex flex-col ${className}`.trim()}>
      {/* image area */}
      <div className="w-full h-[162px] flex items-center justify-center overflow-hidden">
        <img src={image} alt="" className="h-[140px] w-auto object-contain" />
      </div>

      {/* content */}
      <div className="w-full h-[162px] flex flex-col items-center justify-center px-[25px] pt-[25px] pb-[35px] gap-[10px]">
        <h5 className="text-center font-bold tracking-[0.1px] text-[16px] leading-[24px] text-[#252B42]">
          {title}
        </h5>

        <p className="text-center font-bold tracking-[0.2px] text-[14px] leading-[24px] text-[#737373]">
          {category}
        </p>

        <div className="flex items-start gap-[5px] px-[3px] py-[5px]">
          <span className="font-bold tracking-[0.1px] text-[16px] leading-[24px] text-[#BDBDBD]">
            {oldPrice}
          </span>
          <span className="font-bold tracking-[0.1px] text-[16px] leading-[24px] text-[#23856D]">
            {price}
          </span>
        </div>
      </div>
    </div>
  );
}