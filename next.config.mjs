/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,

  images: {
    domains: ['192.168.0.3'], // Dodaj IP adresu Strapi servera
  },
  env: {
    STRAPI_API_URL: 'http://192.168.0.3:1337', // URL Strapi backend servera
  },
};

export default nextConfig;
