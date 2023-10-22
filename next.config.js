/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'tsgroup.s3.amazonaws.com',
            },
        ],
        formats: ["image/webp"]
    }
}

module.exports = nextConfig
