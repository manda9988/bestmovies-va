/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.tmdb.org",
        port: "",
        pathname: "/t/p/**",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)", // Applique les headers à toutes les ressources
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable", // Mise en cache longue durée
          },
        ],
      },
    ];
  },
};

export default nextConfig;
