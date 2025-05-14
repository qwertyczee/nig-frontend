import { defineConfig } from 'vite'
    import react from '@vitejs/plugin-react'

    // https://vitejs.dev/config/
    export default defineConfig({
      plugins: [react()],
      server: {
        port: 3000, // Frontend port
        proxy: {
          // Proxy /api requests to the backend server
          '/api': {
            target: 'http://localhost:3001', // Your backend server address
            changeOrigin: true,
            // rewrite: (path) => path.replace(/^\/api/, '') // if your backend doesn't expect /api prefix
          }
        }
      }
    })
