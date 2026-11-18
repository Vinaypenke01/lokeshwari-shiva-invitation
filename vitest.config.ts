import { defineConfig } from "vitest/config";
import { fileURLToPath, URL } from "node:url";

const srcDir = fileURLToPath(new URL("./src", import.meta.url));
const setupFile = fileURLToPath(new URL("./src/test/setup.ts", import.meta.url));

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: [setupFile],
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
  },
  resolve: {
    alias: { "@": srcDir },
  },
});
