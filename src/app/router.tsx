import { createHashRouter } from "react-router";
import RootLayout from "@/app/RootLayout";
import HomePage from "@/components/home/HomePage";
import VersionsPage from "@/components/versions/VersionsPage";
import BuilderDocuments from "@/components/documentation/builder/BuilderDocuments";
import ValidatorPage from "@/components/documentation/validator/ValidatorPage";
import ExpiryCheckerPage from "@/components/documentation/expiryChecker/ExpiryCheckerPage";
import DictionaryExtensionsPage from "@/components/documentation/dictionaryExtensions/DictionaryExtensionsPage";

// GitHub Pages serves only files, so the route is kept in the hash (spec section 5.1).
const router = createHashRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "versions", element: <VersionsPage /> },
      { path: "documentation/builder", element: <BuilderDocuments /> },
      { path: "documentation/validator", element: <ValidatorPage /> },
      { path: "documentation/expiry", element: <ExpiryCheckerPage /> },
      { path: "documentation/dictionary", element: <DictionaryExtensionsPage /> },
    ],
  },
]);

export default router;
