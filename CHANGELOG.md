# react-short-lived

## 0.4.1

### Patch Changes

- 314d784: fix: fix timeout logic

## 0.4.0

### Minor Changes

- b5f6af2: batch update
  - refactor: optimize inside logic
  - feat: delayStart defaults to -1

### Patch Changes

- 3e6f009: refactor: optimize how to maintain version

## 0.3.0

### Minor Changes

- 1e80c9c: v 0.3.0
  - feat: change delay prop to delayStart and delayEnd
  - feat: add kill method to render function
  - feat: sync version
  - refactor: optimize inside logic

### Patch Changes

- c8636f2: feat: support negative delay time
- fbc3261: inline and remove useShortLived hook

## 0.2.0

### Minor Changes

- 358053a: update exports
  - remove export of useShortLived, it should be private
  - export ShortLived as default export
