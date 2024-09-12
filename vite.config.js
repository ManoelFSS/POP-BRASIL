import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa';


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      manifest:{
        name: "POP BRASIL FM",
        short_name: "POP BRASIL",
        description: "Uma aplicação web feita em React com Vite",
        theme_color: "#2A4F7D",
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
      registerType: "autoUpdate",
      devOptions: {
        enabled: false // Apenas para desenvolvimento
      }
    }),
  ],
})
