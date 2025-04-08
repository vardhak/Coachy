import { useEffect, useState } from "react";
import axios from "axios";

const VideoGallery = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get("http://localhost:3000/videos/class1");
        setVideos(res.data);
      } catch (err) {
        console.error("Failed to fetch videos:", err);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div className="video-gallery">
      <h2>Uploaded Videos</h2>
      {videos.length === 0 ? (
        <p>No videos uploaded yet.</p>
      ) : (
        <div className="video-grid">
          {videos.map((video) => (
            <div key={video._id} className="video-card">
              <h4>{video.title}</h4>
              <video
                src={video.videoUrl}
                controls
                width="50%"
                preload="metadata"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VideoGallery;
