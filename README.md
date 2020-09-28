# React Short Lived

Help maintain short-lived React component.

## Motivation

Some components, such as modal, pop menu and drawer, are short-lived, which means they may exist for long but will
only be alive for a short time. Some of them hold a lot of data and state. We wish a fresh version of them when they
come to alive, but want to clean them after they are totally dead.

## How it works

This package exposes a component `ShortLived` of render props pattern. You just set up the delay times, turn it on and off, the
render function will give you an `alive` as a hint, which you can use as `visible` or `open` prop for the inner component.
After some time of being not alive, the inner component will be cleaned.

![Lifetime](https://user-images.githubusercontent.com/3808838/94408158-fb76d500-01a6-11eb-9229-20fc8dbcc02d.jpeg)

As the picture above shows, you only control `on` and `delay`, this package will manage `delayed on`, and, during `living`, your
inner component is mounted, and during `alive`, your inner component should be alive/visible/open.

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
      <ShortLived on={modalOn} render={(alive) => <Modal visible={alive}/>}>
    </div>
  );
}
```

## Props

| Name       | Type                                               | Default | Description                                                                                                                     |
| ---------- | -------------------------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------- |
| on         | boolean                                            |         |                                                                                                                                 |
| delayStart | number                                             | 0       | negative number means no timer and update state immediately, `Infinity` means no timer and never update the state automatically |
| delayEnd   | number                                             | 1000    | see above                                                                                                                       |
| render     | (alive: boolean, kill: () => void) => ReactElement |         |                                                                                                                                 |
| version    | number \| string                                   |         | see [Advanced](#Advanced)                                                                                                       |

## Advanced

## `version` prop

Inside `ShortLived` it creates a version for each `on`, so that there is always a new mounted inner component for each `on`.

If you don't need this feature, you can set `version` to a fixed value, or control it by yourself.

## `kill` method in `render` function

Call this function to kill the component. `alive` will be false immediately, but inside component will retain mounted until the end of the living period.

## License

MIT
