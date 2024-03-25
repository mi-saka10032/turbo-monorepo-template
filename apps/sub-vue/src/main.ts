import 'virtual:uno.css';
import './style.css';

import { handleMicroData, unmountMicroApp } from '@packages/micro-app';
import { createApp } from 'vue';

import App from './App.vue';

if (window.__MICRO_APP_ENVIRONMENT__) {
  const app = createApp(App);
  app.mount('#app');
  console.log('微应用sub-vue渲染了');

  handleMicroData();
  // 监听卸载操作
  window.addEventListener('unmount', function () {
    app.unmount();
    unmountMicroApp();
  });
} else {
  createApp(App).mount('#app');
}
