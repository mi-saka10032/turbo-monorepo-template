import react from "@vitejs/plugin-react-swc";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { type PluginOption } from "vite";

import { createAppConfigPlugin } from "./appConfig";
import { configCompressPlugin } from "./compress";
import { configHtmlPlugin } from "./html";
// import { viteMockServe } from 'vite-plugin-mock';
import { configVisualizerConfig } from "./visualizer";

interface Options {
  isBuild: boolean;
  root: string;
  compress: string;
  enableMock?: boolean;
  enableAnalyze?: boolean;
  // TODO
  frame?: string | "vue" | "react";
}

async function createPlugins({
  isBuild,
  root,
  enableMock,
  compress,
  enableAnalyze,
  frame,
}: Options) {
  const vitePlugins: (PluginOption | PluginOption[])[] = [];

  switch (frame) {
    case "vue": {
      vitePlugins.push(
        vue({
          template: {
            compilerOptions: {
              isCustomElement: (tag) => /^micro-app/.test(tag),
            },
          },
        }),
        vueJsx(),
      );
      break;
    }
    case "react": {
      vitePlugins.push(react());
      break;
    }
    default:
      break;
  }

  const appConfigPlugin = await createAppConfigPlugin({ root, isBuild });
  vitePlugins.push(appConfigPlugin);

  // vite-plugin-html
  vitePlugins.push(configHtmlPlugin({ isBuild }));

  // The following plugins only work in the production environment
  if (isBuild) {
    // rollup-plugin-gzip
    vitePlugins.push(
      configCompressPlugin({
        compress,
      }),
    );
  }

  // rollup-plugin-visualizer
  if (enableAnalyze) {
    vitePlugins.push(configVisualizerConfig());
  }

  // vite-plugin-mock
  if (enableMock) {
    // vitePlugins.push(viteMockServe({ isBuild }));
  }

  return vitePlugins;
}

export { createPlugins };
