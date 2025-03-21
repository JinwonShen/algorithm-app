import { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "react-codemirror": require.resolve("@uiw/react-codemirror"),
    };
    return config;
  },
  experimental: {
    esmExternals: true, // ESM 지원 활성화
  },
};

export default nextConfig;