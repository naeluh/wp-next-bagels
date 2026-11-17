'use client';

import React from 'react';
import { useSpring, animated } from '@react-spring/web';

const FadeInDirection = ({ isVisible, children }) => {
  const props = useSpring({
    from: { opacity: 0, transform: 'translateY(100px)' },
    to: {
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0px)' : 'translateY(100px)',
    },
    delay: 200,
  });
  return <animated.div style={props}>{children}</animated.div>;
};

export default FadeInDirection;
