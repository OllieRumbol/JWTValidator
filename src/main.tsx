import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router/dom";
import "@/style/index.css";
import router from "@/app/router";

createRoot(document.getElementById("app-root")!).render(
  <RouterProvider router={router} />,
);
