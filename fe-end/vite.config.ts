/*
 * @Author: your name
 * @Date: 2022-04-01 14:07:24
 * @LastEditTime: 2022-04-08 21:44:25
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /vue-nestjs-ci-cd/fe-end/vite.config.ts
 */
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      components: path.resolve(__dirname, "src/components"),
      // styles: path.resolve(__dirname, "src/styles"),
      // plugins: path.resolve(__dirname, "src/plugins"),
      // views: path.resolve(__dirname, "src/views"),
      // layouts: path.resolve(__dirname, "src/layouts"),
      // utils: path.resolve(__dirname, "src/utils"),
      // apis: path.resolve(__dirname, "src/apis"),
      // dirs: path.resolve(__dirname, "src/directives"),
    },
  },
  plugins: [vue()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "/api"),
      },
    },
  },
});
