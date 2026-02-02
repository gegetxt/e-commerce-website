import { Grid2X2, List } from "lucide-react";
import { Link } from "react-router-dom";
import Clients from "../components/Clients.jsx";
import poultryFishMeat from "../assets/images/poultry-fish-meat.png";
import fruitsAndVegetables from "../assets/images/fruits-and-vegetables.jpg";
import dairyProducts from "../assets/images/dairy-products.jpg";
import beverages from "../assets/images/beverages.png";
import snacks from "../assets/images/snacks.png";
import veganMilk from "../assets/images/vegan-milk.jpg";
import water from "../assets/images/water.jpg";
import pastaSpaghetti from "../assets/images/pasta-spaghetti.jpg";
import tomatoPaste from "../assets/images/tomato-paste.jpg";
import lettuce from "../assets/images/lettuce.jpg";
import cola from "../assets/images/cola.jpg";
import apple from "../assets/images/apple.jpg";
import ayran from "../assets/images/ayran.jpg";
import banana from "../assets/images/banana.jpg";
import brownie from "../assets/images/brownie.jpg";
import cheese from "../assets/images/cheese.jpg";
import laysChips from "../assets/images/lays-chips.jpg";

function CategoryCard({ image, title, count }) {
  return (
    <div className="relative w-full h-[300px] sm:h-[223px] overflow-hidden">
      <img src={image} alt="" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-black/25" />
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center gap-1 text-white">
        <div className="text-[16px] leading-[24px] tracking-[0.1px] font-bold">
          {title}
        </div>
        <div className="text-[14px] leading-[20px] tracking-[0.2px]">{count}</div>
      </div>
    </div>
  );
}

function ShopProductCard({ image, to }) {
  return (
    <Link to={to} className="w-full max-w-[240px] flex flex-col bg-white">
      <div className="w-full h-[300px] flex items-center justify-center overflow-hidden">
        <img src={image} alt="" className="max-h-[260px] w-auto object-contain" />
      </div>

      <div className="flex flex-col items-center gap-[10px] px-[25px] pt-[25px] pb-[35px]">
        <div className="text-[16px] leading-[24px] tracking-[0.1px] font-bold text-[#252B42] text-center">
          Graphic Design
        </div>
        <div className="text-[14px] leading-[24px] tracking-[0.2px] font-bold text-[#737373] text-center">
          English Department
        </div>
        <div className="flex items-start gap-[5px] px-[3px] py-[5px]">
          <span className="text-[16px] leading-[24px] tracking-[0.1px] font-bold text-[#BDBDBD]">
            $16.48
          </span>
          <span className="text-[16px] leading-[24px] tracking-[0.1px] font-bold text-[#23856D]">
            $6.48
          </span>
        </div>
        <div className="flex items-center gap-[6px]">
          <span className="w-[16px] h-[16px] rounded-full bg-[#23A6F0]" />
          <span className="w-[16px] h-[16px] rounded-full bg-[#23856D]" />
          <span className="w-[16px] h-[16px] rounded-full bg-[#E77C40]" />
          <span className="w-[16px] h-[16px] rounded-full bg-[#252B42]" />
        </div>
      </div>
    </Link>
  );
}

export default function ShopPage() {
  const categories = [
    { id: 1, image: poultryFishMeat, title: "CLOTHS", count: "5 Items" },
    { id: 2, image: fruitsAndVegetables, title: "CLOTHS", count: "5 Items" },
    { id: 3, image: dairyProducts, title: "CLOTHS", count: "5 Items" },
    { id: 4, image: beverages, title: "CLOTHS", count: "5 Items" },
    { id: 5, image: snacks, title: "CLOTHS", count: "5 Items" },
  ];

  const products = [
    { id: 1, image: veganMilk},
    { id: 2, image: water },
    { id: 3, image: pastaSpaghetti },
    { id: 4, image: tomatoPaste },
    { id: 5, image: lettuce },
    { id: 6, image: cola },
    { id: 7, image: apple},
    { id: 8, image: ayran},
    { id: 9, image: banana },
    { id: 10, image: brownie },
    { id: 11, image: cheese },
    { id: 12, image: laysChips },
  ];

  return (
    <div className="w-full bg-white">

      {/* Page header */}
      <div className="w-full bg-[#FAFAFA]">
        <div className="max-w-[1049px] mx-auto px-4 py-[24px] flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h2 className="text-[24px] leading-[32px] tracking-[0.1px] font-bold text-[#252B42]">
            Shop
          </h2>
          <div className="flex items-center gap-[15px] text-[14px] leading-[24px] tracking-[0.2px] font-bold">
            <span className="text-[#252B42]">Home</span>
            <span className="text-[#BDBDBD]">›</span>
            <span className="text-[#BDBDBD]">Shop</span>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="w-full bg-[#FAFAFA]">
        <div className="max-w-[1088px] mx-auto px-4 pb-[48px]">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-[15px]">
            {categories.map((c) => (
              <CategoryCard key={c.id} {...c} />
            ))}
          </div>
        </div>
      </div>

      {/* Filter row */}
      <div className="w-full bg-white">
        <div className="max-w-[1050px] mx-auto px-4 py-[24px] flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="text-[14px] leading-[24px] tracking-[0.2px] font-bold text-[#737373]">
            Showing all 12 results
          </div>

          <div className="flex items-center gap-[15px]">
            <span className="text-[14px] leading-[24px] tracking-[0.2px] font-bold text-[#737373]">
              Views:
            </span>
            <div className="flex items-center gap-[10px]">
              <button
                type="button"
                className="w-[46px] h-[46px] border border-[#ECECEC] rounded-[5px] flex items-center justify-center"
                aria-label="Grid view"
              >
                <Grid2X2 size={16} className="text-[#252B42]" />
              </button>
              <button
                type="button"
                className="w-[46px] h-[46px] border border-[#ECECEC] rounded-[5px] flex items-center justify-center"
                aria-label="List view"
              >
                <List size={16} className="text-[#737373]" />
              </button>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-[15px]">
            <div className="h-[50px] w-[141px] border border-[#DDDDDD] bg-[#F9F9F9] rounded-[5px] flex items-center px-4 text-[14px] leading-[28px] tracking-[0.2px] text-[#737373]">
              Popularity
            </div>
            <button
              type="button"
              className="h-[50px] px-[20px] bg-[#23A6F0] text-white rounded-[5px] text-[14px] leading-[24px] tracking-[0.2px] font-bold"
            >
              Filter
            </button>
          </div>
        </div>
      </div>

      {/* Products */}
      <div className="w-full bg-white">
        <div className="max-w-[1124px] mx-auto px-4 py-[48px] flex flex-wrap justify-center gap-[30px]">
          {products.map((product) => (
            <ShopProductCard
              key={product.id}
              image={product.image}
              to={`/product/${product.id}`}
            />
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="w-full bg-white">
        <div className="max-w-[1124px] mx-auto px-4 pb-[48px] flex items-center justify-center">
          <div className="flex items-center border border-[#BDBDBD] rounded-[6.7276px] shadow-[0px_2px_4px_rgba(0,0,0,0.1)] overflow-hidden text-[14px] leading-[24px] tracking-[0.2px] font-bold">
            <button
              type="button"
              className="h-[74px] px-[25px] bg-[#F3F3F3] text-[#BDBDBD]"
            >
              First
            </button>
            <button type="button" className="h-[74px] px-[20px] text-[#23A6F0]">
              1
            </button>
            <button type="button" className="h-[74px] px-[20px] bg-[#23A6F0] text-white">
              2
            </button>
            <button type="button" className="h-[74px] px-[20px] text-[#23A6F0]">
              3
            </button>
            <button type="button" className="h-[74px] px-[25px] text-[#23A6F0]">
              Next
            </button>
          </div>
        </div>
      </div>

      <Clients />
    </div>
  );
}
