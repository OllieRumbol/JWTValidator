import Box from "@mui/material/Box";
import ChangedNote from "@/components/ChangedNote/ChangedNote";
import HighlightedCode from "@/components/CodeBlock/HighlightedCode";
import SectionHeading from "@/components/SectionHeading/SectionHeading";
import {
  methodSectionId,
  type MethodReference as Method,
} from "@/content/methods/types";

type MethodReferenceProps = {
  method: Method;
};

// One method's reference: summary, signatures, parameters, return value and failures
// (spec section 6.1.3, item 3), as docs-page.html shows it.
const MethodReference = ({ method }: MethodReferenceProps) => {
  const id = methodSectionId(method.name);

  return (
    <Box
      component="section"
      aria-labelledby={id}
      sx={(theme) => ({
        // Lets the box shrink in a flex or grid parent, so a signature scrolls inside it.
        minWidth: 0,
        padding: "20px 22px",
        border: `1px solid ${theme.tokens.border}`,
        borderRadius: "12px",
        // The method name, in code type, as docs-page.html shows it.
        [`& #${id}`]: {
          fontFamily: theme.tokens.fontMono,
          fontSize: "18px",
          color: theme.tokens.link,
          overflowWrap: "anywhere",
        },
      })}
    >
      <SectionHeading id={id} level={3}>
        {method.name}
      </SectionHeading>
      <Box component="p" sx={{ margin: "6px 0 14px" }}>
        {method.summary}
      </Box>
      <Box sx={{ display: "grid", gap: "8px", marginBottom: "16px" }}>
        {method.signatures.map((signature) => (
          <HighlightedCode
            key={signature}
            code={signature}
            variant="signature"
          />
        ))}
      </Box>
      {method.changedIn2 && (
        <Box sx={{ marginBottom: "16px" }}>
          <ChangedNote>{method.changedIn2}</ChangedNote>
        </Box>
      )}
      <Box
        component="dl"
        sx={(theme) => ({
          margin: 0,
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "max-content 1fr" },
          gap: { xs: "2px 24px", sm: "8px 24px" },
          fontSize: "16px",
          "& dt": { color: theme.tokens.mutedText, fontWeight: 600 },
          "& dd": { margin: { xs: "0 0 8px", sm: 0 } },
          "& code": { fontFamily: theme.tokens.fontMono },
        })}
      >
        <dt>Parameters</dt>
        <dd>
          {method.parameters.length === 0
            ? "None"
            : method.parameters.map((parameter) => (
                <Box
                  component="span"
                  key={parameter.name}
                  sx={{ display: "block" }}
                >
                  <code>{parameter.name}</code>: {parameter.description}
                </Box>
              ))}
        </dd>
        {/* "Returns", not "Summary" (spec section 4.1, item 6). */}
        <dt>Returns</dt>
        <dd>{method.returns}</dd>
        <dt>Fails when</dt>
        <dd>{method.failsWhen}</dd>
      </Box>
    </Box>
  );
};

export default MethodReference;
