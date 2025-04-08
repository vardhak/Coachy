import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function CourseDetails() {
    const BASE_URL = import.meta.env.VITE_BASE_URL;

    const { id, std } = useParams(); // expecting route like /course/:std/:id
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchVideos = async () => {
            const standard = std.replace("courses_", ""); // Extract actual standard like '1st'
            try {
                const collectionName = `class_${standard}_lectures`;
                const res = await axios.get(`${BASE_URL}/videos/${collectionName}`);
    
                // Filter videos by courseTitle matching the route ID
                const filteredVideos = res.data.filter(video => video.courseTitle === id);
    
                setVideos(filteredVideos || []);
            } catch (err) {
                console.error('Failed to fetch videos:', err);
                setVideos([]);
            } finally {
                setLoading(false);   
            }
        };
    
        fetchVideos();
    }, [std, id]);
    

    return (
        <div className="pt-20 w-[90%] mx-auto">
            <h1 className="text-3xl font-bold mb-5 text-center">Course Videos</h1>
            {loading ? (
                <p className="text-center text-gray-500">Loading...</p>
            ) : videos.length === 0 ? (
                <p className="text-center text-gray-500">No videos available for this course.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {videos.map((video) => (
                        <div key={video._id} className="border p-4 rounded shadow">
                            <h2 className="text-xl font-semibold mb-2">{video.title}</h2>
                            <video controls className="w-full rounded">
                                <source src={video.videoUrl} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                            <p className="text-sm text-gray-600 mt-2">{video.description}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default CourseDetails;
