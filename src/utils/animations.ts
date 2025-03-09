
export const fadeInUp = {
  hidden: {
    y: 20,
    opacity: 0
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

export const staggerContainer = (staggerChildren: number, delayChildren: number = 0) => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren,
      delayChildren
    }
  }
});

export const slideIn = (direction: 'left' | 'right' | 'up' | 'down', type: string, delay: number, duration: number) => ({
  hidden: {
    x: direction === 'left' ? '-100%' : direction === 'right' ? '100%' : 0,
    y: direction === 'up' ? '100%' : direction === 'down' ? '-100%' : 0,
    opacity: 0
  },
  visible: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: {
      type,
      delay,
      duration,
      ease: 'easeOut'
    }
  }
});

export const scaleIn = (delay: number = 0, duration: number = 0.5) => ({
  hidden: {
    scale: 0.9,
    opacity: 0
  },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      delay,
      duration,
      ease: [0.22, 1, 0.36, 1]
    }
  }
});

export const appear = (delay: number = 0, duration: number = 0.5) => ({
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1,
    transition: {
      delay,
      duration
    }
  }
});

export const blurIn = (delay: number = 0, duration: number = 0.8) => ({
  hidden: {
    filter: 'blur(10px)',
    opacity: 0
  },
  visible: {
    filter: 'blur(0px)',
    opacity: 1,
    transition: {
      delay,
      duration,
      ease: [0.22, 1, 0.36, 1]
    }
  }
});

export const pulseAnimate = {
  initial: {
    scale: 1
  },
  animate: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      repeatType: 'loop'
    }
  }
};

export const floatAnimation = {
  initial: {
    y: 0
  },
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      repeatType: 'loop',
      ease: "easeInOut"
    }
  }
};
