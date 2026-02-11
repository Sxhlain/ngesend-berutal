import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { lyrics, song } from '../data/playerData';

const PlayerContext = createContext(null);

export const PlayerProvider = ({ children }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeLyricIndex, setActiveLyricIndex] = useState(0);

  useEffect(() => {
    const lyricIndex = lyrics.findLastIndex((line) => currentTime >= line.time);
    setActiveLyricIndex(lyricIndex < 0 ? 0 : lyricIndex);
  }, [currentTime]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onLoaded = () => setDuration(audio.duration || 0);
    const onEnded = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('loadedmetadata', onLoaded);
    audio.addEventListener('ended', onEnded);

    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('loadedmetadata', onLoaded);
      audio.removeEventListener('ended', onEnded);
    };
  }, []);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
      }
    }
  };

  const seek = (time) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Math.max(0, Math.min(time, duration || 0));
    setCurrentTime(audio.currentTime);
  };

  const beatStrength = useMemo(() => {
    if (!isPlaying) return 0.2;
    const phase = Math.sin(currentTime * 2.6);
    return 0.3 + (phase + 1) * 0.35;
  }, [currentTime, isPlaying]);

  const value = {
    song,
    lyrics,
    audioRef,
    isPlaying,
    currentTime,
    duration,
    activeLyricIndex,
    isExpanded,
    beatStrength,
    togglePlay,
    seek,
    setIsExpanded,
  };

  return (
    <PlayerContext.Provider value={value}>
      <audio ref={audioRef} src={song.audio} preload="metadata" />
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error('usePlayer must be used inside PlayerProvider');
  }
  return context;
};
