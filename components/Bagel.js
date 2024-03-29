import React from 'react';
import dynamic from 'next/dynamic';
import { useSpring, animated } from 'react-spring';
import styles from './bagel.module.css';
import { useHasBeenVisible } from '../hooks/useVisibility';
import FadeInDirection from './FadeInDirection';
import VsensorAnimate from './VsensorAnimate';

const BagelWebGl = dynamic(() => import('./BagelWebGl'), {
  loading: () => 'Loading...',
});

const Bagel = ({ title, img, desc }) => {
  const imageSrc = `/static/images/bagels.jpg`;
  const nodeRef = React.useRef();
  const isVisible = useHasBeenVisible(nodeRef);
  const style = useSpring({
    opacity: isVisible ? '1' : '0',
    maxHeight: '99vh',
    flex: '100%',
    aspectRatio: '16/9',
    transition: 'opacity 0.5s linear',
  });
  return (
    <VsensorAnimate once>
      {({ isVisible }) => (
        <FadeInDirection isVisible={isVisible}>
          <div className={styles.bagelContainer} ref={nodeRef}>
            <h5
              className={[
                'text-3xl font-semibold tracking-tighter leading-tight font-serif',
                styles.bagelHeader,
              ].join(' ')}
            >
              <span className={styles.bagelIcon}></span>
              <span className={styles.bagelText}>{title}</span>
            </h5>
            {/* <div
        style={{
          maxHeight: '99vh',
          flex: '100%',
          aspectRatio: '16/9',
          height: '100%',
          width: '100%',
          transition: 'opacity 0.5s linear',
        }}
      >
        {isVisible ? (
          <animated.div style={style}>
            <BagelWebGl />
          </animated.div>
        ) : (
          <div
            style={{
              maxHeight: '99vh',
              flex: '100%',
              aspectRatio: '16/9',
              height: '100%',
              width: '100%',
            }}
          />
        )}
      </div> */}

            {desc && (
              <p className='text-base font-normal tracking-tighter leading-tight font-sans'>
                {desc}
              </p>
            )}
          </div>
        </FadeInDirection>
      )}
    </VsensorAnimate>
  );
};

export default Bagel;
