import { motion } from 'framer-motion';
import { usePlayer } from '../context/PlayerContext';
import LyricsView from './LyricsView';
import MemorySlider from './MemorySlider';

const MusicPlayer = () => {
  const { song } = usePlayer();

  return (
    <main className="relative z-10 mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-6 px-4 pb-32 pt-8 md:px-8">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="rounded-[2rem] border border-white/20 bg-white/10 p-6 backdrop-blur-liquid backdrop-saturate-[180%]"
      >
        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <img src={song.art} alt={song.title} className="h-28 w-28 rounded-3xl object-cover" />
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-white/60">iOS 26 Edition</p>
            <h1 className="text-4xl font-extrabold tracking-tight text-white">Liquid Glass Player</h1>
            <p className="text-sm text-white/70">A premium Apple Music inspired experience with fluid motion physics.</p>
          </div>
        </div>
      </motion.section>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <LyricsView />
        <MemorySlider />
      </div>
    </main>
  );
};

export default MusicPlayer;
