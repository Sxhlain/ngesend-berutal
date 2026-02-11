import { motion, useMotionValue } from 'framer-motion';
import { useMemo } from 'react';
import { memories } from '../data/playerData';
import { useSnapCarousel } from '../hooks/useSnapCarousel';
import MemorySlideCard from './MemorySlideCard';

const CARD_WIDTH = 220;
const GAP = 18;
const VIEWPORT = 760;

const MemorySlider = () => {
  const x = useMotionValue(0);

  const { maxNegative, snapTo } = useSnapCarousel({
    cardWidth: CARD_WIDTH,
    gap: GAP,
    itemCount: memories.length,
    viewportWidth: VIEWPORT,
  });

  const constraints = useMemo(() => ({ left: maxNegative, right: 0 }), [maxNegative]);

  return (
    <section className="rounded-[2rem] border border-white/20 bg-white/10 p-5 backdrop-blur-liquid backdrop-saturate-[180%]">
      <div className="mb-4 flex items-end justify-between">
        <h2 className="text-xl font-bold tracking-tight text-white">Memories</h2>
        <p className="text-xs uppercase tracking-[0.25em] text-white/50">Liquid slide</p>
      </div>

      <div className="overflow-hidden">
        <motion.div
          drag="x"
          dragConstraints={constraints}
          dragElastic={0.1}
          style={{ x }}
          className="flex cursor-grab gap-[18px] active:cursor-grabbing"
          onDragEnd={(_, info) => snapTo(x, x.get() + info.velocity.x * 0.12)}
          transition={{ type: 'spring', stiffness: 220, damping: 26, mass: 1.25 }}
        >
          {memories.map((item, idx) => (
            <MemorySlideCard
              key={item.id}
              item={item}
              index={idx}
              x={x}
              cardWidth={CARD_WIDTH}
              gap={GAP}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default MemorySlider;
