import { resolve } from "path";
import { defineConfig } from "vite";

import Vue from "@vitejs/plugin-vue";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "ClayVue"
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        exports: "named",
        globals: { "vue": "Vue" },
        sourcemap: true
      }
    },
    sourcemap: true
  },
  plugins: [Vue()],
  resolve: {
    alias: { "@": resolve(__dirname, "src") }
  }
});

