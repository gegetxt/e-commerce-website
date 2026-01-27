import blog1Img from "../assets/images/blog-1.jpg";
import blog2Img from "../assets/images/blog-2.jpg";
import blog3Img from "../assets/images/blog-3.jpg";

function PostCard({
    image,
    badge = "NEW",
    tags = ["Google", "Trending", "New"],
    title,
    description,
    dateText,
    commentsText,
  }) {
    return (
      <article className="w-full max-w-[330px] md:max-w-[348px] bg-white shadow-[0px_2px_4px_rgba(0,0,0,0.1)]">
        {/* Image */}
        <div className="relative w-full h-[300px] overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
  
          {/* Badge */}
          <span className="absolute left-[20px] top-[20px] h-[24px] px-[10px] flex items-center justify-center bg-[#E74040] text-white text-[14px] leading-[24px] font-bold rounded-[3px] shadow-[0px_2px_4px_rgba(0,0,0,0.1)]">
            {badge}
          </span>
        </div>
  
        {/* Content */}
        <div className="px-[25px] pt-[25px] pb-[35px] flex flex-col gap-[10px]">
          {/* Tags */}
          <div className="flex items-center gap-[15px] text-[12px] leading-[16px] tracking-[0.2px]">
            <span className="text-[#8EC2F2]">{tags[0]}</span>
            <span className="text-[#737373]">{tags[1]}</span>
            <span className="text-[#737373]">{tags[2]}</span>
          </div>
  
          {/* Title */}
          <h4 className="text-[#252B42] text-[20px] leading-[30px] tracking-[0.2px] font-normal">
            {title}
          </h4>
  
          {/* Desc */}
          <p className="text-[#737373] text-[14px] leading-[20px] tracking-[0.2px]">
            {description}
          </p>
  
          {/* Meta */}
          <div className="w-full flex items-center justify-between py-[15px]">
            <div className="flex items-center gap-[5px] text-[#737373] text-[12px] leading-[16px]">
              {/* calendar icon (simple) */}
              <span className="text-[#23A6F0]">📅</span>
              <span>{dateText}</span>
            </div>
  
            <div className="flex items-center gap-[5px] text-[#737373] text-[12px] leading-[16px]">
              {/* chart icon (simple) */}
              <span className="text-[#23856D]">📊</span>
              <span>{commentsText}</span>
            </div>
          </div>
  
          {/* Learn more */}
          <a
            href="#"
            className="inline-flex items-center gap-[10px] text-[#737373] font-bold text-[14px] leading-[24px] tracking-[0.2px]"
          >
            Learn More <span className="text-[#23A6F0]">→</span>
          </a>
        </div>
      </article>
    );
  }
  
  export default function FeaturedPosts() {
    const posts = [
      {
        image: blog1Img,
        title: "Loudest à la Madison #1 (L'integral)",
        description:
          "We focus on ergonomics and meeting you where you work. It's only a keystroke away.",
        dateText: "22 April 2021",
        commentsText: "10 comments",
      },
      {
        image: blog2Img,
        title: "Loudest à la Madison #1 (L'integral)",
        description:
          "We focus on ergonomics and meeting you where you work. It's only a keystroke away.",
        dateText: "22 April 2021",
        commentsText: "10 comments",
      },
      {
        image: blog3Img,
        title: "Loudest à la Madison #1 (L'integral)",
        description:
          "We focus on ergonomics and meeting you where you work. It's only a keystroke away.",
        dateText: "22 April 2021",
        commentsText: "10 comments",
      },
    ];
  
  return (
    <section className="w-full bg-white">
      <div className="max-w-[1050px] mx-auto py-[112px] px-4 flex flex-col items-center gap-[80px]">
          {/* Header */}
          <div className="flex flex-col items-center gap-[10px]">
            <h6 className="text-[#23A6F0] font-bold text-[14px] leading-[24px] tracking-[0.2px]">
              Practice Advice
            </h6>
            <h3 className="text-[#252B42] font-bold text-[40px] leading-[50px] tracking-[0.2px]">
              Featured Posts
            </h3>
          </div>
  
          {/* Cards */}
        <div className="w-full flex flex-col items-center gap-[30px] md:flex-row md:flex-wrap md:justify-center lg:flex-nowrap">
            {posts.map((p, i) => (
              <PostCard key={i} {...p} />
            ))}
          </div>
        </div>
      </section>
    );
  }