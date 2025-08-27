import { defineConfig, envField } from "astro/config";
import icon from "astro-icon";
import svelte from "@astrojs/svelte";
import tailwind from "@astrojs/tailwind";
import netlify from "@astrojs/netlify";

// https://astro.build/config
export default defineConfig({
  integrations: [svelte(), tailwind(), icon()],
  output: "server",
  adapter: netlify(),
  env: {
    schema: {
      NLT_DEV_FUNCTION: envField.string({
        context: "client",
        access: "public",
        optional: false
      }),
      NTL_FUNCTION: envField.string({
        context: "client",
        access: "public",
        optional: false
      }),
      MONGODB_API_KEY: envField.string({
        context: "server",
        access: "public",
        optional: false
      }),
      MONGODB_DASHBOARD_ID: envField.string({
        context: "server",
        access: "public",
        optional: false
      }),
      MONGODB_DATABASE: envField.string({
        context: "client",
        access: "public",
        optional: true,
        default: "workin"
      }),
      RESEND_API_KEY: envField.string({
        context: "server",
        access: "public",
        optional: false
      }),
      BETTER_AUTH_SECRET: envField.string({
        context: "client",
        access: "public",
        optional: false
      }),
      BETTER_AUTH_URL: envField.string({
        context: "client",
        access: "public",
        optional: true,
        default: "http://localhost:4321"
      })
    }
  },
  vite: {
    optimizeDeps: {
      esbuildOptions: {
        target: "esnext"
      }
    },
    build: {
      target: "esnext"
    }
  }
});