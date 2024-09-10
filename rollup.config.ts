import { defineConfig } from "rollup";
import typescript from "@rollup/plugin-typescript";
// import resolve from "@rollup/plugin-node-resolve";
// import commonjs from "@rollup/plugin-commonjs";

const checkConfig = defineConfig({
  input: "src/check.ts",
  output: [
    {
      file: "dist/check.cjs",
      format: "cjs",
    },
    {
      file: "dist/check.mjs",
      format: "es",
    },
  ],
  // plugins: [resolve(), commonjs(), typescript({ tsconfig: "./tsconfig.json" })],
  plugins: [typescript({ tsconfig: "./tsconfig.json" })],
});

const pluginConfig = defineConfig({
  input: "src/plugin.ts",
  output: [
    {
      file: "dist/plugin.cjs",
      format: "cjs",
    },
    {
      file: "dist/plugin.mjs",
      format: "es",
    },
  ],
  plugins: [typescript({ tsconfig: "./tsconfig.json" })],
  external: ["fs", "path"],
});

export default [checkConfig, pluginConfig];
