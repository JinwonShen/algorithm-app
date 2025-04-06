import type { NextConfig } from 'next';
import type { Configuration } from 'webpack';

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/algorithm-app',
  assetPrefix: '/algorithm-app/', // ✅ 이것 중요!!
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  webpack: (config: Configuration) => {
    config.resolve = {
      ...config.resolve,
      alias: {
        ...config.resolve?.alias,
        "react-codemirror": require.resolve("@uiw/react-codemirror"),
      },
    };
    return config;
  },
  experimental: {
    esmExternals: true,
  },
};

export default nextConfig;