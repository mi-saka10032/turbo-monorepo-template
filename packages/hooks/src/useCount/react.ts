import { useState } from "react";

export function useReactCount() {
  const [count, setCount] = useState(0);

  const add = () => {
    setCount((count) => count + 1);
  };

  return { add, count };
}
