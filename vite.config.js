import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      manifest: {
        id: "pop-brasil",
        name: "POP BRASIL FM",
        short_name: "POP BRASIL",
        start_url: "/",
        description: "Uma aplicação web feita em React com Vite",
        theme_color: "#2A4F7D", // Cor da barra de status
        background_color: "#2A4F7D", // Cor de fundo da splash screen
        display: "fullscreen",
        orientation: "any",
        icons: [
          {
            src: "pop-brasil.png",
            sizes: "280x280",
            type: "image/png"
          },
          {
            src: "pop-brasil.png",
            sizes: "512x512",
            type: "image/png"
          }
        ]
      },
      registerType: "autoUpdate", // Atualização automática do SW
      devOptions: {
        enabled: true // Service worker ativado apenas no modo de desenvolvimento
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /\/.*/, // Configuração para cachear as rotas
            handler: 'NetworkFirst', // Estratégia de cache
          },
        ],
      },
        includeAssets: ['registerSW.js', 'outro-arquivo.js', 'favicon.ico'],
       // Assets a serem incluídos no cache
      "screenshots": [
        {
          "src": "pop-brasil.png",
          "sizes": "500x500",
          "type": "image/png",
          "platform": "wide"
        },
        {
          "src": "pop-brasil.png",
          "sizes": "640x800",
          "type": "image/png",
          "platform": "narrow"
        }
      ]

    }),
  ],
})
