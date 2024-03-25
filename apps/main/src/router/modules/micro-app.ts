export default [
  {
    path: 'sub-vue',
    name: 'SubVue',
    component: () => import('@/views/SubVue.vue'),
  },
  {
    path: 'sub-react',
    name: 'SubReact',
    component: () => import('@/views/SubReact.vue'),
  },
];
