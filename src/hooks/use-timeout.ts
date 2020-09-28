import { useEffect, useState } from 'react';

export type MS = undefined | null | number | boolean;

export function useTimeout(ms: MS, deps: any[] = []) {
  const [done, setDone] = useState(() => {
    if (typeof ms === 'boolean') return ms;
    if (ms == null) return false;
    return ms < 0;
  });

  useEffect(() => {
    // as you wish
    if (typeof ms === 'boolean') {
      setDone(ms);
      return;
    }

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
    setDone(false);
    const timer = setTimeout(() => {
      setDone(true);
    }, ms);
    return () => clearTimeout(timer);
  }, [ms, ...deps]);

  return done;
}
