export function useMicro(name: string, baseUrl: string) {
  const spinning = ref(true);
  const url = ref(baseUrl);
  const microAppData = reactive({ msg: `来自基座${name}的数据`, count: 0 });

  const handleCreate = () => {
    console.log(`${name} 创建了`);
  };

  const handleBeforeMount = () => {
    console.log(`${name} 即将被渲染`);
  };

  const handleMount = () => {
    spinning.value = false;
    console.log(`${name} 已经渲染完成`);

    setTimeout(() => {
      microAppData.msg = `子应用${name}渲染完成`;
    }, 500);
  };

  const handleUnmount = () => {
    console.log(`${name} 卸载了`);
  };

  const handleError = () => {
    console.log(`${name} 加载出错了`);
  };

  const handleDataChange = (e: CustomEvent) => {
    console.log(`来自子应用 ${name} 的数据:`, e.detail.data);
    microAppData.count = e.detail.data?.count || 0;
  };

  return {
    url,
    microAppData,
    spinning,
    handleCreate,
    handleBeforeMount,
    handleMount,
    handleUnmount,
    handleError,
    handleDataChange,
  };
}
