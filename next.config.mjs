/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    missingSuspenseWithCSRBailout: false,
    appDir: true,
    serverComponentsExternalPackages: ["mongoose"],
  },
  images: {
    domains: ['lh3.googleusercontent.com', "firebasestorage.googleapis.com", "placehold.co"],
  },
  webpack(config) {
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
    }
    return config
  }
}

export default nextConfig;