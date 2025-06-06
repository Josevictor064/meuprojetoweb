import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * Ativa o Strict Mode do React, que ajuda a identificar potenciais problemas
   * na aplicação, executando algumas funções duas vezes em desenvolvimento.
   */
  reactStrictMode: true,

  /**
   * Configuração para o componente <Image> do Next.js.
   * Aqui, listamos os domínios externos dos quais permitimos o carregamento de imagens.
   */
  images: {
    remotePatterns: [
      // 1. Domínio adicionado para as bandeiras dos países (essencial para o projeto)
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
      },
      // Exemplo de outro domínio. Remova se não estiver usando.
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },

  /**
   * (Opcional) Define redirecionamentos permanentes ou temporários.
   * Útil para SEO ao mover páginas de lugar.
   * O exemplo abaixo redireciona qualquer acesso a /antigo-sobre para /sobre.
   * Remova ou altere conforme a necessidade do seu projeto.
   */
  async redirects() {
    return [
      {
        source: "/antigo-sobre",
        destination: "/sobre",
        permanent: true,
      },
    ];
  },

  /**
   * (Opcional) Reescreve caminhos de URL.
   * Útil para mascarar URLs ou para usar como um proxy para APIs externas,
   * evitando problemas de CORS e ocultando a URL real da API.
   * Remova ou altere conforme a necessidade do seu projeto.
   */
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://api.externa.com/:path*",
      },
    ];
  },
};

export default nextConfig;