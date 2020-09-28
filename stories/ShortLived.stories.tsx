import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { ShortLived } from '../src';

export default {
  title: 'ShortLived',
  component: ShortLived,
};

export const demo = () => {
  const [on, setOn] = useState(false);

  const renderDemo = useCallback((alive, kill) => {
    return <Demo {...{ alive, kill, setOn }} />;
  }, []);

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
        render={renderDemo}
      />
    </div>
  );
};

const Demo = ({ alive, kill, setOn }: any) => {
  useEffect(() => {
    console.log('demo mount');
    return () => console.log('demo unmount');
  }, []);

  useEffect(() => {
    console.log('demo render');
  });

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
};
