// ContentPage.js
import React, { useState, useEffect } from 'react';
import { useParams, Link, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import { FaPlayCircle } from 'react-icons/fa';


function ContentPage() {
  const { courseId } = useParams();
  const [courseDetails, setCourseDetails] = useState({
    title: '',
    description: '',
    coverphoto: '',
    videos: [],
  });

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        // const response = await axios.get(`http://localhost:5000/getCourseDetails/${courseId}`);
        const response = await axios.get(`https://lms-backend-1-xmc6.onrender.com/courses/getCourseDetails/${courseId}`);
        setCourseDetails(response.data);
        console.log({response});
      } catch (error) {
        console.error('Error fetching course details', error);
      }
    };

    fetchCourseDetails();
  }, [courseId]);

  return (
    <div className="container mx-auto min-h-screen p-6">
      <div className=" card shadow-md flex flex-col md:flex-row mb-6 bg-zinc-800 p-8 xl:p-12 rounded-xl">
        <div className="md:w-1/4 md:mr-4 mb-4 md:mb-0 h-40 rounded-md bg-zinc-700">
          {courseDetails.coverphoto && (
            <img src={courseDetails.coverphoto} alt={courseDetails.title} className="w-full h-44 rounded shadow-md" />
          )}
        </div>
        <div className="md:w-3/4">
          <h2 className="text-3xl text-white font-semibold mb-4">{courseDetails.title}</h2>
          <p className="text-white">{courseDetails.description}</p>
        </div>
      </div>

      <div className="flex flex-col ">
        {courseDetails.videos.map((video, index) => (
          <div key={index} className="bg-zinc-800 p-2 flex flex-row rounded-xl shadow-md relative h-22 xl:w-1/2 mt-3 h-20">
            <div className="flex flex-col items-center justify-center w-24 xl:w-36 h-auto bg-zinc-700 rounded">
              {/* Use Link to navigate to the PlayVideo component */}
              <Link to={`/play-video/${encodeURIComponent(video.url)}`}>
                <FaPlayCircle className="text-blue-500 hover:underline text-4xl" />
              </Link>
            </div>
            <div className="flex flex-col items-center justify-center w-full text-white text-2xl h-auto">
              {video.title}
            </div>
          </div>
        ))}
      </div>

   
    </div>
  );
}

export default ContentPage;
