const {defineConfig} = require("vite");
const reactRefresh = require("@vitejs/plugin-react-refresh")

module.exports = defineConfig({
  build: {
    outDir: "build",
  },
  plugins: [reactRefresh()],
});
