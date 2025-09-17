/** @type {import('next.js')} */
const nextConfig = {
  images: {
    unoptimized: false, // Enable image optimization
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5000',
        pathname: '/images/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5000',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/images/**',
      },
      // Add your production domain when you deploy
      // {
      //   protocol: 'https',
      //   hostname: 'your-production-domain.com',
      //   pathname: '/images/**',
      // },
    ],
    // Allow local images from public folder
    domains: ['localhost'],
    // Optimize image loading
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // Reduce preload warnings
    minimumCacheTTL: 60,
  },
  sassOptions: {
    quietDeps: true, // This will silence deprecation warnings
    silenceDeprecations: ["legacy-js-api"],
  },
  // Suppress console warnings in production
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error']
    } : false,
  },
  // Optimize for production
  poweredByHeader: false,
  generateEtags: false,
  compress: true,
  // Optimize CSS loading
  experimental: {
    optimizeCss: true,
  },
  // Suppress preload warnings
  onDemandEntries: {
    // period (in ms) where the server will keep pages in the buffer
    maxInactiveAge: 25 * 1000,
    // number of pages that should be kept simultaneously without being disposed
    pagesBufferLength: 2,
  },
};

export default nextConfig;
