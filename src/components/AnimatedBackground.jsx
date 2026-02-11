import { motion, useMotionTemplate } from 'framer-motion';
import { usePlayer } from '../context/PlayerContext';

const AnimatedBackground = () => {
  const { beatStrength } = usePlayer();

  const gradient = useMotionTemplate`radial-gradient(circle at ${40 + beatStrength * 10}% ${25 + beatStrength * 8}%, rgba(252, 121, 145, 0.7), transparent 35%),
  radial-gradient(circle at ${75 - beatStrength * 6}% ${70 - beatStrength * 5}%, rgba(80, 157, 255, 0.65), transparent 33%),
  radial-gradient(circle at ${20 + beatStrength * 7}% ${80 - beatStrength * 10}%, rgba(255, 195, 124, 0.62), transparent 30%),
  linear-gradient(140deg, #0f1727 0%, #171d31 45%, #0d111f 100%)`;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-0"
      style={{ background: gradient }}
      animate={{ scale: 1 + beatStrength * 0.03 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
    >
      <div className="absolute inset-0 bg-black/20" />
    </motion.div>
  );
};

export default AnimatedBackground;
