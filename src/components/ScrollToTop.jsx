import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname, search, hash, state } = useLocation();
  const preserveScroll = Boolean(state?.preserveScroll);

  useEffect(() => {
    if (preserveScroll) return;

    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname, search, hash, preserveScroll]);

  return null;
}
