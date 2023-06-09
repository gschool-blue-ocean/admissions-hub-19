import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  root: "src",
  server: {
    proxy: {
      "/api": process.env.API_URL,
    },
    port: process.env.PORT,
  },
  test: {
    environment: "jsdom",
    watch: false,
  },
});
