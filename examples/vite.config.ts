import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import cwv from "vite-plugin-cwv/plugin";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), cwv()],
});
