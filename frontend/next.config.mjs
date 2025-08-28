/** @type {import('next.js')} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  sassOptions: {
    quietDeps: true, // This will silence deprecation warnings
    silenceDeprecations: ["legacy-js-api"],
  },
};

export default nextConfig;
