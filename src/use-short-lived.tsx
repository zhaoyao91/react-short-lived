import { useEffect, useState } from 'react';

export type Delay = number;

export type ComplexDelay = Delay | [Delay?, Delay?];

type Options = {
  on?: boolean;
  delay?: ComplexDelay;
};

const expandDelay = (delay: ComplexDelay) => {
  if (Array.isArray(delay)) {
    return [delay[0] ?? 0, delay[1] ?? 0];
  } else {
    return [delay ?? 0, delay ?? 0];
  }
};

export const useShortLived = ({ on = false, delay = 0 }: Options): boolean => {
  const [beforeDelay, endDelay] = expandDelay(delay);

  const [delayedOn, setDelayedOn] = useState(on);

  useEffect(() => {
    const timer = setTimeout(
      () => void setDelayedOn(on),
      on ? beforeDelay : endDelay
    );
    return () => clearTimeout(timer);
  }, [on, beforeDelay, endDelay]);

  return delayedOn;
};
