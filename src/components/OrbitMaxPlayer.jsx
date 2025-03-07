import { useEffect, useRef } from 'react';
import Hls from 'hls.js';

const videosData = [
  { id: 1, src: 'https://example.com/stream1.m3u8', title: 'Live Channel 1', description: 'Description Live Channel 1' },
  { id: 2, src: 'https://example.com/stream2.m3u8', title: 'Live Channel 2', description: 'Description Live Channel 2' },
  { id: 3, src: 'https://example.com/stream3.m3u8', title: 'Live Channel 3', description: 'Description Live Channel 3' },
];

export default function OrbitMaxPlayer() {
  const videoRefs = useRef([]);
  const bgVideoRefs = useRef([]);

  useEffect(() => {
    videosData.forEach((video, index) => {
      if (Hls.isSupported()) {
        const hlsMain = new Hls();
        hlsMain.loadSource(video.src);
        hlsMain.attachMedia(videoRefs.current[index]);

        const hlsBg = new Hls();
        hlsBg.loadSource(video.src);
        hlsBg.attachMedia(bgVideoRefs.current[index]);
      }
    });
  }, []);

  const handleScroll = (e) => {
    const { scrollTop, clientHeight } = e.target;
    videoRefs.current.forEach((video, index) => {
      const offsetTop = video.parentElement.offsetTop;
      if (scrollTop >= offsetTop - clientHeight / 2 && scrollTop < offsetTop + clientHeight - clientHeight / 2) {
        video.play();
        bgVideoRefs.current[index].play();
      } else {
        video.pause();
        bgVideoRefs.current[index].pause();
      }
    });
  };

  return (
    <div className="h-screen w-screen overflow-y-scroll snap-y snap-mandatory" onScroll={handleScroll}>
      {videosData.map((video, index) => (
        <div key={video.id} className="snap-start video-container h-screen w-screen relative overflow-hidden">
          <video
            ref={el => bgVideoRefs.current[index] = el}
            className="absolute inset-0 h-full w-full object-cover blur-xl scale-150 opacity-60"
            loop
            muted
          ></video>
          <video
            ref={el => videoRefs.current[index] = el}
            className="absolute inset-0 h-full w-full object-cover"
            style={{ objectFit: 'cover', objectPosition: 'center' }}
            loop
            muted
            controls
          ></video>
          <div className="absolute bottom-10 left-4 text-white z-10">
            <h2 className="text-xl font-bold">{video.title}</h2>
            <p className="text-sm opacity-80">{video.description}</p>
          </div>
          <div className="absolute bottom-10 right-4 flex flex-col space-y-4 z-10">
            <button className="bg-white text-black p-2 rounded-full">Play/Pause</button>
            <button className="bg-white text-black p-2 rounded-full">Info</button>
            <button className="bg-white text-black p-2 rounded-full">Share</button>
          </div>
        </div>
      ))}
    </div>
  );
}
