import AxeBuilder from "@axe-core/playwright";
import type { Page } from "@playwright/test";

// The axe check for test 11. Axe leaves the WCAG 2.2 AA target size rule off by default,
// so it is turned on here (spec section 6.6.1, item 1).
export function accessibilityCheck(page: Page): AxeBuilder {
  return new AxeBuilder({ page }).options({
    rules: { "target-size": { enabled: true } },
  });
}
