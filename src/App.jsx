import Header from "./layout/Header.jsx";
import PageContent from "./layout/PageContent.jsx";
import Footer from "./components/Footer.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { verifyTokenThunk } from "./store/actions/thunks";
import { fetchCategoriesThunk } from "./store/actions/thunks";

export default function App() {
 
    const dispatch = useDispatch();
  
    useEffect(() => {
      dispatch(verifyTokenThunk());
    }, [dispatch]);
    useEffect(() => {
      dispatch(fetchCategoriesThunk());
    }, [dispatch]);
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden bg-[#FAFAFA] text-[#252B42] font-['Montserrat']">
      <ScrollToTop />
      <Header />
      <PageContent />
      <Footer />
     
    </div>
  );
}