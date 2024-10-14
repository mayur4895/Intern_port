/** @type {import('next').NextConfig} */

const isDev = process.env.NODE_ENV === 'development';
const nextConfig = {
    reactStrictMode: true,
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
