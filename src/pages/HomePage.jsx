import HeroSlider from "../components/HeroSlider.jsx";
import ShopCards from "../components/ShopCards.jsx";
import ProductSection from "../components/ProductSection.jsx";
import MostPopularSection from "../components/MostPopularSection.jsx";
import ProductCards25 from "../components/ProductCards25.jsx";
import ProductCards4 from "../components/ProductCards4.jsx";
import BestsellerProducts from "../components/BestsellerProducts.jsx";
import Clients from "../components/Clients";
import FeaturedPosts from "../components/FeaturedPosts";
export default function HomePage() {
  return (
    <div className="w-full">
      <HeroSlider />
      <ShopCards />
      <ProductSection />
      <MostPopularSection />
      <ProductCards25 />
      <ProductCards4 />
      <BestsellerProducts />
      <Clients />
      <FeaturedPosts />
    </div>
  );
}