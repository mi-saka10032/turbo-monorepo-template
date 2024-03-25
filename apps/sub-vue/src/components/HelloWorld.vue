<script setup lang="ts">
  import { useVueCount } from '@packages/hooks';
  import { sendCountToMain } from '@packages/micro-app';
  import { greetMidway } from '@packages/request';
  import { ref, watch } from 'vue';

  defineProps<{ msg: string }>();

  const { add, count } = useVueCount();
  const content = ref('');

  const greet = async () => {
    content.value = await greetMidway();
    add();
  };

  watch(count, (num) => {
    sendCountToMain(num);
  });
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" style="margin-bottom: 16px" @click="greet">Greet Midway</button>
    <fieldset>
      <legend>点击Greet按钮查看服务端返回内容</legend>
      <p>
        服务端返回：<span className="font-bold">{{ content }}</span> ，累计访问次数：{{ count }}
      </p>
    </fieldset>
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank">create-vue</a>, the
    official Vue + Vite starter
  </p>
  <p>
    Install
    <a href="https://github.com/vuejs/language-tools" target="_blank">Volar</a>
    in your IDE for a better DX
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<style scoped>
  .read-the-docs {
    color: #888;
  }
</style>
