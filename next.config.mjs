/** @type {import('next').NextConfig} */
const nextConfig = {
  rewrites() {
    return {
      beforeFiles: [
        {
          source: '/',
          destination: '/standalone.html',
        },
      ],
    };
  },
};

export default nextConfig;
