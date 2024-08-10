/** @type {import('next').NextConfig} */

const isDev = process.env.NODE_ENV === 'development';
const nextConfig = {
    async rewrites() {
        return [
          {
            source: '/api/proxy/:path*',
            destination: isDev
              ? 'https://rushimodel-adbe490bb85c.herokuapp.com/:path*'
              : 'https://rushimodel-adbe490bb85c.herokuapp.com/:path*',
          },
        ];
      },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'utfs.io'
            },
            {
                protocol: 'https',
                hostname: 'img.clerk.com'
            }
        ]
    }
};

export default nextConfig;
