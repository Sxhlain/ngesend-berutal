import { motion, useTransform } from 'framer-motion';

const MemorySlideCard = ({ item, index, x, cardWidth, gap }) => {
  const start = -index * (cardWidth + gap) - 240;
  const end = -index * (cardWidth + gap) + 240;
  const imgX = useTransform(x, [start, end], [-20, 20]);

  return (
    <article className="relative h-[250px] w-[220px] shrink-0 overflow-hidden rounded-3xl border border-white/20 bg-black/20">
      <motion.img
        src={item.image}
        alt={item.title}
        style={{ x: imgX }}
        className="h-full w-[115%] max-w-none object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent" />
      <div className="absolute bottom-0 p-4">
        <p className="text-sm font-bold text-white">{item.title}</p>
        <p className="text-xs text-white/70">{item.subtitle}</p>
      </div>
    </article>
  );
};

export default MemorySlideCard;
