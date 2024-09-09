import { defineConfig } from "rollup";
import typescript from "@rollup/plugin-typescript";

export default defineConfig([
  {
    plugins: [typescript({ tsconfig: "./tsconfig.json" })],
    input: ["src/cwv.ts", "src/check.ts"],
    output: [
      {
        format: "es",
        entryFileNames: "[name].mjs.js",
        dir: "dist",
      },
      {
        format: "cjs",
        entryFileNames: "[name].cjs.js",
        dir: "dist",
      },
    ],
    external: ["fs", "path"], // 将 fs 和 path 标记为外部模块
  },
]);
