import { Outlet, ScrollRestoration } from "react-router";
import Box from "@mui/material/Box";
import SiteFooter from "@/components/SiteFooter/SiteFooter";
import SiteHeader from "@/components/SiteHeader/SiteHeader";
import VersionNotice from "@/components/shared/VersionNotice";

// Every page: the header, the version notice, the page, and the footer. The footer stays
// at the bottom of the window on a short page.
const RootLayout = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* A new page starts at the top, and Back restores the old position (spec section
          6.1.1, items 4 and 7). */}
      <ScrollRestoration />
      <SiteHeader />
      <VersionNotice />
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Outlet />
      </Box>
      <SiteFooter />
    </Box>
  );
};

export default RootLayout;
