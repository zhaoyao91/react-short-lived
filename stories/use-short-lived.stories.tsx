import * as React from 'react';
import { useState } from 'react';
import { useShortLived } from '../src';

export default {
  title: 'useShortLived',
};

export const demo = () => {
  const [living, setLiving] = useState(false);
  const alive = useShortLived({ living, delay: [500, 1000] });

  return (
    <div>
      <p>
        <button onClick={() => setLiving(x => !x)}>toggle living</button>
      </p>
      <p>living: {String(living)}</p>
      <p>alive: {String(alive)}</p>
    </div>
  );
};
