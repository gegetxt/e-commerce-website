import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import heroImg from "../assets/images/happy-family.png";

const contactCards = [
  {
    title: "Get Support",
    lines: ["gegetxt", "2 hours ago (edited)"],
    cta: "Submit Request",
    inverted: false,
  },
  {
    title: "Talk to Sales",
    lines: ["gegetxt", "2 hours ago (edited)"],
    cta: "Contact Sales",
    inverted: true,
  },
  {
    title: "Press Inquiries",
    lines: ["gegetxt", "2 hours ago (edited)"],
    cta: "Send Email",
    inverted: false,
  },
];

export default function ContactPage() {
  return (
    <div className="w-full bg-white">
      {/* Hero */}
      <section className="w-full bg-white">
        <div className="max-w-[1050px] mx-auto px-4 py-[80px] md:py-[112px]">
          <div className="flex flex-col md:flex-row items-center gap-[41px] md:gap-[30px]">
            <div className="w-full md:w-[599px] flex flex-col items-center md:items-start text-center md:text-left gap-[35px]">
              <p className="text-[#252B42] font-bold text-[16px] leading-[24px] tracking-[0.1px]">
                Contact Us
              </p>
              <h1 className="text-[#252B42] font-bold text-[40px] leading-[50px] md:text-[58px] md:leading-[80px] tracking-[0.2px]">
                Get in touch today
              </h1>
              <p className="text-[#737373] font-normal text-[20px] leading-[30px] tracking-[0.2px] max-w-[376px]">
                We know how large objects will act, but things on a small scale
                just do not act that way.
              </p>

              <div className="flex flex-col items-center md:items-start gap-[10px]">
                <p className="text-[#252B42] font-bold text-[24px] leading-[32px] tracking-[0.1px]">
                  (225) 555-0118
                </p>
                <p className="text-[#252B42] font-bold text-[24px] leading-[32px] tracking-[0.1px]">
                  michelle.rivera@example.com
                </p>
              </div>

              <div className="flex items-center gap-[34px] text-[#252B42]">
                <Twitter size={30} />
                <Facebook size={30} />
                <Instagram size={30} />
                <Linkedin size={30} />
              </div>
            </div>

            <div className="w-full md:w-[460px] h-[470px] md:h-[660px] relative flex items-center justify-center">
              <div className="absolute left-[40px] top-[36px] md:left-[58px] md:top-0 w-[295px] h-[295px] md:w-[484px] md:h-[484px] rounded-full bg-[#FFE9EA]" />
              <div className="absolute left-[4px] top-[43px] md:left-0 md:top-[12px] w-[47px] h-[47px] md:w-[77px] md:h-[77px] rounded-full bg-[#FFE9EA]" />
              <div className="absolute right-[20px] top-[186px] md:right-[16px] md:top-[248px] w-[18px] h-[18px] md:w-[30px] md:h-[30px] rounded-full bg-[#FFE9EA]" />
              <div className="absolute right-[6px] top-[110px] md:right-[0px] md:top-[122px] w-[9px] h-[9px] md:w-[14px] md:h-[14px] rounded-full bg-[#977DF4]" />
              <div className="absolute left-[19px] top-[285px] md:left-[24px] md:top-[409px] w-[9px] h-[9px] md:w-[14px] md:h-[14px] rounded-full bg-[#977DF4]" />

              <img
                src={heroImg}
                alt="Contact illustration"
                className="relative z-10 w-[1000px] md:w-[1000px] md:h-[800px] h-[620px]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="w-full bg-white">
        <div className="max-w-[1050px] mx-auto px-4 py-[60px] md:py-[112px] flex flex-col items-center gap-[60px] md:gap-[80px]">
          <div className="text-center flex flex-col items-center gap-[10px] max-w-[625px]">
            <p className="text-[#252B42] font-bold text-[14px] leading-[24px] tracking-[0.2px]">
              T05: Contact Page
            </p>
            <h2 className="text-[#252B42] font-bold text-[40px] leading-[50px] tracking-[0.2px]">
              We help small businesses with big ideas
            </h2>
          </div>

          <div className="w-full flex flex-col md:flex-row items-center gap-[30px]">
            {contactCards.map((card) => (
              <div
                key={card.title}
                className={
                  (card.inverted
                    ? "bg-[#252B42] text-white"
                    : "bg-white text-[#252B42]") +
                  " w-full md:w-[328px] flex flex-col items-center gap-[15px] px-[40px] py-[50px] md:py-[50px] border border-transparent"
                }
              >
                <div className="w-[72px] h-[72px] rounded-full border border-[#23A6F0] flex items-center justify-center">
                  <div className="w-[36px] h-[36px] rounded-full bg-[#23A6F0]" />
                </div>

                <div className="text-center">
                  <p
                    className={
                      (card.inverted ? "text-white" : "text-[#252B42]") +
                      " font-bold text-[14px] leading-[24px] tracking-[0.2px]"
                    }
                  >
                    {card.lines[0]}
                  </p>
                  <p
                    className={
                      (card.inverted ? "text-white" : "text-[#252B42]") +
                      " font-bold text-[14px] leading-[24px] tracking-[0.2px]"
                    }
                  >
                    {card.lines[1]}
                  </p>
                </div>

                <h5
                  className={
                    (card.inverted ? "text-white" : "text-[#252B42]") +
                    " font-bold text-[16px] leading-[24px] tracking-[0.1px]"
                  }
                >
                  {card.title}
                </h5>

                <button
                  type="button"
                  className="h-[54px] px-[36px] rounded-[37px] border border-[#23A6F0] text-[#23A6F0] font-bold text-[14px] leading-[24px] tracking-[0.2px]"
                >
                  {card.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full bg-white">
        <div className="max-w-[1050px] mx-auto px-4 py-[80px] md:py-[80px] flex flex-col items-center gap-[36px]">
          <div className="text-center flex flex-col items-center gap-[16px]">
            <p className="text-[#252B42] font-bold text-[16px] leading-[24px] tracking-[0.1px]">
              WE CAN&apos;T WAIT TO MEET YOU
            </p>
            <h2 className="text-[#252B42] font-bold text-[58px] leading-[80px] tracking-[0.2px]">
              Let&apos;s Talk
            </h2>
          </div>

          <button
            type="button"
            className="h-[52px] px-[40px] bg-[#23A6F0] text-white rounded-[5px] font-bold text-[14px] leading-[22px] tracking-[0.2px]"
          >
            Try it free now
          </button>
        </div>
      </section>
    </div>
  );
}
