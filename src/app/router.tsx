import { createHashRouter, type RouteObject } from "react-router";
import RootLayout from "@/app/RootLayout";
import HomePage from "@/components/home/HomePage";
import VersionsPage from "@/components/versions/VersionsPage";
import BuilderDocuments from "@/components/documentation/builder/BuilderDocuments";
import ValidatorPage from "@/components/documentation/validator/ValidatorPage";
import ExpiryCheckerPage from "@/components/documentation/expiryChecker/ExpiryCheckerPage";
import DictionaryExtensionsPage from "@/components/documentation/dictionaryExtensions/DictionaryExtensionsPage";

// Exported so tests can build their own router from the same routes.
export const routes: RouteObject[] = [
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "versions", element: <VersionsPage /> },
      { path: "documentation/builder", element: <BuilderDocuments /> },
      { path: "documentation/validator", element: <ValidatorPage /> },
      { path: "documentation/expiry", element: <ExpiryCheckerPage /> },
      {
        path: "documentation/dictionary",
        element: <DictionaryExtensionsPage />,
      },
      // Keeps the header and footer on an unknown address, as before. Without it the
      // router shows its own error page. Release 2 replaces it with "Page not found".
      // The element is null, not missing, because the router warns about a leaf route
      // with no element.
      { path: "*", element: null },
    ],
  },
];

// GitHub Pages serves only files, so the route is kept in the hash (spec section 5.1).
const router = createHashRouter(routes);

export default router;
