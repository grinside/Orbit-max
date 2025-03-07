import { useEffect, useRef } from 'react';
import Hls from 'hls.js';

const videosData = [
  { id: 1, src: 'https://dchiplr12yf4h.cloudfront.net/vizion-r/zylo/cine-nanar/index.m3u8', title: 'Live Channel 1', description: 'Description Live Channel 1' },
  { id: 2, src: 'https://dchiplr12yf4h.cloudfront.net/vizion-r/zylo/scream-in/index.m3u8', title: 'Live Channel 2', description: 'Description Live Channel 2' },
  { id: 3, src: 'https://dchiplr12yf4h.cloudfront.net/33diffmedia/bblack-africa/index.m3u8', title: 'Live Channel 3', description: 'Description Live Channel 3' },
];

export default function OrbitMaxPlayer() {
  const videoRef = useRef(null);
  const [currentVideo, setCurrentVideo] = useState(0);

  useEffect(() => {
    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(videosData[currentVideo].src);
      hls.attachMedia(videoRef.current);
      videoRef.current.play();
    }
  }, [currentVideo]);

  const handleNextVideo = () => {
    setCurrentVideo((prev) => (prev + 1) % videosData.length);
  };

  return (
    <div className="h-screen w-screen overflow-hidden relative bg-black">
      <video
        ref={videoRef}
        className="h-full w-full object-cover"
        loop
        muted
        autoPlay
        playsInline
      ></video>

      <div className="absolute bottom-10 left-4 text-white z-10">
        <h2 className="text-xl font-bold">{videosData[currentVideo].title}</h2>
        <p className="text-sm opacity-80">{videosData[currentVideo].description}</p>
      </div>

      <div className="absolute bottom-10 right-4 flex flex-col space-y-4 z-10">
        <button onClick={handleNextVideo} className="bg-white text-black p-2 rounded-full">
          Next
        </button>
      </div>

      <div
        onClick={handleNextVideo}
        className="absolute inset-0 z-20"
        style={{ background: 'rgba(0,0,0,0)' }}
      ></div>
    </div>
  );
}
