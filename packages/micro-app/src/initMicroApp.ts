import microApp from "@micro-zoe/micro-app";

// vite项目必须设为iframe启动 https://micro-zoe.github.io/micro-app/docs.html#/zh-cn/configure?id=iframe
export const initMicroApp = () => {
  microApp.start({
    iframe: true,
  });
};
