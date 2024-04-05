await import("./src/env.js");

/** @type {import('next').NextConfig} */
export default {
  reactStrictMode: true,
  webpack(config) {
    config.externalsType = 'commonjs';
    config.externals = config.externals || [];
    config.externals.push({
      '@napi-rs/image': "@napi-rs/image",
    });

    return config;
  },
};

