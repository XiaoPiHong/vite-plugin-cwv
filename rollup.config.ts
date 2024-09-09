import { defineConfig } from "rollup";
import typescript from "@rollup/plugin-typescript";

export default defineConfig([
  {
    plugins: [typescript({ tsconfig: "./tsconfig.json" })],
    input: "src/index.ts",
    output: [
      {
        format: "es",
        file: "dist/index.esm.js",
      },
      {
        format: "cjs",
        file: "dist/index.cjs.js",
      },
    ],
  },
]);
