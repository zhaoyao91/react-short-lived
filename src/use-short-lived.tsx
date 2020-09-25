import { useEffect, useState } from 'react';

type Delay = number;

type ComplexDelay = Delay | [Delay?, Delay?];

type Options = {
  living?: boolean;
  delay?: ComplexDelay;
};

const expandDelay = (delay: ComplexDelay) => {
  if (Array.isArray(delay)) {
    return [delay[0] ?? 0, delay[1] ?? 0];
  } else {
    return [delay ?? 0, delay ?? 0];
  }
};

export const useShortLived = ({
  living = false,
  delay = 0,
}: Options): boolean => {
  const [beforeDelay, endDelay] = expandDelay(delay);

  const [alive, setAlive] = useState(living);

  useEffect(() => {
    const timer = setTimeout(
      () => void setAlive(living),
      living ? beforeDelay : endDelay
    );
    return () => clearTimeout(timer);
  }, [living, beforeDelay, endDelay]);

  return alive;
};
