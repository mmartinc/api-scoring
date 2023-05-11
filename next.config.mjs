/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import('./src/env.mjs');

/** @type {import("next").NextConfig} */
const config = {
  output: 'standalone',
  reactStrictMode: false,

  /**
   * If you have `experimental: { appDir: true }` set, then you must comment the below `i18n` config
   * out.
   *
   * @see https://github.com/vercel/next.js/issues/41980
   */
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
  rewrites: async () => {
    const baseURL = `${process.env.SERVER_PROTOCOL}://${process.env.SERVER_IP_ADDRESS}:${process.env.SERVER_PORT}`;

    return [
      {
        source: '/api/:slug*',
        destination: `${baseURL}/:slug*`,
      },
    ];
  },
};
export default config;
