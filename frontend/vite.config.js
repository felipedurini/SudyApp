import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://sudyapp-backend.onrender.com", // definir aqui puerto del backend
        changeOrigin: true,
      },
    },
  },
});
