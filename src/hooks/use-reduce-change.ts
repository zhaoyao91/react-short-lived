import { useEffect, useRef } from 'react';

export function useReduceChange<V, A>(
  reduce: (acc: A, prev: V, next: V) => A,
  zero: A,
  value: V
) {
  const prevValueRef = useRef(value);
  const prevAccRef = useRef(zero);

  const acc =
    prevValueRef.current === value
      ? prevAccRef.current
      : reduce(prevAccRef.current, prevValueRef.current, value);

  useEffect(() => {
    prevValueRef.current = value;
    prevAccRef.current = acc;
  }, [value, acc]);

  return acc;
}
