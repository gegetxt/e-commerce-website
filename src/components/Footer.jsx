import { FiPhone, FiMapPin, FiSend } from "react-icons/fi";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

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
      <div className="w-full">
        <div className="max-w-[1050px] mx-auto px-4 py-[40px]">
          <div className="flex flex-col items-center text-center gap-6 md:flex-row md:items-center md:justify-between md:text-left">
            <div className="flex flex-col gap-[10px]">
              <h3 className="font-bold text-[24px] leading-[32px] tracking-[0.1px]">
                Consulting Agency For Your Business
              </h3>
              <p className="text-[14px] leading-[20px] tracking-[0.2px]">
                the quick fox jumps over the lazy dog
              </p>
            </div>

            <button className="h-[52px] px-[40px] rounded-[5px] bg-[#23A6F0] text-white font-bold text-[14px] leading-[22px] tracking-[0.2px]">
              Contact Us
            </button>
          </div>
        </div>
      </div>

      <div className="w-full">
        <div className="max-w-[1050px] mx-auto px-4 py-[50px]">
          <div className="flex flex-col items-center text-center gap-[30px] md:flex-row md:items-start md:text-left">
            {footerLinks.map((col) => (
              <div key={col.title} className="w-[152px] flex flex-col gap-[20px]">
                <h5 className="font-bold text-[16px] leading-[24px] tracking-[0.1px]">
                  {col.title}
                </h5>

                <div className="flex flex-col gap-[10px]">
                  {col.links.map((t) => (
                    <a
                      key={t}
                      href="#"
                      className="font-bold text-[14px] leading-[24px] tracking-[0.2px]"
                    >
                      {t}
                    </a>
                  ))}
                </div>
              </div>
            ))}

            <div className="w-[321px] flex flex-col gap-[20px]">
              <h5 className="font-bold text-[16px] leading-[24px] tracking-[0.1px]">
                Get In Touch
              </h5>

              <div className="flex flex-col gap-[10px] items-center md:items-start">
                <div className="flex items-center gap-[10px]">
                  <FiPhone className="text-white" size={24} />
                  <span className="font-bold text-[14px] leading-[24px] tracking-[0.2px]">
                    (480) 555-0103
                  </span>
                </div>

                <div className="flex items-center gap-[10px]">
                  <FiMapPin className="text-white" size={24} />
                  <span className="font-bold text-[14px] leading-[24px] tracking-[0.2px]">
                    4517 Washington Ave.
                  </span>
                </div>

                <div className="flex items-center gap-[10px]">
                  <FiSend className="text-white" size={24} />
                  <span className="font-bold text-[14px] leading-[24px] tracking-[0.2px]">
                    debra.holt@example.com
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full">
        <div className="max-w-[1050px] mx-auto px-4 py-[25px]">
          <div className="flex flex-col items-center text-center gap-[20px] md:flex-row md:items-center md:justify-between md:text-left">
            <p className="font-bold text-[14px] leading-[24px] tracking-[0.2px]">
              Made With Love By Finland All Right Reserved
            </p>

            <div className="flex items-center gap-[20px]">
              <a href="#" aria-label="Facebook" className="text-[#23A6F0]">
                <FaFacebookF size={24} />
              </a>
              <a href="#" aria-label="Instagram" className="text-[#23A6F0]">
                <FaInstagram size={24} />
              </a>
              <a href="#" aria-label="Twitter" className="text-[#23A6F0]">
                <FaTwitter size={24} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
