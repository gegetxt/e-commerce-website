import {
  SiShopify,
  SiLyft,
  SiStripe,
  SiAmazon,
  SiReddit,
  SiLeaflet, // Leaf yerine en yakın (istersen değiştiririz)
} from "react-icons/si";

function BrandIcon({ Icon, label }) {
  return (
    <div className="w-[153px] h-[80px] flex items-center justify-center">
      <Icon
        aria-label={label}
        title={label}
        className="w-[103px] h-[75px] text-[#737373] opacity-70"
      />
    </div>
  );
}

export default function Clients() {
  const clients = [
    { id: 1, Icon: SiShopify, label: "Hooli" },
    { id: 2, Icon: SiLyft, label: "Lyft" },
    { id: 3, Icon: SiLeaflet, label: "Leaf" },
    { id: 4, Icon: SiStripe, label: "Stripe" },
    { id: 5, Icon: SiAmazon, label: "AWS" },
    { id: 6, Icon: SiReddit, label: "Reddit" },
  ];

  return (
    <section className="w-full bg-[#FAFAFA]">
      <div className="max-w-[1050px] mx-auto flex items-center justify-center py-[50px]">
        <div className="flex flex-col items-center gap-[30px] w-full md:flex-row md:flex-wrap lg:flex-nowrap lg:justify-between">
          {clients.map((c) => (
            <BrandIcon key={c.id} Icon={c.Icon} label={c.label} />
          ))}
        </div>
      </div>
    </section>
  );
}