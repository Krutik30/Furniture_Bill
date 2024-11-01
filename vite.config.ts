import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa';
import svgr from 'vite-plugin-svgr'; // https://stackoverflow.com/a/73752402

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr(),
    VitePWA({ 
      registerType: 'prompt',
      workbox: {
          globPatterns: ["**/*.{html,js,css,png,svg,jpg,gif,json,woff,woff2,eot,ico,webmanifest,map}"],
          maximumFileSizeToCacheInBytes: 10000000,
          sourcemap: true
      },
      includeAssets:['/favicon.ico', '/favicon/apple-touch-icon.png', '/favicon/favicon-32x32.png'],
    //   runtimeCaching: [
    //     getCache({ 
    //       pattern: /^https:\/\/s3.amazonaws.com\/my-library-cover-uploads/, 
    //       name: "local-images1" 
    //     }),
    //     getCache({ 
    //       pattern: /^https:\/\/my-library-cover-uploads.s3.amazonaws.com/, 
    //       name: "local-images2" 
    //     })
    //   ],
      manifest: {
          "short_name": "Bill Gen",
          "name": "Bill Gen",
          "description": "Generation of Bill Very Easily",
          "icons": [
          {
              "src": "favicon.ico",
              "sizes": "48x48",
              "type": "image/x-icon"
          },
          {
              "src": "/favicon/favicon-16x16.png",
              "sizes": "16x16",
              "type": "image/x-icon"
          },
          {
              "src": "/favicon/favicon-32x32.png",
              "sizes": "32x32",
              "type": "image/x-icon"
          },
          {
              "src": "/favicon/android-chrome-192x192.png",
              "type": "image/png",
              "sizes": "192x192"
          },
          {
              "src": "/favicon/android-chrome-512x512.png",
              "type": "image/png",
              "sizes": "512x512"
          }
          ],
          "start_url": ".",
          "display": "standalone",
          "theme_color": "#5296d9",
          "background_color": "#ffffff"
      }
    }),
  ]
})
