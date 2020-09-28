import { useReduceChange } from './use-reduce-change';

function reduceOnVersion(version: number, prevOn: boolean, nextOn: boolean) {
  return version + (!prevOn && nextOn ? 1 : 0);
}

export function useOnVersion(on: boolean) {
  return useReduceChange(reduceOnVersion, 0, on);
}
