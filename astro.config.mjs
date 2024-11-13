import { defineConfig, envField } from "astro/config";
import icon from "astro-icon";
import svelte from "@astrojs/svelte";
import tailwind from "@astrojs/tailwind";
import netlify from "@astrojs/netlify";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), icon(), svelte()],
  output: "server",
  adapter: netlify()
  // experimental: {
  //   env: {
  //     schema: {
  //       API_KEY: envField.string({context: "client", access: "public", default: "TEST"})
  //     }
  //   }
  // }
});