/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['mdbcdn.b-cdn.net'],
  },
  distDir: 'build',
  // useFileSystemPublicRoutes: false,
}

module.exports = nextConfig
