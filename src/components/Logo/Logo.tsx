import Box from "@mui/material/Box";

// Sizes from the approved design: "xsmall" is the footer's bars in home.html, "small" is
// the phone header in phone.html, "medium" is the header in home.html and "large" is
// docs/design/logo.png.
const sizes = {
  xsmall: {
    barWidth: 7,
    barHeight: 16,
    radius: 2,
    barGap: 3,
    gap: 12,
    fontSize: 16,
  },
  small: {
    barWidth: 8,
    barHeight: 20,
    radius: 2,
    barGap: 3,
    gap: 10,
    fontSize: 18,
  },
  medium: {
    barWidth: 10,
    barHeight: 24,
    radius: 3,
    barGap: 4,
    gap: 12,
    fontSize: 20,
  },
  large: {
    barWidth: 13,
    barHeight: 32,
    radius: 4,
    barGap: 5,
    gap: 14,
    fontSize: 28,
  },
};

type LogoSize = keyof typeof sizes;
type SizeValue = keyof (typeof sizes)[LogoSize];

type LogoProps = {
  // One size, or one size below the md breakpoint and another from it (the header).
  size?: LogoSize | { xs: LogoSize; md: LogoSize };
  showName?: boolean;
};

// The three bars are the header, payload and signature of a token, then the site name.
const Logo = ({ size = "medium", showName = true }: LogoProps) => {
  // A value in pixels, for one size or for each breakpoint.
  const pixels = (value: SizeValue) =>
    typeof size === "string"
      ? `${sizes[size][value]}px`
      : {
          xs: `${sizes[size.xs][value]}px`,
          md: `${sizes[size.md][value]}px`,
        };

  return (
    <Box
      component="span"
      sx={{ display: "inline-flex", alignItems: "center", gap: pixels("gap") }}
    >
      <Box
        component="span"
        aria-hidden="true"
        sx={{ display: "flex", gap: pixels("barGap") }}
      >
        {[0, 1, 2].map((bar) => (
          <Box
            key={bar}
            component="span"
            data-testid="logo-bar"
            sx={(theme) => ({
              width: pixels("barWidth"),
              height: pixels("barHeight"),
              borderRadius: pixels("radius"),
              backgroundColor: theme.tokens.logoBars[bar],
            })}
          />
        ))}
      </Box>
      {showName && (
        <Box
          component="span"
          sx={(theme) => ({
            color: theme.tokens.text,
            fontFamily: theme.tokens.fontSans,
            fontWeight: 700,
            fontSize: pixels("fontSize"),
            letterSpacing: "-0.01em",
          })}
        >
          JWT Validator
        </Box>
      )}
    </Box>
  );
};

export default Logo;
