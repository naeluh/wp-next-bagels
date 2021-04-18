import React from 'react';
import { useSpring, animated } from 'react-spring';

const FadeInDirection = ({ isVisible, children }) => {
  const props = useSpring({
    delay: 0.2,
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0px)' : 'translateY(100px)',
  });
  return <animated.div style={props}>{children}</animated.div>;
};

export default FadeInDirection;
