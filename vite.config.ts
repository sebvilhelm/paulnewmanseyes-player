import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';

export default defineConfig({
  build: {
    outDir: "build",
  },
  plugins: [reactRefresh(), vanillaExtractPlugin()],
});
