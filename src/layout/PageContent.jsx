import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage.jsx";
import ShopPage from "../pages/ShopPage.jsx";
import ProductDetailPage from "../pages/ProductDetailPage.jsx";
import ContactPage from "../pages/ContactPage.jsx";
import TeamPage from "../pages/TeamPage.jsx";
import AboutPage from "../pages/AboutPage.jsx";

export default function PageContent() {
  return (
    <main className="flex-1">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/about" element={<AboutPage />} />
        {/* diğer sayfalar sonra eklenecek */}
      </Routes>
    </main>
  );
}