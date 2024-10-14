/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "elearningplatform-production.up.railway.app",
                pathname: "/api/v1/categories/image/**",
            },
            {
                protocol: "https",
                hostname: "elearningplatform-production.up.railway.app",
                pathname: "/api/v1/users/image/**",
            },
        ],
    },
};

export default nextConfig;
