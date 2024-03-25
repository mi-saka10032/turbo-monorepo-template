<template>
  <div>
    <a-statistic
      :title="`${microAppData.msg}，以下是主应用接收的React子应用计数`"
      :value="microAppData.count"
      class="mb-4 text-center"
    />
    <div class="w-full h-full overflow-y-auto" :class="spinning ? 'pt-500px' : ''">
      <a-spin :spinning="spinning">
        <micro-app
          router-mode="native"
          inline
          :name
          :url
          :data="microAppData"
          @created="handleCreate"
          @beforemount="handleBeforeMount"
          @mounted="handleMount"
          @unmount="handleUnmount"
          @error="handleError"
          @datachange="handleDataChange"
        />
      </a-spin>
    </div>
  </div>
</template>

<script setup lang="ts">
  import config from '@/config';
  import { useMicro } from '@/hooks/useMicro';

  // sub name
  const name = 'SubReact';

  defineOptions({ name });

  const {
    url,
    microAppData,
    spinning,
    handleCreate,
    handleBeforeMount,
    handleMount,
    handleUnmount,
    handleError,
    handleDataChange,
  } = useMicro(name, config.react); // url
</script>
@/config
