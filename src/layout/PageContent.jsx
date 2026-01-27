import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage.jsx";

export default function PageContent() {
  return (
    <main className="flex-1">
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* diğer sayfalar sonra eklenecek */}
      </Routes>
    </main>
  );
}