'use client';

import React, { useState, useEffect, useRef } from 'react';

type Props = {
  once?: boolean;
  children: (state: { isVisible: boolean }) => React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

const VsensorAnimate = ({ once, children, ...rest }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const vis = entry.isIntersecting;
        if (once) {
          if (vis) {
            setIsVisible(true);
            observer.unobserve(el);
          }
        } else {
          setIsVisible(vis);
        }
      },
      { threshold: 0 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [once]);

  return (
    <div ref={ref} {...rest}>
      {children({ isVisible })}
    </div>
  );
};

export default VsensorAnimate;
