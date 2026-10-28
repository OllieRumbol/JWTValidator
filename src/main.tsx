import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router/dom";
import GlobalStyles from "@mui/material/GlobalStyles";
import { ThemeProvider } from "@mui/material/styles";
import "@/app/fonts";
import "@/style/index.css";
import router from "@/app/router";
import theme, { globalStyles } from "@/app/theme";

createRoot(document.getElementById("app-root")!).render(
  <ThemeProvider theme={theme}>
    <GlobalStyles styles={globalStyles} />
    <RouterProvider router={router} />
  </ThemeProvider>,
);
