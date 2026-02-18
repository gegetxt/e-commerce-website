import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage.jsx";
import ShopPage from "../pages/ShopPage.jsx";
import ProductDetailPage from "../pages/ProductDetailPage.jsx";
import ShoppingCartPage from "../pages/ShoppingCartPage.jsx";
import CreateOrderPage from "../pages/CreateOrderPage.jsx";
import PreviousOrdersPage from "../pages/PreviousOrdersPage.jsx";
import OrderSuccessPage from "../pages/OrderSuccessPage.jsx";
import ContactPage from "../pages/ContactPage.jsx";
import TeamPage from "../pages/TeamPage.jsx";
import AboutPage from "../pages/AboutPage.jsx";
import SignupPage from "../pages/SignupPage.jsx";
import LoginPage from "../pages/LoginPage.jsx";
import ProtectedRoute from "../components/ProtectedRoute.jsx";

export default function PageContent() {
  return (
    <main className="flex-1">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/shop/:gender/:categoryName/:categoryId" element={<ShopPage />} />
        <Route path="/product/:productId" element={<ProductDetailPage />} />
        <Route
          path="/shop/:gender/:categoryName/:categoryId/:productNameSlug/:productId"
          element={<ProductDetailPage />}
        />
        <Route path="/cart" element={<ShoppingCartPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/order"
          element={
            <ProtectedRoute>
              <CreateOrderPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <PreviousOrdersPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/order-success"
          element={
            <ProtectedRoute>
              <OrderSuccessPage />
            </ProtectedRoute>
          }
        />
        {/* diğer sayfalar sonra eklenecek */}
      </Routes>
    

    </main>
  );
}