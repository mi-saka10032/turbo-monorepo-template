import { defineApplicationConfig } from '@configs/vite-config';

// https://vitejs.dev/config/
export default defineApplicationConfig({
  overrides: {
    server: {
      port: 3001,
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            vue: ['vue'],
          },
        },
      },
    },
  },
});
