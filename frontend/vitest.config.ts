import { resolve } from "path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom", // changed to use DOM file reading capabilities
    coverage: {
      provider: "istanbul",
      reportsDirectory: "./coverage",
    },
  },
  resolve: {
    alias: [{ find: "@", replacement: resolve(__dirname, "./src") }],
  },
});
