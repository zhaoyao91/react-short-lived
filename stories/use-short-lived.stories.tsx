import * as React from 'react';
import { useState } from 'react';
import { useShortLived } from '../src';

export default {
  title: 'useShortLived',
};

export const demo = () => {
  const [on, setOn] = useState(false);
  const delayedOn = useShortLived({ on: on, delay: [500, 1000] });

  return (
    <div>
      <p>
        <button onClick={() => setOn(x => !x)}>toggle living</button>
      </p>
      <p>on: {String(on)}</p>
      <p>delayed on: {String(delayedOn)}</p>
    </div>
  );
};
