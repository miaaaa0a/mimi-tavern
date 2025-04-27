import { defineConfig, envField } from 'astro/config';

import vercel from "@astrojs/vercel";
import { viteRequire } from 'vite-require';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [
        viteRequire()
    ]
  },
  env: {
      schema: {
          LASTFM_API_KEY: envField.string({ context: "server", access: "secret"}),
          LASTFM_SECRET: envField.string({ context: "server", access: "secret"}),
          LASTFM_USERNAME: envField.string({ context: "server", access: "secret"}),
      }
  },

  adapter: vercel()
});