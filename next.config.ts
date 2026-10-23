import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // 75 é o padrão do Next; 90 é usado na foto do "Sobre", que aparece ampliada.
    qualities: [75, 90],
  },
};

export default nextConfig;
