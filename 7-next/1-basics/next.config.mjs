/** @type {import('next').NextConfig} */
const nextConfig = {
  // Dış kaynaklardan url ile ekrana bastığımız resimlerin nextjs optimizasyonu çalışsın istiyorsak resimleri aldığımız domain adreslerini bu alanda next.js'e tanıtmalıyız
  images: {
    qualities: [10, 99],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
    ],
  },
};

export default nextConfig;
