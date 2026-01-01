import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import pluginChecker from "vite-plugin-checker";

// https://vite.dev/config/
export default defineConfig({
    plugins: [preact(), pluginChecker({ typescript: true })],
});
