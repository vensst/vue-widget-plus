import {defineConfig} from "vite";
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";
import svgLoader from "vite-svg-loader";
import path from "path";

export default defineConfig({
  resolve: {
    alias: {
      '@styles': path.resolve(__dirname, '../src/styles')
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@styles/vars.scss" as *;`// 所有组件自动引入变量
      }
    }
  },
  plugins: [
    vue(),
    svgLoader({
      svgo: true
    }),
    dts({
      entryRoot: 'src',
      outputDir: 'dist',
      tsconfigPath: path.resolve(__dirname, '../tsconfig.json'),
      cleanVueFileName: true,
      copyDtsFiles: false,
      exclude: [
        '**/__tests__/**',
        '**/*.spec.ts',
        '**/*.test.ts'
      ]
    })
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, "../src/index.ts"),
      name: "VueWidgetPlus",
      formats: ["es", "umd"],
      fileName: (format) => {
        if (format === 'es') return 'index.esm.js'
        if (format === 'umd') return 'index.umd.js'
        return `index.${format}.js`
      }
    },
    rollupOptions: {
      external: ["vue", 'echarts'],
      output: {
        exports: "named",
        globals: {
          vue: "Vue",
          echarts: "echarts"
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && assetInfo.name.endsWith('.css')) {
            return 'index.css' // CSS 输出文件名
          }
          return assetInfo.name!
        }
      },

    }
  }
});
