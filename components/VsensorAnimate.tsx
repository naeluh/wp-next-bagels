import React, { useState } from 'react';
import PropTypes from 'prop-types';
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
      onChange={isVisible => once && isVisible && setActive(false)}
      {...theRest}
    >
      {({ isVisible }) => children({ isVisible })}
    </VSensor>
  );
};

export default VsensorAnimate;
