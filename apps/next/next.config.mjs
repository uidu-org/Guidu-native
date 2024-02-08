//*docs: https://www.npmjs.com/package/@next/mdx
/** @type {import('next').NextConfig} */
import MDX from '@next/mdx'

const withMDX = MDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
})

const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
        pathname: '*',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        pathname: '*',
      },
    ],
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.resolve.alias['next-mdx-import-source-file'] = [
      'private-next-root-dir/src/mdx-components',
      'private-next-root-dir/mdx-components',
      '@mdx-js/react',
    ]
    return config
  },
}

export default withMDX(nextConfig)
