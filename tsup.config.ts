// bundler
import { defineConfig } from "tsup";

export default defineConfig({
    entry: ["src/server.ts"],
    format: "esm",
    treeshake: true,
    minify: true,
    clean: true,
})