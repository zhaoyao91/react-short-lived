import React, {
  Fragment,
  FC,
  ReactElement,
  useRef,
  useState,
  useEffect,
} from 'react';

export type Delay = number;

export type ComplexDelay = Delay | [Delay?, Delay?];

type Props = {
  on?: boolean;
  delay?: ComplexDelay;
  render?: (alive: boolean) => ReactElement;
  version?: number | string;
};

export const ShortLived: FC<Props> = ({
  on = false,
  delay = 0,
  render,
  version,
}) => {
  const [beforeDelay, endDelay] = expandDelay(delay);
  const [delayedOn, setDelayedOn] = useState(on);

  useEffect(() => {
    const timer = setTimeout(
      () => void setDelayedOn(on),
      on ? beforeDelay : endDelay
    );
    return () => clearTimeout(timer);
  }, [on, beforeDelay, endDelay]);

  const previousOnRef = useRef(on);
  const versionRef = useRef(0);
  if (on && !previousOnRef.current) {
    versionRef.current++;
  }
  previousOnRef.current = on;

  const living = on || delayedOn;
  const alive = on && delayedOn;

  if (living) {
    return (
      <Fragment key={getVersion(version, versionRef.current)}>
        {render?.(alive) ?? null}
      </Fragment>
    );
  }

  return null;
};

function getVersion(
  userVersion?: number | string,
  innerVersion?: number | string
) {
  if (userVersion == null) return innerVersion;
  else return '_' + userVersion;
}

const expandDelay = (delay: ComplexDelay) => {
  if (Array.isArray(delay)) {
    return [delay[0] ?? 0, delay[1] ?? 0];
  } else {
    return [delay ?? 0, delay ?? 0];
  }
};
