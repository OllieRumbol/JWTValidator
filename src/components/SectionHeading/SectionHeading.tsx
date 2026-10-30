import { useId, useState, type MouseEvent, type ReactNode } from "react";
import Box from "@mui/material/Box";
import {
  Link as RouterLink,
  useHref,
  useNavigate,
  useParams,
} from "react-router";
import { visuallyHidden } from "@/app/theme";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";

type SectionHeadingProps = {
  id: string; // Also the last part of the section address
  level: 2 | 3;
  children: ReactNode;
};

const headingSizes = { 2: "26px", 3: "20px" };
const linkSizes = { 2: "20px", 3: "16px" };

// A heading of a docs page, with a link to its section address that shows on hover and
// on keyboard focus (spec section 6.1.1, item 6, and states.html). Selecting the link
// copies the full address and shows "Link copied". When the clipboard rejects the
// write, the link opens the address instead, so the reader can copy it from the address
// bar (plan section 3.3).
//
// The link sits next to the heading, not inside it, so the heading's accessible name is
// only its text. Use it on a docs page only: the address needs the page's slug.
const SectionHeading = ({ id, level, children }: SectionHeadingProps) => {
  const { slug } = useParams();
  const path = `/docs/${slug}/${id}`;
  const href = useHref(path);
  const navigate = useNavigate();
  const { status, copy } = useCopyToClipboard();
  const [announcement, setAnnouncement] = useState("");
  const labelId = useId();

  async function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    // A modifier click, such as Ctrl-click for a new tab, is left to the browser.
    const isModifierClick =
      event.button !== 0 ||
      event.ctrlKey ||
      event.metaKey ||
      event.shiftKey ||
      event.altKey;
    if (isModifierClick) {
      return;
    }

    event.preventDefault();
    const address = new URL(href, window.location.href).href;
    // Emptied first, so a second "Link copied" is a change, and screen readers announce it.
    setAnnouncement("");
    const copied = await copy(address);
    setAnnouncement(copied ? "Link copied" : "");
    if (!copied) {
      // A link within the page replaces the history entry (plan section 3.3).
      await navigate(path, { replace: true });
    }
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "baseline",
        columnGap: "8px",
        // The link shows on hover of the heading, and on keyboard focus. A touch screen
        // has no hover, so there it always shows.
        "& .section-link": { opacity: 0 },
        "&:hover .section-link, & .section-link:focus-visible": { opacity: 1 },
        "@media (hover: none)": { "& .section-link": { opacity: 1 } },
      }}
    >
      <Box
        component={`h${level}`}
        id={id}
        sx={{
          margin: 0,
          fontSize: headingSizes[level],
          letterSpacing: level === 2 ? "-0.01em" : undefined,
        }}
      >
        {children}
      </Box>
      <Box
        component={RouterLink}
        to={path}
        replace
        onClick={(event) => void handleClick(event)}
        className="section-link"
        aria-labelledby={`${labelId} ${id}`}
        sx={(theme) => ({
          fontSize: linkSizes[level],
          fontWeight: 700,
          color: theme.tokens.link,
          textDecoration: "none",
        })}
      >
        <Box component="span" id={labelId} sx={visuallyHidden}>
          Link to this section:
        </Box>
        <span aria-hidden="true">#</span>
      </Box>
      {status === "copied" && (
        <Box
          component="span"
          aria-hidden="true"
          sx={(theme) => ({
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            alignSelf: "center",
            padding: "6px 10px",
            borderRadius: "6px",
            fontSize: "14px",
            fontWeight: 600,
            color: theme.tokens.success.text,
            backgroundColor: theme.tokens.success.background,
          })}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
          Link copied
        </Box>
      )}
      {/* The pill is hidden from screen readers, because this announces it. */}
      <Box component="span" role="status" sx={visuallyHidden}>
        {announcement}
      </Box>
    </Box>
  );
};

export default SectionHeading;
