import { EventCenterForMicroApp } from "@micro-zoe/micro-app";

declare global {
  interface Window {
    microApp: EventCenterForMicroApp;
    __MICRO_APP_ENVIRONMENT__: boolean;
    __MICRO_APP_NAME__: string;
    __MICRO_APP_BASE_APPLICATION__: string;
  }
}

// 子应用与基座进行数据交互
export const handleMicroData = () => {
  // microApp 是基座添加到window的数据通信对象
  if (window.microApp) {
    const appName = window.microApp.appName;
    // 主动获取基座下发的数据
    console.log(`${appName} getData:`, window.microApp.getData());

    // 监听基座下发的数据变化
    window.microApp.addDataListener((data: Record<string, unknown>) => {
      console.log(`${appName} addDataListener:`, data);
    });

    // 向基座发送数据
    setTimeout(() => {
      window.microApp.dispatch({ appName });
    }, 3000);
  }
};

export const sendCountToMain = (count: number) => {
  window.microApp.dispatch({ count });
};

export const unmountMicroApp = () => {
  // 卸载所有数据监听函数
  const appName = window.microApp?.appName;
  window.microApp?.clearDataListener();
  console.log(`微应用${appName}卸载了`);
};
