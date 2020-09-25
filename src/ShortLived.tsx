import React, { Fragment, FC, ReactElement, useRef } from 'react';
import { ComplexDelay, useShortLived } from './use-short-lived';

type Props = {
  on?: boolean;
  delay?: ComplexDelay;
  render?: (alive: boolean) => ReactElement;
  version?: number | string;
};

export const ShortLived: FC<Props> = ({
  on = false,
  delay,
  render,
  version,
}) => {
  const delayedOn = useShortLived({ on, delay });

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
      <Fragment key={version ?? versionRef.current}>
        {render?.(alive) ?? null}
      </Fragment>
    );
  }

  return null;
};
