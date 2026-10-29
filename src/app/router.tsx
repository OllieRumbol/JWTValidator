import { createHashRouter, replace, type RouteObject } from "react-router";
import RootLayout from "@/app/RootLayout";
import HomePage from "@/components/home/HomePage";
import VersionsPage from "@/components/versions/VersionsPage";
import { docsPages } from "@/content/docsPages";
import DocsPage from "@/pages/docs/DocsPage";
import NotFoundPage from "@/pages/not-found/NotFoundPage";

// A route that sends the reader to another address. It replaces the history entry, so
// Back does not return to the old address (plan section 3.3).
function redirectTo(path: string): RouteObject["loader"] {
  return () => replace(path);
}

// Exported so tests can build their own router from the same routes.
export const routes: RouteObject[] = [
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "versions", element: <VersionsPage /> },
      {
        path: "docs",
        children: [
          {
            index: true,
            loader: redirectTo(`/docs/${docsPages[0].slug}`),
          },
          // The section, when there is one, is the element to scroll to (T20).
          { path: ":slug/:section?", element: <DocsPage /> },
        ],
      },
      // The addresses from before the redesign (spec section 6.2.1).
      {
        path: "documentation/builder",
        loader: redirectTo("/docs/validation-options"),
      },
      {
        path: "documentation/validator",
        loader: redirectTo("/docs/validator"),
      },
      {
        path: "documentation/expiry",
        loader: redirectTo("/docs/expiry-checker"),
      },
      {
        path: "documentation/dictionary",
        loader: redirectTo("/docs/dictionary-extensions"),
      },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
];

// GitHub Pages serves only files, so the route is kept in the hash (spec section 5.1).
const router = createHashRouter(routes);

export default router;
