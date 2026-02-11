import { AnimatePresence, motion } from 'framer-motion';
import { usePlayer } from '../context/PlayerContext';

const iconButtonTap = { scale: 0.9, rotate: -4 };

const LiquidPlayerBar = () => {
  const {
    song,
    isPlaying,
    togglePlay,
    isExpanded,
    setIsExpanded,
    currentTime,
    duration,
    seek,
    beatStrength,
  } = usePlayer();

  const progress = duration ? (currentTime / duration) * 100 : 0;

  return (
    <>
      <motion.button
        layoutId="player-shell"
        onClick={() => setIsExpanded(true)}
        className="fixed bottom-5 left-1/2 z-40 flex w-[min(920px,calc(100vw-2rem))] -translate-x-1/2 items-center gap-4 rounded-3xl border border-white/20 bg-white/10 p-3 text-left backdrop-blur-liquid backdrop-saturate-[180%]"
      >
        <motion.img layoutId="cover-art" src={song.art} alt={song.title} className="h-14 w-14 rounded-2xl object-cover" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-bold tracking-tight text-white">{song.title}</p>
          <p className="truncate text-xs text-white/65">{song.artist}</p>
        </div>
        <motion.button
          whileTap={iconButtonTap}
          transition={{ type: 'spring', stiffness: 500, damping: 20 }}
          onClick={(e) => {
            e.stopPropagation();
            togglePlay();
          }}
          className="rounded-full border border-white/20 bg-white/15 px-4 py-2 text-xs font-semibold text-white"
        >
          {isPlaying ? 'Pause' : 'Play'}
        </motion.button>
      </motion.button>

      <AnimatePresence>
        {isExpanded && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/50"
              onClick={() => setIsExpanded(false)}
            />
            <motion.div
              layoutId="player-shell"
              className="fixed inset-x-4 bottom-4 top-4 z-50 overflow-auto rounded-[2.5rem] border border-white/25 bg-white/10 p-6 backdrop-blur-liquid backdrop-saturate-[180%] md:inset-x-20"
            >
              <div className="mx-auto flex max-w-4xl flex-col gap-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.25em] text-white/60">Now Playing</p>
                    <h2 className="text-3xl font-bold tracking-tight text-white">{song.title}</h2>
                    <p className="text-sm text-white/70">{song.artist} · {song.album}</p>
                  </div>
                  <button
                    onClick={() => setIsExpanded(false)}
                    className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm text-white"
                  >
                    Done
                  </button>
                </div>

                <motion.img
                  layoutId="cover-art"
                  src={song.art}
                  alt={song.title}
                  className="mx-auto h-64 w-64 rounded-[2rem] object-cover"
                  animate={{
                    boxShadow: `0 0 ${38 + beatStrength * 35}px ${song.dominantColor}`,
                    scale: 1 + beatStrength * 0.015,
                  }}
                  transition={{ type: 'spring', stiffness: 140, damping: 24 }}
                />

                <div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-white/20">
                    <motion.div
                      className="h-full rounded-full bg-white"
                      animate={{ width: `${progress}%` }}
                      transition={{ type: 'spring', stiffness: 120, damping: 30 }}
                    />
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={duration || 0}
                    value={currentTime}
                    onChange={(e) => seek(Number(e.target.value))}
                    className="mt-3 w-full accent-white"
                  />
                </div>

                <div className="mx-auto flex items-center gap-5">
                  {['⏮', isPlaying ? '⏸' : '▶', '⏭'].map((symbol, index) => (
                    <motion.button
                      key={symbol}
                      whileTap={{ scale: 0.84, rotate: index === 1 ? 0 : index === 0 ? -6 : 6 }}
                      transition={{ type: 'spring', stiffness: 600, damping: 22 }}
                      onClick={index === 1 ? togglePlay : undefined}
                      className="grid h-14 w-14 place-items-center rounded-full border border-white/25 bg-white/15 text-xl text-white"
                    >
                      {symbol}
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default LiquidPlayerBar;
