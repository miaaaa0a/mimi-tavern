import { defineConfig, envField } from 'astro/config';

import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
  env: {
      schema: {
          LASTFM_API_KEY: envField.string({ context: "server", access: "secret"}),
          LASTFM_SECRET: envField.string({ context: "server", access: "secret"}),
          LASTFM_USERNAME: envField.string({ context: "server", access: "secret"}),
      }
  },
  output: "server",
  adapter: vercel()
});