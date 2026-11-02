import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import type { Theme } from "@mui/material/styles";
import { Link as RouterLink } from "react-router";
import PageTitle from "@/components/PageTitle/PageTitle";
import { primaryLinkStyle } from "@/app/theme";
import { MIGRATION_GUIDE_PATH } from "@/content/docsPages";
import { versions, type Version, type VersionStatus } from "@/content/versions";

// The badge colours of each status, as versions.html shows them.
const badgeStyle: Record<VersionStatus, (theme: Theme) => object> = {
  Latest: (theme) => ({
    color: theme.tokens.background,
    backgroundColor: theme.tokens.primary,
  }),
  Previous: (theme) => ({
    color: theme.tokens.bodyText,
    backgroundColor: theme.tokens.neutralBadge,
  }),
  Unlisted: (theme) => ({
    color: theme.tokens.changedNote.label,
    backgroundColor: theme.tokens.changedNote.background,
  }),
};

// What each status means, for the key at the top of the page.
const statusMeanings: Record<VersionStatus, string> = {
  Latest: "The version to install",
  Previous: "Still on nuget.org",
  Unlisted: "Hidden from search on nuget.org",
};

const StatusBadge = ({ status }: { status: VersionStatus }) => (
  <Box
    component="span"
    sx={(theme) => ({
      display: "inline-block",
      padding: "1px 10px",
      borderRadius: "999px",
      fontSize: "14px",
      fontWeight: 600,
      ...badgeStyle[status](theme),
    })}
  >
    {status}
  </Box>
);

// A change's text, with the parts in backticks shown as code, for example a method name.
// Splitting on backticks puts the code parts at the odd indexes.
const ChangeText = ({ text }: { text: string }) => {
  const parts = text.split("`");

  return parts.map((part, index) =>
    index % 2 === 1 ? <code key={index}>{part}</code> : part,
  );
};

// The small capital heading above each list of changes, as versions.html shows it.
const ChangesHeading = ({
  children,
  color,
}: {
  children: string;
  color: (theme: Theme) => string;
}) => (
  <Box
    component="h3"
    sx={(theme) => ({
      margin: "0 0 8px",
      fontFamily: theme.tokens.fontMono,
      fontSize: "13px",
      fontWeight: 600,
      letterSpacing: "0.04em",
      textTransform: "uppercase",
      color: color(theme),
    })}
  >
    {children}
  </Box>
);

const ChangesList = ({ changes }: { changes: string[] }) => (
  <Box
    component="ul"
    sx={(theme) => ({
      margin: 0,
      paddingLeft: "22px",
      color: theme.tokens.bodyText,
      "& code": { fontFamily: theme.tokens.fontMono, fontSize: "15px" },
    })}
  >
    {changes.map((change) => (
      <li key={change}>
        <ChangeText text={change} />
      </li>
    ))}
  </Box>
);

const VersionEntry = ({ version }: { version: Version }) => {
  const headingId = `version-${version.version.replaceAll(".", "-")}`;
  const isLatest = version.status === "Latest";
  const isUnlisted = version.status === "Unlisted";

  return (
    <Box
      component="article"
      aria-labelledby={headingId}
      sx={{ display: "flex", flexWrap: "wrap", gap: "20px 40px" }}
    >
      <Box sx={{ flex: "1 1 200px", maxWidth: 240 }}>
        <Box
          component="h2"
          id={headingId}
          sx={(theme) => ({
            margin: "0 0 4px",
            fontFamily: theme.tokens.fontMono,
            fontSize: "30px",
            fontWeight: 600,
            letterSpacing: "-0.02em",
            // An unlisted version is muted, as versions.html shows.
            color: isUnlisted ? theme.tokens.mutedText : theme.tokens.text,
          })}
        >
          {version.version}
        </Box>
        <Box
          component="p"
          sx={(theme) => ({
            margin: "0 0 10px",
            color: theme.tokens.mutedText,
          })}
        >
          {version.published}
        </Box>
        <StatusBadge status={version.status} />
      </Box>
      <Box
        sx={(theme) => ({
          flex: "999 1 520px",
          minWidth: 0,
          padding: { xs: "20px", sm: "24px 28px" },
          borderRadius: "14px",
          // The latest version stands out, as versions.html shows.
          border: `1px ${isUnlisted ? "dashed" : "solid"} ${isLatest ? theme.tokens.selected.border : theme.tokens.border}`,
          boxShadow: isLatest ? theme.tokens.cardShadow : "none",
        })}
      >
        <Box component="p" sx={{ margin: "0 0 12px", fontSize: "18px" }}>
          {version.summary}
        </Box>
        {/* Only 2.0.0 has breaking changes. They come first, and link to the
            migration guide (spec section 6.1.6, item 4). */}
        {version.breakingChanges ? (
          <>
            <ChangesHeading color={(theme) => theme.tokens.changedNote.label}>
              Breaking changes
            </ChangesHeading>
            <ChangesList changes={version.breakingChanges} />
            <Box sx={{ marginTop: "18px" }}>
              <ChangesHeading color={(theme) => theme.tokens.mutedText}>
                Other changes
              </ChangesHeading>
            </Box>
            <ChangesList changes={version.changes} />
            <Link
              component={RouterLink}
              to={MIGRATION_GUIDE_PATH}
              sx={(theme) => ({
                ...primaryLinkStyle(theme),
                display: "inline-block",
                marginTop: "22px",
              })}
            >
              Read the migration guide
            </Link>
          </>
        ) : (
          <ChangesList changes={version.changes} />
        )}
      </Box>
    </Box>
  );
};

// The changelog: every released version, newest first, with its date, status and
// changes (spec section 6.1.6), as versions.html shows it.
const VersionsPage = () => {
  return (
    <>
      <PageTitle name="Versions" />
      <Box
        component="section"
        aria-labelledby="versions-title"
        sx={(theme) => ({
          backgroundColor: theme.tokens.surface,
          borderBottom: `1px solid ${theme.tokens.border}`,
        })}
      >
        <Box
          sx={{
            maxWidth: 1160,
            margin: "0 auto",
            padding: { xs: "36px 16px 32px", md: "56px 32px 48px" },
          }}
        >
          <Box
            component="h1"
            id="versions-title"
            sx={{
              margin: "0 0 10px",
              fontSize: { xs: "34px", md: "44px" },
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
            }}
          >
            Versions
          </Box>
          <Box
            component="p"
            sx={(theme) => ({
              margin: "0 0 22px",
              maxWidth: "40em",
              fontSize: { xs: "17px", md: "19px" },
              color: theme.tokens.mutedText,
            })}
          >
            Every released version of the JWTValidator package, newest first.
            Each one is on nuget.org.
          </Box>
          <Box
            component="ul"
            aria-label="What each status means"
            sx={(theme) => ({
              listStyle: "none",
              margin: 0,
              padding: 0,
              display: "flex",
              flexWrap: "wrap",
              gap: "10px 20px",
              fontSize: "14px",
              color: theme.tokens.bodyText,
            })}
          >
            {(Object.keys(statusMeanings) as VersionStatus[]).map((status) => (
              <Box
                component="li"
                key={status}
                sx={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <StatusBadge status={status} />
                {statusMeanings[status]}
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          maxWidth: 1160,
          margin: "0 auto",
          padding: { xs: "32px 16px 56px", md: "48px 32px 80px" },
          fontSize: "17px",
          lineHeight: 1.6,
        }}
      >
        <Box
          component="ol"
          aria-label="Released versions, newest first"
          sx={{
            listStyle: "none",
            margin: 0,
            padding: 0,
            display: "flex",
            flexDirection: "column",
            gap: "28px",
          }}
        >
          {versions.map((version) => (
            <li key={version.version}>
              <VersionEntry version={version} />
            </li>
          ))}
        </Box>
      </Box>
    </>
  );
};

export default VersionsPage;
