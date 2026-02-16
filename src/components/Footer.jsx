import { FiPhone, FiMapPin, FiSend } from "react-icons/fi";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

const footerLinks = [
  {
    title: "Company Info",
    links: ["About Us", "Carrier", "We are hiring", "Blog"],
  },
  {
    title: "Legal",
    links: ["About Us", "Carrier", "We are hiring", "Blog"],
  },
  {
    title: "Features",
    links: ["Business Marketing", "User Analytic", "Live Chat", "Unlimited Support"],
  },
  {
    title: "Resources",
    links: ["IOS & Android", "Watch a Demo", "Customers", "API"],
  },
];

export default function Footer() {
  return (
    <footer className="w-full bg-[#252B42] text-white">
      {/* TOP CTA */}
      <div className="w-full">
        <div className="max-w-[1150px] mx-auto px-16 py-[50px]">
          {/* mobile: center + stack | desktop: row */}
          <div className="flex flex-col items-left text-left gap-6 md:flex-row md:items-center md:justify-between md:text-left">
            <div className="flex flex-col gap-[10px] md:max-w-[520px]">
              {/* figma mobile h3: 24/32 | desktop is also fine */}
              <h3 className="font-bold text-[24px] leading-[32px] tracking-[0.1px]">
                Consulting Agency For Your Business
              </h3>

              {/* figma mobile paragraph: 14/20 */}
              <p className="max-w-[180px] text-[14px] leading-[20px] tracking-[0.2px] opacity-90 md:max-w-[1050px]">
                the quick fox jumps over the lazy dog
              </p>
            </div>
            <div className="h-[5px]" />
            <button className="max-w-[160px] h-[52px] px-[24px] rounded-[5px] bg-[#23A6F0] text-white font-bold text-[14px] leading-[22px] tracking-[0.2px]">
              Contact Us
            </button>
          </div>
        </div>
      </div>

      {/* LINKS */}
      <div className="w-full">
        <div className="max-w-[1150px] mx-auto px-16 py-[50px]">
          {/* mobile: tek kolon | desktop: yan yana */}
          <div className="flex flex-col items-start gap-[20px] text-left md:flex-row md:items-start md:justify-between">
            {footerLinks.map((col) => (
              <div key={col.title} className="w-full max-w-[321px] md:w-[321px] flex flex-col gap-[20px]">
                <h5 className="font-bold text-[16px] leading-[24px] tracking-[0.1px]">
                  {col.title}
                </h5>

                <div className="flex flex-col items-start gap-[10px]">
                  {col.links.map((t) => (
                    <a
                      key={t}
                      href="#"
                      className="font-bold text-[14px] leading-[24px] tracking-[0.2px] hover:opacity-80"
                    >
                      {t}
                    </a>
                  ))}
                </div>
              </div>
            ))}

            {/* GET IN TOUCH */}
            <div className="w-full max-w-[321px] flex flex-col gap-[20px]">
              <h5 className="font-bold text-[16px] leading-[24px] tracking-[0.1px]">
                Get In Touch
              </h5>

              {/* mobile: ortalı | desktop: sola */}
              <div className="flex flex-col gap-[10px] items-center md:items-start">
                <div className="w-full flex items-center gap-[10px]">
                  <FiPhone className="text-[#8EC2F2]" size={24} />
                  <span className="font-bold text-[14px] leading-[24px] tracking-[0.2px]">
                    (480) 555-0103
                  </span>
                </div>

                <div className="w-full flex items-center gap-[10px]">
                  <FiMapPin className="text-[#8EC2F2]" size={24} />
                  <span className="font-bold text-[14px] leading-[24px] tracking-[0.2px]">
                    4517 Washington Ave.
                  </span>
                </div>

                <div className="w-full flex items-center gap-[10px]">
                  <FiSend className="text-[#8EC2F2]" size={24} />
                  <span className="font-bold text-[14px] leading-[24px] tracking-[0.2px]">
                    debra.holt@example.com
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="w-full">
        <div className="max-w-[1150px] mx-auto px-16 py-[25px]">
          {/* mobile: stack + ortalı | desktop: row */}
          <div className="flex flex-col px-4items-center text-left gap-[20px] md:flex-row md:items-center md:justify-between md:text-left ">
            <p className="font-bold text-[14px] leading-[24px] tracking-[0.2px]">
              {/* mobile figma: 2 satır | desktop: tek satır */}
              <span className="md:hidden">
                Made With Love By Finland <br /> All Right Reserved
              </span>
              <span className="hidden md:inline">
                Made With Love By Finland All Right Reserved
              </span>
            </p>

            <div className="flex items-center gap-[20px]">
              <a href="#" aria-label="Facebook" className="text-[#335BF5] md:text-[#23A6F0]">
                <FaFacebookF size={24} />
              </a>
              <a href="#" aria-label="Instagram" className="text-[#E51F5A] md:text-[#23A6F0]">
                <FaInstagram size={24} />
              </a>
              <a href="#" aria-label="Twitter" className="text-[#21A6DF] md:text-[#23A6F0]">
                <FaTwitter size={24} />
              </a>
              <a href="#" aria-label="YouTube" className="text-[#E42F08] md:hidden">
                <FaYoutube size={24} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
