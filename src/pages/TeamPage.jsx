import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import heroLargeImg from "../assets/images/happy-family-shopping-cart-buying-food.jpg";
import heroSmall1 from "../assets/images/veggies-section.jpg";
import heroSmall2 from "../assets/images/coffee-section.jpg";
import heroSmall3 from "../assets/images/cheese-section.jpg";
import heroSmall4 from "../assets/images/shopping-cart-aisle.jpg";
import teamImg1 from "../assets/images/man-1.jpg";
import teamImg2 from "../assets/images/man-2.jpg";
import teamImg3 from "../assets/images/woman-3.jpg";
import teamImg4 from "../assets/images/woman-4.jpg";
import teamImg5 from "../assets/images/man-4.jpg";
import teamImg6 from "../assets/images/woman-2.jpg";
import teamImg7 from "../assets/images/gizemg.jpg";
import teamImg8 from "../assets/images/woman-1.jpg";
import teamImg9 from "../assets/images/man-3.jpg";

const teamMembers = [
  { id: 1, name: "Gokhan Gundogdu", role: "UI Engineer", img: teamImg1 },
  { id: 2, name: "Emre Yildiz", role: "Product Designer", img: teamImg2 },
  { id: 3, name: "Aylin Kaya", role: "Frontend Developer", img: teamImg3 },
  { id: 4, name: "Zeynep Demir", role: "Backend Developer", img: teamImg4 },
  { id: 5, name: "Mert Aslan", role: "QA Engineer", img: teamImg5 },
  { id: 6, name: "Elif Acar", role: "Project Manager", img: teamImg6 },
  { id: 7, name: "Gizem Gündüz", role: "Full Stack Developer", img: teamImg7 },
  { id: 8, name: "Derya Er", role: "Content Strategist", img: teamImg8 },
  { id: 9, name: "Ozan Kara", role: "DevOps Engineer", img: teamImg9 },
];

function TeamCard({ member }) {
  return (
    <div className="w-full max-w-[329px] bg-white flex flex-col items-center">
      <div className="w-full h-[231px] flex items-center justify-center overflow-hidden">
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

export default function TeamPage() {
  return (
    <div className="w-full bg-white">
      {/* Header */}
      <section className="w-full bg-white">
        <div className="max-w-[870px] mx-auto px-4 py-[50px] md:py-[50px]">
          <div className="flex flex-col items-center gap-[16px] text-center">
            <p className="text-[#737373] font-bold text-[16px] leading-[24px] tracking-[0.1px]">
              WHAT WE DO
            </p>
            <h1 className="text-[#252B42] font-bold text-[40px] leading-[50px] md:text-[58px] md:leading-[80px] tracking-[0.2px]">
              Innovation tailored for you
            </h1>
            <div className="flex items-center gap-[15px] text-[14px] leading-[24px] tracking-[0.2px] font-bold">
              <span className="text-[#252B42]">Home</span>
              <span className="text-[#BDBDBD]">›</span>
              <span className="text-[#737373]">Team</span>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Picture */}
      <section className="w-full bg-white">
        <div className="w-full">
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/2 h-[520px] overflow-hidden">
              <img src={heroLargeImg} alt="Team hero" className="w-full h-full object-cover" />
            </div>
            <div className="w-full md:w-1/2 flex flex-col">
              <div className="flex w-full">
                <div className="w-1/2 h-[260px] overflow-hidden">
                  <img src={heroSmall1} alt="Team gallery 1" className="w-full h-full object-cover" />
                </div>
                <div className="w-1/2 h-[260px] overflow-hidden">
                  <img src={heroSmall2} alt="Team gallery 2" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="flex w-full">
                <div className="w-1/2 h-[260px] overflow-hidden">
                  <img src={heroSmall3} alt="Team gallery 3" className="w-full h-full object-cover" />
                </div>
                <div className="w-1/2 h-[260px] overflow-hidden">
                  <img src={heroSmall4} alt="Team gallery 4" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Grid */}
      <section className="w-full bg-white">
        <div className="max-w-[1050px] mx-auto px-4 py-[30px] md:py-[112px] flex flex-col items-center gap-[30px] md:gap-[112px]">
          <div className="text-center">
            <h2 className="text-[#252B42] font-bold text-[40px] leading-[50px] tracking-[0.2px]">
              Meet Our Team
            </h2>
          </div>

          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-[30px] place-items-center">
            {teamMembers.map((member) => (
              <TeamCard key={member.id} member={member} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full bg-white">
        <div className="max-w-[1050px] mx-auto px-4 py-[80px] md:py-[80px] flex flex-col items-center gap-[36px]">
          <div className="text-center flex flex-col items-center gap-[30px]">
            <h2 className="text-[#252B42] font-bold text-[40px] leading-[50px] tracking-[0.2px]">
              Start your 14 days free trial
            </h2>
            <p className="text-[#737373] text-[14px] leading-[20px] tracking-[0.2px] max-w-[411px]">
              Met minim Mollie non desert Alamo est sit cliquey dolor do met
              sent. RELIT official consequent.
            </p>
            <button
              type="button"
              className="h-[52px] px-[40px] bg-[#23A6F0] text-white rounded-[5px] font-bold text-[14px] leading-[22px] tracking-[0.2px]"
            >
              Try it free now
            </button>
            <div className="flex items-center gap-[34px] text-[#23A6F0]">
              <Twitter size={30} />
              <Facebook size={30} />
              <Instagram size={30} />
              <Linkedin size={30} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
