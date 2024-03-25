import 'virtual:uno.css';
import 'ant-design-vue/dist/reset.css';

import { initMicroApp } from '@packages/micro-app';
import { createApp } from 'vue';

import App from './App.vue';
import router from './router';

initMicroApp();

createApp(App).use(router).mount('#app');
