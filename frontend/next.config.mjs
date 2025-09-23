/** @type {import('next.js')} */
const nextConfig = {
  images: {
    unoptimized: process.env.NODE_ENV === 'development', // Disable optimization in development
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
      {
        protocol: 'https',
        hostname: 'thebotsworld.onrender.com',
        pathname: '/images/**',
      },
      {
        protocol: 'https',
        hostname: 'thebotsworld.onrender.com',
        pathname: '/public/**',
      },
      {
        protocol: 'https',
        hostname: 'thebotsworld.onrender.com',
        pathname: '/**',
      },
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
    optimizePackageImports: ['@fortawesome/react-fontawesome', 'swiper', 'lucide-react'],
  },
  // Enable static optimization
  trailingSlash: false,
  // Optimize bundle
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      // Optimize bundle size
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
          common: {
            name: 'common',
            minChunks: 2,
            chunks: 'all',
            enforce: true,
          },
        },
      };
    }
    return config;
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
