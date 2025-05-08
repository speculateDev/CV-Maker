// useHtmlStyles.js
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function useHtmlStyles() {
  const location = useLocation();

  useEffect(() => {
    const html = document.documentElement;

    if (location.pathname === "/preview") {
      html.style.fontSize = "50%";
    } else {
      html.style.fontSize = "62.5%";
      html.style.borderTop = "none";
    }
  }, [location.pathname]);
}
