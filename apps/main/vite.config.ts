import { defineApplicationConfig } from '@configs/vite-config';
import AutoImport from 'unplugin-auto-import/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import Components from 'unplugin-vue-components/vite';

// https://vitejs.dev/config/
export default defineApplicationConfig({
  overrides: {
    plugins: [
      AutoImport({
        imports: ['vue'],
        dts: 'src/types/auto-import.d.ts',
      }),
      Components({
        resolvers: [
          AntDesignVueResolver({
            // antd v4版本 CssInJs 无需引入css
            importStyle: false,
          }),
        ],
        dts: 'src/types/component.d.ts',
      }),
    ],
    server: {
      port: 3000,
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            vue: ['vue'],
            router: ['vue-router'],
            ant: ['ant-design-vue'],
          },
        },
      },
    },
  },
});
