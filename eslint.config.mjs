import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";

// Exclude build/output directories globally
export default defineConfig([
  {
    ignores: [
      "dist/**/*",
      "public/**/*",
      "coverage/**/*",
      "build/**/*"
    ]
  },
  { files: ["src/0/3/6/9/1/2/4/8/7/5/1/**/*.{js,mjs,cjs,ts,mts,cts}"], plugins: { js }, extends: ["js/recommended"] },
  { files: ["src/0/3/6/9/1/2/4/8/7/5/1/**/*.{js,mjs,cjs,ts,mts,cts}"], languageOptions: { globals: globals.browser } },
  tseslint.configs.recommended,
  // Strict lint rules for canonical A432 core path
  {
    files: ["src/0/3/6/9/1/2/4/8/7/5/1/**/*.ts"],
    rules: {
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-unused-vars": ["error", { "vars": "all", "args": "after-used" }],
    },
  },
  // Relaxed rules for legacy codebase (mute 'any' and unused vars to warnings)
  {
    files: ["src/**/*.ts"],
    ignores: ["src/0/3/6/9/1/2/4/8/7/5/1/**/*.ts"],
    rules: {
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": "warn",
    },
  },
  // Ignore all other directories
  {
    ignores: ["!src/0/3/6/9/1/2/4/8/7/5/1/**/*"]
  }
]);
