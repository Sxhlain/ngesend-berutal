import { AnimatePresence, motion } from 'framer-motion';
import { usePlayer } from '../context/PlayerContext';

const LyricsView = () => {
  const { lyrics, activeLyricIndex, song } = usePlayer();

  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-white/20 bg-white/10 p-6 backdrop-blur-liquid backdrop-saturate-[180%]">
      <div
        className="absolute inset-0 scale-125 bg-cover bg-center opacity-25 blur-2xl"
        style={{ backgroundImage: `url(${song.art})` }}
      />
      <div className="absolute inset-0 bg-black/35" />

      <div className="relative h-[320px] overflow-hidden">
        <motion.div
          animate={{ y: -activeLyricIndex * 56 + 130 }}
          transition={{ type: 'spring', stiffness: 90, damping: 20, mass: 0.9 }}
          className="space-y-3"
        >
          <AnimatePresence initial={false}>
            {lyrics.map((line, index) => {
              const distance = Math.abs(index - activeLyricIndex);
              const isActive = index === activeLyricIndex;
              return (
                <motion.p
                  key={line.time}
                  layout
                  initial={{ opacity: 0, y: 24 }}
                  animate={{
                    opacity: isActive ? 1 : Math.max(0.25, 1 - distance * 0.2),
                    scale: isActive ? 1.09 : Math.max(0.84, 1 - distance * 0.05),
                    filter: isActive ? 'blur(0px)' : `blur(${Math.min(5, distance * 1.1)}px)`,
                    color: isActive ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0.65)',
                  }}
                  transition={{ type: 'spring', stiffness: 130, damping: 22, mass: 0.8 }}
                  className="origin-left text-left text-lg font-semibold leading-tight tracking-tight"
                >
                  {line.text}
                </motion.p>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default LyricsView;
