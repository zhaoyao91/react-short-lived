import React, {
  FC,
  memo,
  ReactElement,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

type Delay = number;

type Props = {
  on?: boolean;
  delayStart?: Delay;
  delayEnd?: Delay;
  render?: (alive: boolean, kill: () => void) => ReactElement;
  version?: number | string;
};

export const ShortLived: FC<Props> = ({
  on = false,
  delayStart = 0,
  delayEnd = 1000,
  render,
  version: userVersion,
}) => {
  const innerVersion = useVersion(on);
  const version = getVersion(userVersion, innerVersion);

  // state bundle is bound to a version
  const [state, setState] = useState({
    version,
    on,
    delayedOn: on,
    killed: false,
  });

  // correctly turn on and off
  useEffect(() => {
    if (on) {
      setState({
        // version is not a dep
        version,
        on: true,
        delayedOn: false,
        killed: false,
      });
    } else {
      setState(state => ({ ...state, on: false }));
    }
  }, [on]);

  // sync version
  useEffect(() => {
    setState(state => ({ ...state, version }));
  }, [version]);

  // manage delayedOn state
  useEffect(() => {
    if (on && delayStart < Infinity) {
      const timer = setTimeout(() => {
        setState(state => ({ ...state, delayedOn: true }));
      }, delayStart);
      return () => clearTimeout(timer);
    } else if (!on && delayEnd < Infinity) {
      const timer = setTimeout(() => {
        setState(state => ({ ...state, delayedOn: false }));
      }, delayEnd);
      return () => clearTimeout(timer);
    } else {
      return undefined;
    }
  }, [on, delayStart, delayEnd]);

  const kill = useCallback(
    () => setState(state => ({ ...state, killed: true })),
    [setState]
  );

  const living = (state.on || state.delayedOn) && !state.killed;
  const alive = living && state.on && state.delayedOn;

  if (living) {
    return (
      <ShortLivedRenderer
        key={state.version}
        alive={alive}
        kill={kill}
        render={render}
      />
    );
  }

  return null;
};

const ShortLivedRenderer = memo(({ alive, kill, render }: any) => {
  return render?.(alive, kill) ?? null;
});

function getVersion(
  userVersion?: number | string,
  innerVersion?: number | string
) {
  if (userVersion == null) return innerVersion;
  else return '_' + userVersion;
}

function useChanged(value: any) {
  const previousValue = useRef(value);
  const prevValue = previousValue.current;
  const changed = prevValue !== value;
  previousValue.current = value;
  return changed;
}

// keep version inc by on in render invocation
function useVersion(on: boolean) {
  const onChanged = useChanged(on);
  const versionRef = useRef(0);
  if (onChanged && on) {
    versionRef.current++;
  }
  return versionRef.current;
}
