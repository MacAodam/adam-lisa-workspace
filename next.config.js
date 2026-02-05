/** @type {import('next').NextConfig} */
const nextConfig = {
  typedRoutes: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'knowit.se',
      },
      {
        protocol: 'https',
        hostname: 'knowit.no',
      },
      {
        protocol: 'https',
        hostname: 'knowit.dk',
      },
      {
        protocol: 'https',
        hostname: 'knowit.fi',
      },
    ],
  },
  typescript: {
    tsconfigPath: './tsconfig.json',
  },
}

module.exports = nextConfig