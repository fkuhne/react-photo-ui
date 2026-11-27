import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// The gallery page, `npm run dev`: every token, icon and control, dark and light, from the source
// in `src/`, not the built `dist/`.
export default defineConfig({
  root: "gallery",
  plugins: [react()],
  server: { port: 5180, strictPort: true },
});
