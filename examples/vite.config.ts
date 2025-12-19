import {defineConfig} from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import svgLoader from "vite-svg-loader";

export default defineConfig({
  root: path.resolve(__dirname),
  plugins: [vue(), svgLoader({
    svgo: true
  })],
  resolve: {
    alias: {
      "@": path.resolve(__dirname),
      // "@vensst/vue-widget-plus": path.resolve(__dirname,'../node_modules/@vensst/vue-widget-plus/'),
    }
  },
  server: {
    port: 3000,
    open: true
  }
});
