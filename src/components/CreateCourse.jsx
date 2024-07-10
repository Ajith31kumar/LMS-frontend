import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateCourse = () => {
  const { teacherId } = useParams();

  // State variables
  const [courseTitle, setCourseTitle] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [courseThumbnail, setCourseCoverPhoto ] = useState("");

  const handleCreateCourse = async (e) => {
    e.preventDefault();
  
    try {
      // Add the teacherId to the course data
      const requestData = {
        title: courseTitle,
        description: courseDescription,
        coverphoto: courseThumbnail,
      };
  
      console.log("Data being sent to the server:", requestData);
  
      const response = await axios.post(`https://lms-backend-1-xmc6.onrender.com/courses/create-course/${teacherId}`, requestData);
  
      console.log("Full response from the server:", response); // Log the full response
  
      console.log("Course created:", response.data);
  
      // Handle success, e.g., redirect to the teacher's landing page or show a success toast
      toast.success("Course created successfully!");
    } catch (error) {
      console.error("Error creating course", error);
      // Handle errors, e.g., show an error toast
      toast.error("Error creating course");
    }
  };

  return (
    <div className="bg-zinc-900 min-h-screen">
      <nav className="bg-zinc-800 p-4 flex items-center justify-between">
        <div className="flex items-center">
          <div className="xl:h-10 xl:w-10 h-8 w-8 bg-orange-500 rounded-full mr-4"></div>
          <p className="text-white text-xl">Instructor Name</p>
        </div>
      </nav>

      <div className="container mx-auto p-6">
        <h2 className="text-white text-2xl mb-14">Create a New Course</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="courseTitle" className="block text-white xl:text-xl text-sm font-semibold mb-2">
              Course Title
            </label>
            <input
              type="text"
              id="courseTitle"
              className="w-full px-4 py-2 border rounded-md bg-zinc-800 text-white"
              placeholder="Enter the course title"
              value={courseTitle}
              onChange={(e) => setCourseTitle(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="courseDescription" className="block text-white xl:text-xl text-sm font-semibold mb-2">
              Course Description
            </label>
            <textarea
              id="courseDescription"
              className="w-full px-4 py-2 border rounded-md bg-zinc-800 text-white"
              placeholder="Enter the course description"
              rows="4"
              value={courseDescription}
              onChange={(e) => setCourseDescription(e.target.value)}
            ></textarea>
          </div>

          <div className="mb-4">
            <label htmlFor="courseThumbnail" className="block text-white xl:text-xl text-sm font-semibold mb-2">
              Course CoverPhoto URL
            </label>
            <input
              type="text"
              id="courseThumbnail"
              className="w-full px-4 py-2 border rounded-md bg-zinc-800 text-white"
              placeholder="Enter the course thumbnail URL"
              value={courseThumbnail}
              onChange={(e) => setCourseCoverPhoto(e.target.value)}
            />
          </div>

          <div className="flex justify-end mt-8">
            <button
              type="button"
              className="bg-orange-500 text-white hover:bg-orange-700 px-4 py-2 rounded focus:outline-none focus:shadow-outline"
              onClick={handleCreateCourse}
            >
              Create Course
            </button>
          </div>
        </form>
      </div>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
    </div>
  );
};

export default CreateCourse;
