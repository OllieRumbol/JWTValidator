import { useId, useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import HighlightedCode from "@/components/CodeBlock/HighlightedCode";
import CopyButton from "@/components/CopyButton/CopyButton";

type Example = { id: string; title: string; code: string; caption?: string };

type ExampleTabsProps = {
  label: string; // Accessible name of the tab list, for example "Signing key source"
  examples: Example[]; // The first example is selected when the page opens
};

// Tabs that switch between code examples, as home.html shows them (spec section 6.1.7,
// item 2). MUI's Tabs follows the ARIA tabs pattern. The arrow keys move between tabs,
// and the selection follows, as spec section 6.2.2 requires. Copy copies the example
// that shows.
const ExampleTabs = ({ label, examples }: ExampleTabsProps) => {
  const [selectedId, setSelectedId] = useState(examples[0].id);
  const idPrefix = useId();
  const panelId = `${idPrefix}-panel`;
  const tabId = (example: Example) => `${idPrefix}-tab-${example.id}`;
  const selected =
    examples.find((example) => example.id === selectedId) ?? examples[0];

  return (
    <Box
      component="figure"
      // Without this, the figure takes its name from the tabs and the Copy result.
      aria-label={label}
      sx={(theme) => ({
        margin: 0,
        // Lets the box shrink in a flex or grid parent, so wide code scrolls inside it.
        minWidth: 0,
        border: `1px solid ${theme.tokens.border}`,
        borderRadius: "12px",
        overflow: "hidden",
      })}
    >
      <Box
        component="figcaption"
        sx={(theme) => ({
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "flex-end",
          gap: "8px",
          padding: "6px 6px 0 10px",
          borderBottom: `1px solid ${theme.tokens.border}`,
          backgroundColor: theme.tokens.surface,
        })}
      >
        <Tabs
          value={selected.id}
          onChange={(_event, id: string) => setSelectedId(id)}
          selectionFollowsFocus
          aria-label={label}
          slotProps={{ indicator: { sx: { display: "none" } } }}
          sx={{ minHeight: "auto", "& .MuiTabs-flexContainer": { gap: "4px" } }}
        >
          {examples.map((example) => (
            <Tab
              key={example.id}
              value={example.id}
              id={tabId(example)}
              aria-controls={panelId}
              label={example.title}
              disableRipple
              sx={(theme) => ({
                minHeight: "auto",
                minWidth: 0,
                padding: "10px 16px",
                marginBottom: "-1px",
                borderRadius: "8px 8px 0 0",
                border: "1px solid transparent",
                fontFamily: theme.tokens.fontSans,
                fontSize: "15px",
                fontWeight: 500,
                lineHeight: 1.5,
                textTransform: "none",
                color: theme.tokens.mutedText,
                "&:hover": {
                  color: theme.tokens.text,
                  backgroundColor: theme.tokens.hover.tint,
                },
                "&.Mui-selected": {
                  fontWeight: 600,
                  color: theme.tokens.selected.text,
                  backgroundColor: theme.tokens.background,
                  borderColor: theme.tokens.border,
                  borderBottom: `2px solid ${theme.tokens.primary}`,
                },
              })}
            />
          ))}
        </Tabs>
        <Box sx={{ marginBottom: "6px" }}>
          {/* A new button for each example, so "Copied" never shows for one that
              was not copied. */}
          <CopyButton key={selected.id} text={selected.code} />
        </Box>
      </Box>
      {selected.caption && (
        <Box
          component="p"
          sx={(theme) => ({
            margin: 0,
            padding: "10px 20px 0",
            fontFamily: theme.tokens.fontMono,
            fontSize: "14px",
            color: theme.tokens.mutedText,
            backgroundColor: theme.tokens.code.background,
          })}
        >
          {selected.caption}
        </Box>
      )}
      <HighlightedCode
        code={selected.code}
        preProps={{
          id: panelId,
          role: "tabpanel",
          "aria-labelledby": tabId(selected),
        }}
      />
    </Box>
  );
};

export default ExampleTabs;
