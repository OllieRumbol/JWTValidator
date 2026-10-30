import ArticleSection from "@/components/ArticleSection/ArticleSection";
import MethodReference from "@/components/MethodReference/MethodReference";
import MethodTable from "@/components/MethodTable/MethodTable";
import type { MethodReference as Method } from "@/content/methods/types";

type MethodsSectionProps = {
  methods: Method[];
};

// A docs page's reference: the method table first, then a reference block for each
// method, as docs-page.html shows it.
const MethodsSection = ({ methods }: MethodsSectionProps) => {
  return (
    <ArticleSection id="methods" title="Methods">
      <MethodTable methods={methods} />
      {methods.map((method) => (
        <MethodReference key={method.name} method={method} />
      ))}
    </ArticleSection>
  );
};

export default MethodsSection;
