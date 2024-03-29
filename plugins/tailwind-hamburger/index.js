module.exports = function ({ addComponents }) {
  const sizes = {
    4: {
      hamburgerWidth: 16,
      spacing: 2,
      barHeight: 2,
    },
    6: {
      hamburgerWidth: 24,
      spacing: 3,
      barHeight: 3,
    },
    8: {
      hamburgerWidth: 32,
      spacing: 4,
      barHeight: 8,
    },
    12: {
      hamburgerWidth: 48,
      spacing: 6,
      barHeight: 6,
    },
    14: {
      hamburgerWidth: 60,
      spacing: 8,
      barHeight: 8,
    },
  };
  const color = '#fad113';
  const baseTransition = {
    transitionTimingFunction: 'ease',
    transitionDuration: '15ms',
    transitionProperty: 'transform',
  };
  const part = {
    position: 'absolute',
    display: 'block',
  };
  const hamburgers = {
    '.tham': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      transitionTimingFunction: 'linear',
      transitionDuration: '.15s',
      transitionProperty: 'opacity',
      '&:hover': {
        opacity: 0.7,
      },
    },
    '.tham-e-squeeze': {
      '.tham-inner': {
        backgroundColor: 'transparent',
        transitionTimingFunction: 'cubic-bezier(.55,.055,.675,.19)',
        transitionDuration: '75ms',
        '&::before': {
          transition: 'top 75ms ease .12s,opacity 75ms ease',
        },
        '&::after': {
          transition:
            'bottom 75ms ease .12s,transform 75ms cubic-bezier(.55,.055,.675,.19)',
        },
      },
    },
    '.tham-active': {
      '&.tham-e-squeeze': {
        '.tham-inner': {
          backgroundColor: color,
          transitionDelay: '.12s',
          transitionTimingFunction: 'cubic-bezier(.215,.61,.355,1)',
          transform: 'rotate(45deg)',
          '&::before': {
            top: 0,
            transition:
              'border-radius 75ms ease,top 75ms ease,opacity 75ms ease .12s',
            opacity: 0,
            borderRadius: '0',
          },
          '&::after': {
            bottom: 0,
            transition:
              'border-radius 75ms ease,bottom 75ms ease,transform 75ms cubic-bezier(.215,.61,.355,1) .12s',
            transform: 'rotate(-90deg)',
            borderRadius: '0',
          },
          '.tham-inner-span': {
            '&::before': {
              content: '""',
            },
          },
        },
      },
    },
    '.tham-box': {
      position: 'relative',
      display: 'inline-block',
    },
    '.tham-inner': {
      top: '50%',
      display: 'block',
      backgroundColor: '#FFF',
      ...part,
      ...baseTransition,
      '&::before': {
        content: '""',
        backgroundColor: color,
        borderRadius: '20px 20px 0 0',
        ...part,
        ...baseTransition,
      },
      '&::after': {
        content: '""',
        backgroundColor: color,
        borderRadius: '0 0 20px 20px',
        ...part,
        ...baseTransition,
      },
    },
  };

  for (const size in sizes) {
    hamburgers[`.tham-w-${size}`] = {
      width: sizes[size].hamburgerWidth,
      height: sizes[size].barHeight * 3 + sizes[size].spacing * 2,
      '.tham-box': {
        width: sizes[size].hamburgerWidth,
        height: sizes[size].barHeight * 3 + sizes[size].spacing * 2,
      },
      '.tham-inner': {
        marginTop: sizes[size].barHeight / -2,
        width: sizes[size].hamburgerWidth,
        height: sizes[size].barHeight,
        '&::before': {
          width: sizes[size].hamburgerWidth,
          height: sizes[size].barHeight,
          top: (sizes[size].spacing + sizes[size].barHeight) * -1,
        },
        '&::after': {
          width: sizes[size].hamburgerWidth,
          height: sizes[size].barHeight,
          bottom: (sizes[size].spacing + sizes[size].barHeight) * -1,
        },
      },
    };
  }

  addComponents(hamburgers);
};
