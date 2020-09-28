import React, {
  Fragment,
  FC,
  ReactElement,
  useRef,
  useState,
  useEffect,
} from 'react';

type Delay = number;

type Props = {
  on?: boolean;
  delayStart?: Delay;
  delayEnd?: Delay;
  render?: (alive: boolean) => ReactElement;
  version?: number | string;
};

export const ShortLived: FC<Props> = ({
  on = false,
  delayStart = 0,
  delayEnd = 1000,
  render,
  version,
}) => {
  const [delayedOn, setDelayedOn] = useState(on);

  useEffect(() => {
    const timer = setTimeout(
      () => void setDelayedOn(on),
      on ? delayStart : delayEnd
    );
    return () => clearTimeout(timer);
  }, [on, delayStart, delayEnd]);

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
