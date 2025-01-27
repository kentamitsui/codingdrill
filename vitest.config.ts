import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "path";

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./vitest-setup.ts",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname), // プロジェクトのルートディレクトリにマッピング
    },
  },
  plugins: [tsconfigPaths()], // tsconfig.json の `paths` を自動適用
});
