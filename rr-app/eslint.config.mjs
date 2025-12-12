import nextPlugin from "eslint-plugin-next";
import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";

export default [
  {
    ignores: ["node_modules/**", ".next/**"],
  },
  {
    plugins: {
      "@typescript-eslint": tsPlugin,
      next: nextPlugin,
    },
    languageOptions: {
      parser: tsParser,
    },
    rules: {
      // 必要なら追加
      quotes: ["error", "double"],
      indent: ["error", 2, { SwitchCase: 1 }],
    },
  },
];
