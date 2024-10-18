/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
        config.resolve.alias.canvas = false;
        return config;
    },
    images: {
        domains: ['elearningplatform-production.up.railway.app'],
    },
};

export default nextConfig;
