/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/**',
      }
    ],
    domains: ['localhost'],
    unoptimized: true  // 暂时禁用图片优化以解决端口问题
  },
}

module.exports = nextConfig 