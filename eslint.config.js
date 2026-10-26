import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals";

export default defineConfig(
  { ignores: ["dist", "examples"] },
  js.configs.recommended,
  tseslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        // Type-aware rules need the tsconfig that covers each file.
        project: ["./tsconfig.json", "./tsconfig.node.json"],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    files: ["src/**/*.{ts,tsx}"],
    // Includes the React Compiler rules, so a component the compiler skips is reported.
    extends: [reactHooks.configs.flat.recommended],
    languageOptions: { globals: globals.browser },
    rules: {
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "react-syntax-highlighter",
              message:
                "Use src/components/shared/SyntaxHighlighter. The full build adds every grammar to the bundle.",
            },
          ],
        },
      ],
    },
  },
  {
    files: ["vite.config.ts", "scripts/**/*.ts", "e2e/**/*.ts"],
    languageOptions: { globals: globals.node },
  },
  {
    // JavaScript files, such as this one, are in no tsconfig.
    files: ["**/*.{js,mjs,cjs}"],
    extends: [tseslint.configs.disableTypeChecked],
    languageOptions: { globals: globals.node },
  },
);
