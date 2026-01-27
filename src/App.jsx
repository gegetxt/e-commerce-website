import Header from "./layout/Header.jsx";
import PageContent from "./layout/PageContent.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden bg-[#FAFAFA] text-[#252B42] font-['Montserrat']">
      <Header />
      <PageContent />
      <Footer />
    </div>
  );
}