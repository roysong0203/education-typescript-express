import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 3000,
    allowedHosts: [".edu.techceo.kr"],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          "react-chartjs-2": ["react-chartjs-2"],
        },
      },
    },
  },
});
