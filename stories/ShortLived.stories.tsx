import * as React from 'react';
import { useState } from 'react';
import { ShortLived } from '../src';

export default {
  title: 'ShortLived',
  component: ShortLived,
};

export const demo = () => {
  const [on, setOn] = useState(false);

  return (
    <div>
      <p>
        <button
          onClick={() => {
            setOn(x => !x);
          }}
        >
          toggle on
        </button>
      </p>
      <p>on: {String(on)}</p>
      <ShortLived
        on={on}
        delayStart={500}
        delayEnd={1000}
        render={(alive, kill) => {
          return (
            <div>
              <p>alive: {String(alive)}</p>
              <button
                onClick={() => {
                  setOn(false);
                  setTimeout(kill, 500);
                }}
              >
                close
              </button>
            </div>
          );
        }}
      />
    </div>
  );
};
