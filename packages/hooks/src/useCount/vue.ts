import { ref } from "vue";

export function useVueCount() {
  const count = ref(0);

  const add = () => {
    count.value += 1;
  };

  return { add, count };
}
