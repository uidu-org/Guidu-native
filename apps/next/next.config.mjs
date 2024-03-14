import { withContentlayer } from 'next-contentlayer'
// import redirects from './next-redirect.js'

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@nextui-org/react', '@nextui-org/theme'],
  swcMinify: true,
  reactStrictMode: true, // Recommended for the `pages` directory, default in `app`.
  // redirects: redirects,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    // ignoreBuildErrors: process.env.IS_VERCEL_ENV === "true",
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [],
  },
}
export default withContentlayer(nextConfig)
