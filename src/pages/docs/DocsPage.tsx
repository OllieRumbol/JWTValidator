import { useParams } from "react-router";
import DocsLayout from "@/components/DocsLayout/DocsLayout";
import PageTitle from "@/components/PageTitle/PageTitle";
import { docsPages } from "@/content/docsPages";
import NotFoundPage from "@/pages/not-found/NotFoundPage";
import { pageContent } from "./pageContent";

// The docs page for the slug in the address, or "Page not found" for an unknown slug
// (plan section 3.3).
const DocsPage = () => {
  const { slug } = useParams();
  const page = docsPages.find((docsPage) => docsPage.slug === slug);
  const content = page ? pageContent[page.slug] : undefined;

  if (!page || !content) {
    return <NotFoundPage />;
  }

  const { Content, sections } = content;
  return (
    <>
      <PageTitle name={page.title} />
      <DocsLayout page={page} sections={sections}>
        <Content />
      </DocsLayout>
    </>
  );
};

export default DocsPage;
