import { defineApplicationConfig } from '@configs/vite-config'

// https://vitejs.dev/config/
export default defineApplicationConfig({
  overrides: {
    server: {
      port: 3002
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            react: ['react', 'react-dom']
          }
        }
      }
    }
  }
})
