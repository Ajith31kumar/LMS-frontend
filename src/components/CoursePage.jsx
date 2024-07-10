import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CoursePage() {
  const { courseId } = useParams();
  const [videoDetails, setVideoDetails] = useState({
    title: '',
    url: '',
  });

  const handleAddVideoToCourse = async () => {
    try {
      const response = await axios.post(`https://lms-backend-1-xmc6.onrender.com/addvideo/${courseId}`, videoDetails);
      console.log('Video added to course:', response.data);
      toast.success('Video added successfully!');
    } catch (error) {
      console.error('Error adding video to course', error);
      toast.error('Error adding video. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-zinc-900 p-6 ">
      <div className="card shadow-xl h-full md:w-1/2 xl:w-2/3 bg-zinc-800 rounded-md shadow-zinc-600">
        <div className="form-container p-6">
          <h2 className="text-white text-xl mb-4">Add Video to Course</h2>
          <div className="mb-4">
            <label htmlFor="videoTitle" className="block text-orange-500 text-lg font-bold mb-2">
              Video Title
            </label>
            <input
              type="text"
              id="videoTitle"
              placeholder='Video Title'
              className="w-full px-4 py-2 border text-white rounded-md bg-zinc-700"
              value={videoDetails.title}
              onChange={(e) => setVideoDetails({ ...videoDetails, title: e.target.value })}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="videoUrl" className="block text-orange-500 text-lg font-bold mb-2">
              Video URL
            </label>
            <input
              type="text"
              id="videoUrl"
              placeholder='Video URL'
              className="w-full px-4 py-2 border text-white rounded-md bg-zinc-700"
              value={videoDetails.url}
              onChange={(e) => setVideoDetails({ ...videoDetails, url: e.target.value })}
            />
          </div>
          <button
            onClick={handleAddVideoToCourse}
            className="bg-orange-500 text-white hover:bg-orange-700 px-4 py-2 rounded focus:outline-none focus:shadow-outline w-full md:w-64"
          >
            Add Video
          </button>
        </div>
      </div>
      <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar={false}  />
    </div>
  );
}

export default CoursePage;