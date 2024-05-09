/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  /*images:{
    domains:["raw.githubusercontent.com"]
  }*/
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
}

module.exports = nextConfig
