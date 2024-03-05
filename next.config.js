/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = nextConfig;

const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/:path*', // 匹配所有以 /api/ 开头的请求
        destination: 'https://api-web.lixiang.com/:path*', // 目标服务器的地址
      },
    ];
  },
};
