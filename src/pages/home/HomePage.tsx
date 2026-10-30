import Box from "@mui/material/Box";
import PageTitle from "@/components/PageTitle/PageTitle";
import AuthorSection from "./AuthorSection";
import ExampleSection from "./ExampleSection";
import HeroSection from "./HeroSection";
import PartsSection from "./PartsSection";

// Home, as home.html shows it (spec section 6.1.7). Until release 3, the example has no
// tabs, and the migration button and the "New in 2.0.0" section are left out (T27).
const HomePage = () => {
  return (
    <Box sx={{ fontSize: "17px", lineHeight: 1.6 }}>
      <PageTitle />
      <HeroSection />
      <PartsSection />
      <ExampleSection />
      <AuthorSection />
    </Box>
  );
};

export default HomePage;
