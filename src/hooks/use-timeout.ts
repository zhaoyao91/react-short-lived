import { useEffect, useState } from 'react';

export type MS = undefined | null | number;

export function useTimeout(ms: MS, deps: any[] = []) {
  const [done, setDone] = useState(ms == null);

  useEffect(() => {
    // never done
    if (ms == null) {
      setDone(false);
      return;
    }

    // immediately done
    if (ms < 0) {
      setDone(true);
      return;
    }

    // delayed done
    const timer = setTimeout(() => {
      setDone(true);
    }, ms);
    return () => clearTimeout(timer);
  }, [ms, ...deps]);

  return done;
}
