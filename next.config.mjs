/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
        config.resolve.alias.canvas = false;
        return config;
    },
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: "**"
            }
        ]
    },
};

export default nextConfig;
