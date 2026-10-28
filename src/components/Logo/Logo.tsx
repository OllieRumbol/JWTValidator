import Box from "@mui/material/Box";

// Sizes from the approved design: "large" is docs/design/logo.png, "medium" is the header.
const sizes = {
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

type LogoProps = {
  size?: keyof typeof sizes;
};

// The three bars are the header, payload and signature of a token, then the site name.
const Logo = ({ size = "medium" }: LogoProps) => {
  const { barWidth, barHeight, radius, barGap, gap, fontSize } = sizes[size];

  return (
    <Box
      component="span"
      sx={{ display: "inline-flex", alignItems: "center", gap: `${gap}px` }}
    >
      <Box
        component="span"
        aria-hidden="true"
        sx={{ display: "flex", gap: `${barGap}px` }}
      >
        {[0, 1, 2].map((bar) => (
          <Box
            key={bar}
            component="span"
            data-testid="logo-bar"
            sx={(theme) => ({
              width: barWidth,
              height: barHeight,
              borderRadius: `${radius}px`,
              backgroundColor: theme.tokens.logoBars[bar],
            })}
          />
        ))}
      </Box>
      <Box
        component="span"
        sx={(theme) => ({
          color: theme.tokens.text,
          fontFamily: theme.tokens.fontSans,
          fontWeight: 700,
          fontSize,
          letterSpacing: "-0.01em",
        })}
      >
        JWT Validator
      </Box>
    </Box>
  );
};

export default Logo;
