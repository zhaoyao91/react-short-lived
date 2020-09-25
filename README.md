# React Short Lived

Help maintain short-lived React component.

## Motivation

Some components, such as modal, pop menu and drawer, are short-lived, which means they may exist for long but will
only be alive for a short time. Some of them hold a lot of data and state. We wish a fresh version of them when they
come to alive, but want to clean them after they are truly dead (not only with state being changed to invisible, but
also with all animations finished).

## How it works

This package expose a component `ShortLived` of render props pattern. You set up the delay times, turn it on and off, the
render function with give you an `alive` as a hint, which you can use as `visible` or `open` prop for the inner component.
After some time of being not alive, the inner component will be cleaned.

## Install

```
yarn add react-short-lived
```

```
npm install react-short-lived
```

## Getting started

```tsx
import { useState } from 'react';
import { ShortLived } from 'react-short-lived';
import { Modal } from 'some-package';

function Demo() {
  const [modalOn, setModalOn] = useState(false);

  function handleClickButton() {
    setModalOn(x => !x);
  }

  return (
    <div>
      <button onClick={handleClickButton}>Toggle modal</button>
      <ShortLived on={modalOn} delay={[0, 300]} render={(alive) => <Modal visible={alive}/>}>
    </div>
  );
}
```

## Props

| Name    | Type                             | Required | Description |
| ------- | -------------------------------- | -------- | ----------- |
| on      | boolean                          | false    |             |
| delay   | number \| [number?, number?]     | false    |             |
| render  | (alive: boolean) => ReactElement | false    |             |
| version | number \| string                 | false    |             |

## License

MIT
