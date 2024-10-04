/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/socket.io/:path*",
        destination: "/api/socket/:path*", // Maps the WebSocket request to the API route
      },
    ];
  },
};

export default nextConfig;
