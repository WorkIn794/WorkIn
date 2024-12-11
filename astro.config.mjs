import { defineConfig, envField } from "astro/config";
import icon from "astro-icon";
import svelte from "@astrojs/svelte";
import tailwind from "@astrojs/tailwind";
import netlify from "@astrojs/netlify";

// https://astro.build/config
export default defineConfig({
  integrations: [svelte(), tailwind(), icon()],
  output: "server",
  adapter: netlify()
});