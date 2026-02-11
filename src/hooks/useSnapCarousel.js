import { animate } from 'framer-motion';

const clamp = (value, min, max) => Math.max(min, Math.min(value, max));

export const useSnapCarousel = ({ cardWidth, gap, itemCount, viewportWidth }) => {
  const totalWidth = itemCount * cardWidth + (itemCount - 1) * gap;
  const maxNegative = Math.min(0, viewportWidth - totalWidth);

  const getSnapX = (currentX) => {
    const stride = cardWidth + gap;
    const rawIndex = Math.round(Math.abs(currentX) / stride);
    const clampedIndex = clamp(rawIndex, 0, itemCount - 1);
    const centered = viewportWidth / 2 - cardWidth / 2 - clampedIndex * stride;
    return clamp(centered, maxNegative, 0);
  };

  const snapTo = (motionValue, x) =>
    animate(motionValue, getSnapX(x), {
      type: 'spring',
      stiffness: 180,
      damping: 28,
      mass: 1.2,
    });

  return {
    maxNegative,
    getSnapX,
    snapTo,
  };
};
