// PlayVideo.js
import React from 'react';
import { useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';

function PlayVideo() {
  const { videoUrl } = useParams();

  return (
    <div className="container mx-auto min-h-screen p-6">
      <div className="flex justify-center items-center h-screen">
        <ReactPlayer
          url={videoUrl}
          controls={true}
          width="100%"
          height="100%"
          style={{ maxHeight: '80vh' }}
        />
      </div>
    </div>
  );
}

export default PlayVideo;
