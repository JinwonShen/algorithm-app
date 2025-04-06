import type { NextConfig } from "next";

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
  images: {
    unoptimized: true, // ✅ 이미지 최적화 비활성화 (필수)
  },
  basePath: '/algorithm-app', // ✅ 저장소 이름으로 설정 (중요)
  trailingSlash: true, // ✅ GitHub Pages 호환을 위한 설정
};

export default nextConfig;