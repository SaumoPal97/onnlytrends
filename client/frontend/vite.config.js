import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    // alias: [{ find: "@", replacement: resolve(__dirname, "src") }],
    // eslint-disable-next-line no-undef
    alias: { "@": resolve(__dirname, "./src") },
  },
  plugins: [react()],
  build: {
    //add this property
    sourcemap: true,
  },
});
