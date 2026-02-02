import { Facebook, Instagram, Linkedin, Play, Twitter } from "lucide-react";
import Clients from "../components/Clients.jsx";
import heroImg from "../assets/images/girl-with-shopping-bag.png";
import videoThumb from "../assets/images/most-popular-left.jpg";
import testimonialImg from "../assets/images/woman-1.jpg";
import teamImg1 from "../assets/images/woman-2.jpg";
import teamImg2 from "../assets/images/man-2.jpg";
import teamImg3 from "../assets/images/man-1.jpg";

const stats = [
  { value: "15K", label: "Happy Customers" },
  { value: "150K", label: "Monthly Visitors" },
  { value: "15", label: "Countries Worldwide" },
  { value: "100+", label: "Top Partners" },
];

const aboutTeam = [
  { id: 1, name: "Gokhan Gundogdu", role: "Full Stack Developer", img: teamImg1 },
  { id: 2, name: "Aylin Yildiz", role: "Product Designer", img: teamImg2 },
  { id: 3, name: "Emre Kaya", role: "Frontend Developer", img: teamImg3 },
];

function AboutTeamCard({ member }) {
  return (
    <div className="w-full max-w-[329px] bg-white flex flex-col items-center">
      <div className="w-full h-[231px] overflow-hidden">
        <img src={member.img} alt={member.name} className="w-full h-full object-cover" />
      </div>
      <div className="w-full h-[152px] flex flex-col items-center justify-center gap-[10px] px-[30px]">
        <h5 className="text-[#252B42] font-bold text-[16px] leading-[24px] tracking-[0.1px] text-center">
          {member.name}
        </h5>
        <p className="text-[#737373] font-bold text-[14px] leading-[24px] tracking-[0.2px] text-center">
          {member.role}
        </p>
        <div className="flex items-center gap-[20px] text-[#23A6F0]">
          <Facebook size={24} />
          <Instagram size={24} />
          <Twitter size={24} />
        </div>
      </div>
    </div>
  );
}

export default function AboutPage() {
  return (
    <div className="w-full bg-white">
      {/* Hero */}
      <section className="w-full bg-white">
        <div className="max-w-[1050px] mx-auto px-4 py-[80px] md:py-[112px]">
          <div className="flex flex-col md:flex-row items-center gap-[41px] md:gap-[30px]">
            <div className="w-full md:w-[599px] flex flex-col items-center md:items-start text-center md:text-left gap-[35px]">
              <p className="text-[#252B42] font-bold text-[16px] leading-[24px] tracking-[0.1px]">
                ABOUT COMPANY
              </p>
              <h1 className="text-[#252B42] font-bold text-[40px] leading-[50px] md:text-[58px] md:leading-[80px] tracking-[0.2px]">
                We are building the future
              </h1>
              <p className="text-[#737373] font-normal text-[20px] leading-[30px] tracking-[0.2px] max-w-[376px]">
                We know how large objects will act, but things on a small scale
                just do not act that way.
              </p>

              <button
                type="button"
                className="h-[52px] px-[40px] bg-[#23A6F0] text-white rounded-[5px] font-bold text-[14px] leading-[22px] tracking-[0.2px]"
              >
                Get Quote Now
              </button>
            </div>

            <div className="w-full md:w-[415px] h-[440px] md:h-[612px] relative flex items-center justify-center">
              <div className="absolute left-[40px] top-[36px] md:left-[58px] md:top-0 w-[295px] h-[295px] md:w-[484px] md:h-[484px] rounded-full bg-[#FFE9EA]" />
              <div className="absolute left-[4px] top-[43px] md:left-0 md:top-[12px] w-[47px] h-[47px] md:w-[77px] md:h-[77px] rounded-full bg-[#FFE9EA]" />
              <div className="absolute right-[20px] top-[186px] md:right-[16px] md:top-[248px] w-[18px] h-[18px] md:w-[30px] md:h-[30px] rounded-full bg-[#FFE9EA]" />
              <div className="absolute right-[6px] top-[110px] md:right-[0px] md:top-[122px] w-[9px] h-[9px] md:w-[14px] md:h-[14px] rounded-full bg-[#977DF4]" />
              <div className="absolute left-[19px] top-[285px] md:left-[24px] md:top-[409px] w-[9px] h-[9px] md:w-[14px] md:h-[14px] rounded-full bg-[#977DF4]" />

              <img
                src={heroImg}
                alt="About hero"
                className="relative z-10 w-[376px] md:w-[571px] h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="w-full bg-white">
        <div className="max-w-[1018px] mx-auto px-4 py-[80px] flex flex-col md:flex-row items-center gap-[60px]">
          <div className="w-full md:w-[394px] flex flex-col gap-[24px] text-center md:text-left">
            <p className="text-[#E74040] text-[14px] leading-[20px] tracking-[0.2px]">
              Problems trying
            </p>
            <h3 className="text-[#252B42] font-bold text-[24px] leading-[32px] tracking-[0.1px]">
              Met minim Mollie non desert Alamo est sit cliquey dolor do met sent.
            </h3>
          </div>
          <div className="w-full md:w-[529px] text-center md:text-left text-[#737373] text-[14px] leading-[20px] tracking-[0.2px]">
            Problems trying to resolve the conflict between the two major realms of
            Classical physics: Newtonian mechanics.
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="w-full bg-white">
        <div className="max-w-[1050px] mx-auto px-4 py-[80px]">
          <div className="flex flex-col md:flex-row items-center justify-between gap-[50px]">
            {stats.map((item) => (
              <div key={item.label} className="flex flex-col items-center">
                <div className="text-[#252B42] font-bold text-[58px] leading-[80px] tracking-[0.2px]">
                  {item.value}
                </div>
                <div className="text-[#737373] font-bold text-[16px] leading-[24px] tracking-[0.1px] text-center">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video */}
      <section className="w-full bg-white">
        <div className="max-w-[1050px] mx-auto px-4 py-[80px] flex items-center justify-center">
          <div className="w-full max-w-[989px] h-[316px] md:h-[540px] rounded-[20px] overflow-hidden relative">
            <img src={videoThumb} alt="Video thumbnail" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80" />
            <button
              type="button"
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[56px] h-[56px] md:w-[92px] md:h-[92px] rounded-full bg-[#23A6F0] flex items-center justify-center"
              aria-label="Play video"
            >
              <Play className="text-white" size={24} />
            </button>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="w-full bg-white">
        <div className="max-w-[1050px] mx-auto px-4 py-[80px] md:py-[112px] flex flex-col items-center gap-[60px] md:gap-[112px]">
          <div className="text-center flex flex-col items-center gap-[10px] max-w-[607px]">
            <h2 className="text-[#252B42] font-bold text-[40px] leading-[50px] tracking-[0.2px]">
              Meet Our Team
            </h2>
            <p className="text-[#737373] text-[14px] leading-[20px] tracking-[0.2px]">
              Problems trying to resolve the conflict between the two major realms
              of Classical physics: Newtonian mechanics.
            </p>
          </div>

          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-[30px] place-items-center">
            {aboutTeam.map((member) => (
              <AboutTeamCard key={member.id} member={member} />
            ))}
          </div>
        </div>
      </section>

      {/* Clients */}
      <section className="w-full bg-[#FAFAFA]">
        <div className="max-w-[1050px] mx-auto px-4 py-[80px] flex flex-col items-center gap-[30px]">
          <div className="text-center max-w-[864px] flex flex-col items-center gap-[30px]">
            <h2 className="text-[#252B42] font-bold text-[40px] leading-[50px] tracking-[0.2px]">
              Big Companies Are Here
            </h2>
            <p className="text-[#737373] text-[14px] leading-[20px] tracking-[0.2px]">
              Problems trying to resolve the conflict between the two major realms
              of Classical physics: Newtonian mechanics.
            </p>
          </div>
          <Clients />
        </div>
      </section>

      {/* Testimonials */}
      <section className="w-full bg-[#2A7CC7]">
        <div className="max-w-[1050px] mx-auto px-4 py-[80px] md:py-[112px]">
          <div className="flex flex-col md:flex-row items-center justify-between gap-[60px]">
            <div className="w-full md:w-[438px] text-white flex flex-col gap-[24px] text-center md:text-left">
              <p className="font-bold text-[16px] leading-[24px] tracking-[0.1px]">
                WORK WITH US
              </p>
              <h2 className="font-bold text-[40px] leading-[50px] tracking-[0.2px]">
                Now Let’s grow Yours
              </h2>
              <p className="text-[14px] leading-[20px] tracking-[0.2px]">
                The gradual accumulation of information about atomic and small-scale
                behavior during the first quarter of the 20th.
              </p>
              <button
                type="button"
                className="h-[52px] px-[40px] border border-[#FAFAFA] rounded-[5px] text-[#FAFAFA] font-bold text-[14px] leading-[22px] tracking-[0.2px]"
              >
                Button
              </button>
            </div>

            <div className="w-full md:w-[548px] h-[412px] overflow-hidden">
              <img src={testimonialImg} alt="Testimonials" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
