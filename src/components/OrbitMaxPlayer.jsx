import { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import { Home, Users, Radio, Search } from 'lucide-react';

const videosData = [
  { id: 1, src: 'https://dchiplr12yf4h.cloudfront.net/vizion-r/zylo/cine-nanar/index.m3u8', title: 'Live Channel 1', description: 'Description Live Channel 1' },
  { id: 2, src: 'https://dchiplr12yf4h.cloudfront.net/vizion-r/zylo/scream-in/index.m3u8', title: 'Live Channel 2', description: 'Description Live Channel 2' },
  { id: 3, src: 'https://dchiplr12yf4h.cloudfront.net/33diffmedia/bblack-africa/index.m3u8', title: 'Live Channel 3', description: 'Description Live Channel 3' },
];

export default function OrbitMaxPlayer() {
  const videoRef = useRef(null);
  const touchStartY = useRef(0);
  const [currentVideo, setCurrentVideo] = useState(0);

  useEffect(() => {
    if (videoRef.current && Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(videosData[currentVideo].src);
      hls.attachMedia(videoRef.current);
      videoRef.current.play();
    }
  }, [currentVideo]);

  const handleSwipe = (startY, endY) => {
    if (startY - endY > 50) {
      setCurrentVideo((prev) => (prev + 1) % videosData.length);
    }
    if (endY - startY > 50) {
      setCurrentVideo((prev) => (prev - 1 + videosData.length) % videosData.length);
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      videoRef.current.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <div
      className="fixed inset-0 overflow-hidden bg-black"
      onTouchStart={(e) => (touchStartY.current = e.changedTouches[0].screenY)}
      onTouchEnd={(e) => handleSwipe(touchStartY.current, e.changedTouches[0].screenY)}
      onDoubleClick={toggleFullscreen}
    >
      <video
        key={currentVideo}
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ pointerEvents: 'none' }}
        loop
        muted
        autoPlay
        playsInline
      ></video>

      <div className="absolute bottom-10 left-4 text-white z-10">
        <h2 className="text-xl font-bold">{videosData[currentVideo].title}</h2>
        <p className="text-sm opacity-80">{videosData[currentVideo].description}</p>
      </div>

      <footer className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 py-2 flex justify-around text-white z-20">
        <button className="flex flex-col items-center">
          <Home size={24} />
          <span className="text-xs">Accueil</span>
        </button>
        <button className="flex flex-col items-center">
          <Users size={24} />
          <span className="text-xs">Amis</span>
        </button>
        <button className="flex flex-col items-center">
          <Radio size={24} />
          <span className="text-xs">Live</span>
        </button>
        <button className="flex flex-col items-center">
          <Search size={24} />
          <span className="text-xs">Recherche</span>
        </button>
      </footer>
    </div>
  );
}