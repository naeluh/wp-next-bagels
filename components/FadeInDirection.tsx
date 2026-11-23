'use client';
import React, { useEffect, useRef, useState } from 'react';
import { useSpring, animated } from '@react-spring/web';

// Fades children up into view the first time they scroll into the viewport.
type Props = {
  children?: React.ReactNode;
};

const FadeInDirection = ({ children }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(ref.current!);
    return () => observer.disconnect();
  }, []);

  const props = useSpring({
    delay: 0.2,
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0px)' : 'translateY(100px)',
  });
  return (
    <animated.div ref={ref} style={props}>
      {children}
    </animated.div>
  );
};

export default FadeInDirection;
