import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
 
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5015,
    watch: {
      usePolling: true
    },
    allowedHosts: ['admin.flavorforge.io','www.flavorforge.io'],
  },
});