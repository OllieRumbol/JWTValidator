import { useEffect } from "react";
import { useLocation, useParams } from "react-router";

// Scrolls to the section named in the address, /docs/:slug/:section (spec section 6.1.1,
// items 5 and 6). An unknown section leaves the page where ScrollRestoration put it, at
// the top (plan section 4). It runs again when the same section link is selected twice,
// because each navigation has a new location key.
export function useScrollToSection() {
  const { section } = useParams();
  const { key } = useLocation();

  useEffect(() => {
    if (!section) {
      return;
    }

    document.getElementById(section)?.scrollIntoView();
  }, [section, key]);
}
