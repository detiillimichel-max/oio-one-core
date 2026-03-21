/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Isso aqui evita erros de link quebrado na URL do GitHub
  trailingSlash: true, 
}

module.exports = nextConfig
