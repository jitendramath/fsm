/** @type {import('next').NextConfig} */
const nextConfig = {
  // React Strict Mode development mein bugs pakadne mein help karta hai
  reactStrictMode: true,

  // Security ke liye 'X-Powered-By' header ko hide karna achi practice hai
  poweredByHeader: false,

  // Agar tum heavy ZIP files process karte ho, toh Next.js ko optimize karne ke liye:
  experimental: {
    // Isse build speed aur memory usage behtar rehti hai
    optimizePackageImports: ['lucide-react'],
  },
};

export default nextConfig;
