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
        // Applique un cache long uniquement aux images
        source: "/_next/image(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable", // Cache longue durée pour les images
          },
        ],
      },
      {
        // Applique un cache court pour les autres ressources (HTML, JS)
        source: "/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=0, must-revalidate", // Désactive le cache pour les ressources dynamiques
          },
        ],
      },
    ];
  },
};

export default nextConfig;
