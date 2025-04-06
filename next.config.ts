import type { NextConfig } from "next";
import type { Configuration } from "webpack";

const nextConfig: NextConfig = {
  output: "export",
  assetPrefix: "/algorithm-app/",
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
  images: {
    unoptimized: true,
  },
  basePath: "/algorithm-app",
  trailingSlash: true,
};

export default nextConfig;