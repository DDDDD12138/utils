import json from "@rollup/plugin-json";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import rollupTypescript from "rollup-plugin-typescript2";
import terser from "@rollup/plugin-terser";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const pkg = require("./package.json");

/**
 * @type {import('rollup').RollupOptions}
 */
export default {
  input: "src/index.ts",
  output: [
    // 输出 commonjs 规范的全量包
    {
      file: pkg.main,
      format: "cjs",
    },
    // 输出 es 规范的代码全量包
    {
      file: pkg.module,
      format: "es",
    },
    // 输出 umd 规范的代码全量包
    {
      name: "utils",
      file: pkg.browser,
      format: "umd",
    },
  ],
  plugins: [json(), nodeResolve(), commonjs(), rollupTypescript(), terser()],
};
