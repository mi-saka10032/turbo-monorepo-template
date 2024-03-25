<template>
  <a-layout class="h-screen">
    <a-layout-sider
      breakpoint="lg"
      collapsed-width="0"
      @collapse="onCollapse"
      @breakpoint="onBreakpoint"
    >
      <div class="logo"></div>
      <a-menu theme="dark" mode="inline" @click="handleClickSubMenu">
        <a-menu-item key="/home">
          <user-outlined />
          <span class="nav-text">Home</span>
        </a-menu-item>
        <a-menu-item key="/sub-vue">
          <video-camera-outlined />
          <span class="nav-text">Sub Vue</span>
        </a-menu-item>
        <a-menu-item key="/sub-react">
          <video-camera-outlined />
          <span class="nav-text">Sub React</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header class="bg-white! mx-4" />
      <a-layout-content class="flex-1 mt-6 mx-4">
        <router-view class="flex flex-col items-center w-full h-full" />
      </a-layout-content>
      <a-layout-footer class="text-xl! text-center">
        Turbo Monorepo Template ©2024 Created by mi-saka10032
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script lang="ts" setup>
  import { UserOutlined, VideoCameraOutlined } from '@ant-design/icons-vue';
  import { type MenuProps } from 'ant-design-vue';
  import { useRoute, useRouter } from 'vue-router';

  defineOptions({ name: 'Layouts' });

  const route = useRoute();
  const router = useRouter();

  const onCollapse = (collapsed: boolean, type: string) => {
    console.log('onCollapse');
    console.log(collapsed, type);
    console.log('onCollapse');
  };

  const onBreakpoint = (broken: boolean) => {
    console.log('onBreakpoint');
    console.log(broken);
    console.log('onBreakpoint');
  };

  const handleClickSubMenu: MenuProps['onClick'] = ({ key }) => {
    if (route.path !== key) {
      router.push(key as string);
    }
  };
</script>

<style scoped>
  #components-layout-demo-responsive .logo {
    height: 32px;
    margin: 16px;
    background: rgb(255 255 255 / 20%);
  }

  .site-layout-sub-header-background {
    background: #fff;
  }

  .site-layout-background {
    background: #fff;
  }

  [data-theme='dark'] .site-layout-sub-header-background {
    background: #141414;
  }
</style>
