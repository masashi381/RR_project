import next from "eslint-config-next";
import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";

export default [
  {
    ignores: ["node_modules/**", ".next/**"],
  },
  next, // ← Next.js の推奨設定をそのまま追加
  {
    plugins: {
      "@typescript-eslint": tsPlugin,
    },
    languageOptions: {
      parser: tsParser,
    },
    rules: {
      quotes: ["error", "double"],
      indent: ["error", 2, { SwitchCase: 1 }],
    },
  },
];
