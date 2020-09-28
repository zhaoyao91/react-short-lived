import * as React from 'react';
import { useEffect, useState } from 'react';
import { ShortLived } from '../src';

export default {
  title: 'ShortLived',
  component: ShortLived,
};

export const demo = () => {
  const [on, setLiving] = useState(false);

  return (
    <div>
      <p>
        <button
          onClick={() => {
            setLiving(x => !x);
          }}
        >
          toggle living
        </button>
      </p>
      <p>on: {String(on)}</p>
      <ShortLived
        on={on}
        delay={[500, 1000]}
        render={alive => <Demo alive={alive} />}
      />
    </div>
  );
};

const Demo = ({ alive }: any) => {
  useEffect(() => {
    console.log('mount');
  }, []);

  return <p>alive: {String(alive)}</p>;
};
