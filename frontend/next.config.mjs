/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  sassOptions: {
    quietDeps: true, // This will silence deprecation warnings
    silenceDeprecations: ["legacy-js-api"],
  },
  async rewrites() {
    return [
      {
        source: '/frontend/api/:path*',
        destination: 'http://localhost:5000/frontend/api/:path*', // Adjust port if your backend runs on different port
      },
      {
        source: '/admin/api/:path*',
        destination: 'http://localhost:5000/admin/api/:path*', // Adjust port if your backend runs on different port
      },
    ];
  },
};

export default nextConfig;
