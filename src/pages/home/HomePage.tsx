import Box from "@mui/material/Box";
import PageTitle from "@/components/PageTitle/PageTitle";
import AuthorSection from "./AuthorSection";
import ExampleSection from "./ExampleSection";
import HeroSection from "./HeroSection";
import PartsSection from "./PartsSection";
import WhatsNewSection from "./WhatsNewSection";

// Home, as home.html shows it (spec section 6.1.7).
const HomePage = () => {
  return (
    <Box sx={{ fontSize: "17px", lineHeight: 1.6 }}>
      <PageTitle />
      <HeroSection />
      <PartsSection />
      <ExampleSection />
      <WhatsNewSection />
      <AuthorSection />
    </Box>
  );
};

export default HomePage;
