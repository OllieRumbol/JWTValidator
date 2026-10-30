import type { ReactNode } from "react";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import type { SxProps, Theme } from "@mui/material/styles";
import { visuallyHidden } from "@/app/theme";

type ExternalLinkProps = {
  href: string;
  children: ReactNode;
  sx?: SxProps<Theme>;
  // For example to close the menu, so it is closed when Back returns to this page.
  onClick?: () => void;
};

// A link to another site. It opens in the same tab (spec section 6.1.2, item 7), shows
// an arrow, and tells screen readers that it leaves this site (plan section 3.6).
const ExternalLink = ({ href, children, sx, onClick }: ExternalLinkProps) => {
  return (
    <Link href={href} sx={sx} onClick={onClick}>
      {children}
      <Box
        component="svg"
        aria-hidden="true"
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        sx={{ marginLeft: "4px", verticalAlign: "-1px" }}
      >
        <path d="M7 17 17 7M8 7h9v9" />
      </Box>
      <Box component="span" sx={visuallyHidden}>
        , leaves this site
      </Box>
    </Link>
  );
};

export default ExternalLink;
