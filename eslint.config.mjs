import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Add compatible configs
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // Add a custom override to disable a rule
  {
    files: ["**/*.ts", "**/*.tsx"], // Or just ["**/*.tsx"] if you prefer
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
];

export default eslintConfig;
