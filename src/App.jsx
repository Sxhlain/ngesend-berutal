import AnimatedBackground from './components/AnimatedBackground';
import LiquidPlayerBar from './components/LiquidPlayerBar';
import MusicPlayer from './components/MusicPlayer';
import { PlayerProvider } from './context/PlayerContext';

function App() {
  return (
    <PlayerProvider>
      <div className="relative min-h-screen overflow-hidden bg-[#060b16] font-sans">
        <AnimatedBackground />
        <MusicPlayer />
        <LiquidPlayerBar />
      </div>
    </PlayerProvider>
  );
}

export default App;
