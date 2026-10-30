import { useEffect } from "react";
import {
  NavigationType,
  useLocation,
  useNavigate,
  useNavigationType,
  useParams,
} from "react-router";

// Scrolls to the section named in the address, /docs/:slug/:section (spec section 6.1.1,
// items 5 and 6). An unknown section leaves the page where ScrollRestoration put it, at
// the top (plan section 4). It runs again when the same section link is selected twice,
// because each navigation has a new location key.
export function useScrollToSection() {
  const { section } = useParams();
  const { key, pathname } = useLocation();
  const navigationType = useNavigationType();
  const navigate = useNavigate();

  useEffect(() => {
    if (!section) {
      return;
    }

    // Back and Forward return to a saved entry, and ScrollRestoration puts the reader
    // back where they were (plan section 3.5). Only a first load, such as a shared
    // section link, is a "POP" with the key "default".
    const isFirstLoad = key === "default";
    if (navigationType === NavigationType.Pop && !isFirstLoad) {
      return;
    }

    document.getElementById(section)?.scrollIntoView();

    // The first entry has no saved key, so Back to it later would look like a first load.
    // Replacing it gives it a key. preventScrollReset keeps the reader at the section.
    if (isFirstLoad) {
      void navigate(pathname, { replace: true, preventScrollReset: true });
    }
  }, [section, key, pathname, navigationType, navigate]);
}
