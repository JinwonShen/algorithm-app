import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // ✅ 정적 사이트 생성 활성화
  basePath: '/algorithm-app', // ✅ GitHub 저장소 이름
  assetPrefix: '/algorithm-app/', // ✅ 정적 리소스 경로 설정
  trailingSlash: true, // ✅ GitHub Pages 경로 호환
  images: {
    unoptimized: true, // ✅ 이미지 최적화 비활성화 (필수)
  },
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