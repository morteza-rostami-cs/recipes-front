import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  preview: {
    host: true, // allows network access
    port: 4173, // match your docker port
    strictPort: true,
    allowedHosts: ["recipes.mortteza.site", "localhost"], // add your host here
  },
});
