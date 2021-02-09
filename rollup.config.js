import { terser } from "rollup-plugin-terser";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import vue from "rollup-plugin-vue";

export default {
  input: "src/index.js",
  output: {
    format: "es",
    file: "extensions/modules/index/index.js",
    terser: {
      output: {
        beautify: true, 
        indent_level: 2
      }
    }
  },
  plugins: [
    terser(), 
    resolve(), 
    commonjs(), 
    vue(),
  ],
};

