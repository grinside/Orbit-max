import { useState, useRef, useEffect } from "react";
import { ChevronUp, ChevronDown, Home, Users, Radio, Search } from "lucide-react";
import Hls from "hls.js";
import { useSwipeable } from "react-swipeable";

const videos = [
  "https://dchiplr12yf4h.cloudfront.net/vizion-r/zylo/cine-nanar/index.m3u8",
  "https://dchiplr12yf4h.cloudfront.net/vizion-r/zylo/scream-in/index.m3u8",
  "https://dchiplr12yf4h.cloudfront.net/33diffmedia/bblack-africa/index.m3u8"
];

export default function OrbitMaxPlayer() {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const videoRef = useRef(null);
  
  useEffect(() => {
    if (videoRef.current) {
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(videos[currentVideoIndex]);
        hls.attachMedia(videoRef.current);
      } else if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
        videoRef.current.src = videos[currentVideoIndex];
      }
    }
  }, [currentVideoIndex]);

  const handlers = useSwipeable({
    onSwipedUp: () => setCurrentVideoIndex((prev) => (prev + 1) % videos.length),
    onSwipedDown: () => setCurrentVideoIndex((prev) => (prev - 1 + videos.length) % videos.length),
    trackTouch: true,
    trackMouse: false,
  });

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      videoRef.current.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <div {...handlers} className="relative w-screen h-screen overflow-hidden">
      <video
        ref={videoRef}
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        loop
        playsInline
        onDoubleClick={toggleFullScreen}
      ></video>

      <div className="absolute bottom-4 left-0 right-0 flex justify-around text-white text-sm bg-black/50 py-2">
        <div className="flex flex-col items-center">
          <Home size={24} />
          <span>Accueil</span>
        </div>
        <div className="flex flex-col items-center">
          <Users size={24} />
          <span>Amis</span>
        </div>
        <div className="flex flex-col items-center">
          <Radio size={24} />
          <span>Live</span>
        </div>
        <div className="flex flex-col items-center">
          <Search size={24} />
          <span>Recherche</span>
        </div>
      </div>
    </div>
  );
}
