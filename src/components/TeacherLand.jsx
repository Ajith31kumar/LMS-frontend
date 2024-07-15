import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TeacherLand = () => {
  const { teacherId } = useParams();
  const [teacherName, setTeacherName] = useState("");
  const [teacherData, setTeacherData] = useState({
    name: "",
    courses: [],
  });

  const fetchTeacherData = async () => {
    try {
      const response = await axios.get(
        `https://lms-backend-1-xmc6.onrender.com/teachers/getTeacherData/${teacherId}`
      );
      setTeacherName(response.data.name);
      setTeacherData({
        name: response.data.name,
        courses: response.data.courses,
      });
      console.log('Teacher Courses:', response.data.courses);
    } catch (error) {
      console.error("Error fetching teacher data", error);
    }
  };

  useEffect(() => {
    fetchTeacherData();
  }, [teacherId]);

  const navigate = useNavigate();

  const handleAddCourse = () => {
    navigate(`/course-create/${teacherId}`);
  };
  

  const handleViewNotes = (courseId) => {
    // Your existing code for viewing notes
  };

  const handleSeeVideos = (courseId) => {
    navigate(`/see-videos/${courseId}`);
  };

  const handleAddVideo = (courseId) => {
    navigate(`/video-page/${courseId}`);
  };

  const handleDeleteCourse = async (courseId) => {
    try {
      await axios.delete(`https://lms-backend-1-xmc6.onrender.com/teachers/deleteCourse/${teacherId}/${courseId}`);
      // After successful deletion, show success toast
      toast.success("Course deleted successfully");
      // Reload the teacher data after deletion
      fetchTeacherData(); // Fetch updated teacher data
    } catch (error) {
      // If deletion fails, show an error toast
      toast.error("Error deleting course");
      console.error("Error deleting course", error);
    }
  };

  return (
    <div className="bg-zinc-900 min-h-screen">
      <nav className="bg-zinc-800 p-4 flex items-center justify-between">
        <div className="flex items-center">
          <div className="h-10 w-10 bg-orange-500 rounded-full mr-4"></div>
          <p className="text-white text-xl">
            {teacherName ? `Mr. ${teacherName}` : "Instructor"}
          </p>
        </div>
        <button
          className="bg-orange-500 text-white hover:bg-orange-700 px-4 py-2 rounded focus:outline-none focus:shadow-outline"
          onClick={handleAddCourse}
        >
          Create Course
        </button>
      </nav>

      <div className="container mx-auto p-6">
        <h2 className="text-white text-2xl mb-4">Your Courses</h2>
        {teacherData.courses.length === 0 ? (
          <p className="text-white">No courses yet created.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {teacherData.courses.map((course) => (
              <div
                key={course.id}
                className="bg-zinc-800 p-4 rounded shadow-md relative h-96"
              >
                <div className="mb-4 h-44 bg-gray-700 rounded">
                  <img
                    src={course.coverphoto}
                    alt="Course Thumbnail"
                    className="w-full h-full object-cover rounded"
                  />
                </div>

                <h3 className="text-white text-lg font-semibold mb-2 overflow-hidden overflow-ellipsis whitespace-nowrap">
                  {course.title}
                </h3>
                <p className="text-gray-400 overflow-hidden overflow-ellipsis whitespace-nowrap">
                  {course.description}
                </p>

                <div className="absolute bottom-4 right-4 flex space-x-2">
                  <button
                    className="bg-green-500 text-white hover:bg-green-700 px-2 py-1 rounded focus:outline-none focus:shadow-outline"
                    onClick={() => handleAddVideo(course.id)}
                  >
                    Add Video
                  </button>
                  <button
                    className="bg-blue-500 text-white hover:bg-blue-700 px-2 py-1 rounded focus:outline-none focus:shadow-outline"
                    onClick={() => handleViewNotes(course.id)}
                  >
                    Notes
                  </button>
                  <button
                    className="bg-orange-500 text-white hover:bg-orange-700 px-2 py-1 rounded focus:outline-none focus:shadow-outline"
                    onClick={() => handleSeeVideos(course.id)}
                  >
                    See Videos
                  </button>
                  <button
                    className="bg-red-500 text-white hover:bg-red-700 px-2 py-1 rounded focus:outline-none focus:shadow-outline"
                    onClick={() => handleDeleteCourse(course.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Toast container */}
      <ToastContainer />
    </div>
  );
};

export default TeacherLand;
