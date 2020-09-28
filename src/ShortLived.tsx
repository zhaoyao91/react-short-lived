import React, { FC, memo, ReactElement, useCallback, useState } from 'react';
import { useOnVersion } from './hooks/use-on-version';
import { useTimeout } from './hooks/use-timeout';

type Version = string | number;
type Delay = undefined | null | number;

type Props = {
  on?: boolean;
  delayStart?: Delay;
  delayEnd?: Delay;
  render?: (alive: boolean, kill: () => void) => ReactElement;
  version?: Version;
};

export const ShortLived: FC<Props> = ({
  on = false,
  delayStart = -1,
  delayEnd = 1000,
  render,
  version: userVersion,
}) => {
  const innerVersion = useOnVersion(on);
  const version = getVersion(userVersion, innerVersion);
  const firstVersion = innerVersion === 0;

  const [killedVersion, setKilledVersion] = useState<Version | undefined>();
  const kill = useCallback(() => setKilledVersion(version), [
    version,
    setKilledVersion,
  ]);
  const killed = killedVersion === version;

  const onDone = useTimeout(getTimeoutMS(on, firstVersion, killed, delayStart));
  const offDone = useTimeout(getTimeoutMS(!on, firstVersion, killed, delayEnd));

  const living = !killed && (on || !offDone);
  const alive = living && on && onDone;

  if (living) {
    return (
      <ShortLivedRenderer
        key={version}
        alive={alive}
        kill={kill}
        render={render}
      />
    );
  }

  return null;
};

function getTimeoutMS(
  onOff: boolean,
  isFirstVersion: boolean,
  isKilled: boolean,
  delay?: Delay
) {
  if (isKilled) return false;
  if (!onOff) return false;
  if (isFirstVersion) return true;
  return delay;
}

const ShortLivedRenderer = memo(({ alive, kill, render }: any) => {
  return render?.(alive, kill) ?? null;
});

// innerVersion is number and userVersion is `_` prefixed string so they will never collapse
function getVersion(userVersion?: Version, innerVersion?: Version) {
  if (userVersion == null) return innerVersion;
  else return '_' + userVersion;
}
