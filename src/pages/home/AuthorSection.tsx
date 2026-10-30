import Box from "@mui/material/Box";
import ExternalLink from "@/components/ExternalLink/ExternalLink";
import { links } from "@/content/links";

// The author card and the personal section (spec section 6.1.7, item 5). The text is the
// current Back Story, unchanged. T27 drafts the new text from it.
const AuthorSection = () => {
  return (
    <Box component="section" aria-labelledby="why-title">
      <Box
        sx={{
          maxWidth: 1160,
          margin: "0 auto",
          padding: { xs: "56px 16px", md: "80px 32px" },
          display: "flex",
          flexWrap: "wrap",
          alignItems: "flex-start",
          gap: "40px 64px",
        }}
      >
        <Box
          sx={(theme) => ({
            flex: "0 1 260px",
            minWidth: 0,
            boxSizing: "border-box",
            padding: "28px",
            border: `1px solid ${theme.tokens.border}`,
            borderRadius: "16px",
            backgroundColor: theme.tokens.surface,
          })}
        >
          {/* The logo's bars in a circle, in place of a photo. */}
          <Box
            aria-hidden="true"
            sx={(theme) => ({
              width: "64px",
              height: "64px",
              marginBottom: "16px",
              display: "grid",
              placeItems: "center",
              borderRadius: "50%",
              backgroundColor: theme.tokens.background,
              border: `1px solid ${theme.tokens.border}`,
            })}
          >
            <Box component="span" sx={{ display: "flex", gap: "3px" }}>
              {[0, 1, 2].map((bar) => (
                <Box
                  key={bar}
                  component="span"
                  sx={(theme) => ({
                    width: "8px",
                    height: "24px",
                    borderRadius: "2px",
                    backgroundColor: theme.tokens.logoBars[bar],
                  })}
                />
              ))}
            </Box>
          </Box>
          <Box
            component="p"
            sx={{ margin: 0, fontSize: "19px", fontWeight: 700 }}
          >
            Ollie Rumbol
          </Box>
          <Box
            component="p"
            sx={(theme) => ({
              margin: "0 0 14px",
              color: theme.tokens.mutedText,
            })}
          >
            Author and maintainer
          </Box>
          <ExternalLink href={links.authorProfile} sx={{ fontWeight: 600 }}>
            GitHub profile
          </ExternalLink>
        </Box>
        <Box
          sx={(theme) => ({
            flex: "1 1 520px",
            minWidth: 0,
            maxWidth: 680,
            color: theme.tokens.bodyText,
            "& > p, & > ul": { margin: "0 0 14px" },
            "& > :last-child": { marginBottom: 0 },
          })}
        >
          <Box
            component="h2"
            id="why-title"
            sx={(theme) => ({
              margin: "0 0 16px",
              fontSize: { xs: "28px", md: "30px" },
              lineHeight: 1.2,
              letterSpacing: "-0.02em",
              color: theme.tokens.text,
            })}
          >
            Why I built this
          </Box>
          <p>
            The biggest use case of this library is to validate ID tokens after
            a successful OAuth login, however, any JWT can be validated. Over
            the years I have seen many developers trip up on the final hurdle of
            an OAuth login integration and with the complexities of the
            following objects in C#/.NET
          </p>
          <ul>
            <li>TokenValidationParameters</li>
            <li>JwtSecurityTokenHandler</li>
            <li>ClaimsPrincipal</li>
          </ul>
          <p>
            My library abstracts away from these complexities and allows a
            simple flow to validate any part of a JWT as well as extracting its
            claims. It was important for the JWT validator library to be able to
            handle any JWT which is why it allows both symmetric key encryption
            and asymmetric key encryption.
          </p>
          <p>
            Developers and code quality is at the heart of this project. Code is
            continuously reviewed to make sure it meets the styling standards.
            Try get versions of key methods exist to meet the programming styles
            of different developers. This library is fully unit tested with new
            tests being added as new features are developed
          </p>
        </Box>
      </Box>
    </Box>
  );
};

export default AuthorSection;
