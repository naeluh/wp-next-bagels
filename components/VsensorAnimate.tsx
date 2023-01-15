import React, { useState } from 'react';
import VSensor from 'react-visibility-sensor';

type Props = {
  once: boolean;
  children: any;
  theRest: any;
};

const VsensorAnimate = ({ once, children, ...theRest }: Props) => {
  const [active, setActive] = useState(true);
  return (
    <VSensor
      active={active}
      onChange={(isVisible: boolean) => once && isVisible && setActive(false)}
      {...theRest}
    >
      {({ isVisible }: { isVisible: boolean }) => children({ isVisible })}
    </VSensor>
  );
};

export default VsensorAnimate;
