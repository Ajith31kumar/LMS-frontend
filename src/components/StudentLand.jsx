import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const StudentLand = () => {
  const { studentId } = useParams();
  const navigate = useNavigate(); // Add this line
  const [student, setStudent] = useState(null);
  const [courses, setCourses] = useState([]);
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch student data
        const studentResponse = await axios.get(`https://lms-backend-1-xmc6.onrender.com/students/getStudentData/${studentId}`);
        setStudent(studentResponse.data);

        // Fetch all courses
        const coursesResponse = await axios.get('https://lms-backend-1-xmc6.onrender.com/courses/getallcourses');
        console.log({coursesResponse});
        setCourses(coursesResponse.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, [studentId]);

  const enrollInCourse = async (courseId) => {
    try {
      const response = await axios.post(`https://lms-backend-1-xmc6.onrender.com/students/enroll-course/${studentId}/${courseId}`);
      toast.success("Course successfully enrolled")
      console.log(response.data); // Log the response for debugging
      // Optionally, show a toast or update the UI to indicate successful enrollment
    } catch (error) {
      toast.error("Course already enrolled")
      console.error("Error during enrollment", error);
      // Optionally, show a toast or update the UI to indicate failed enrollment
    }
  };

  // Function to handle the click event of the "Enrolled Courses" button
  const viewEnrolledCourses = () => {
    navigate(`/enrolled-courses/${studentId}`);
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const closeSidebar = () => {
    setShowSidebar(false);
  };

  const handleSendToNextPage = (courseId) => {
    console.log(`Send to next page with Course ID: ${courseId}`);
  };

  return (
    <div className="bg-zinc-900 min-h-screen flex flex-col">
      <nav className="bg-zinc-800 p-4 flex items-center justify-between">
        <div className="flex items-center">
          <div className="xl:h-10 xl:w-10 h-8 w-8 bg-orange-500 rounded-full mr-4"></div>
          {student ? (
            <p className="text-white md:text-md sm:text-sm xl:text-xl">Welcome, {student.username}</p>
          ) : (
            <p>Loading...</p>
          )}
        </div>

        <div className="lg:hidden">
          <button className="text-white focus:outline-none" onClick={toggleSidebar}>
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>
        <div className={`lg:hidden fixed top-0 right-0 h-96 w-64 bg-zinc-800 transform ${showSidebar ? 'translate-x-0' : 'translate-x-full'} transition-transform ease-in-out duration-300`}>
          <div className="p-4 flex  justify-between items-center">
            <div className=" mt-20 ml-4 text-lg">
              <p className="block text-white hover:text-orange-500 cursor-pointer" onClick={viewEnrolledCourses}>
                My Courses
             </p>

              <Link to="/about-us" className="block text-white hover:text-orange-500">
                About Us
              </Link>
            </div>
            <button className="text-white focus:outline-none -mt-24" onClick={closeSidebar}>
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>
        </div>
        <div className="hidden lg:flex">
          <button onClick={viewEnrolledCourses} className="bg-orange-500 text-white hover:bg-orange-700 px-4 py-2 rounded focus:outline-none focus:shadow-outline">
            My Courses
          </button>
        </div>
      </nav>

      <div className="container mx-auto p-6">
        <div className="card rounded-md shadow-lg shadow-gray-700 bg-zinc-800 p-5 mb-10 flex flex-col items-center xl:flex-row xl:justify-between">
          <div className="xl:w-2/3 w-full xl:mb-0 mb-6 ">
            <p className="text-orange-500 xl:-ml-0 md:text-xl sm:text-md xl:text-3xl mb-4">Explore the Trending Courses</p>
            <p className="text-white md:text-md sm:text-52 xl:text-xl">
              Welcome to our Learning Management System dashboard! Your gateway to a world of knowledge awaits. Navigate seamlessly through your courses, track your progress, and stay connected with your learning community. Explore interactive content, engage in discussions, and access resources tailored to enhance your educational journey.
            </p>
          </div>
          <div className="xl:w-1/3 w-full xl:mb-0 mb-6 xl:ml-6 flex  justify-center ">
            <img src='https://cdn-icons-png.flaticon.com/256/10984/10984287.png' className="xl:h-64 xl:w-64 md:h-44 md:w-44 h-28 w-28" alt="Course Image"></img>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {courses.map((course) => (
            <div key={course.id} className="bg-zinc-800 p-4 rounded shadow-md relative h-96">
              {/* Thumbnail */}
              <div className="mb-4 h-44 bg-zinc-700 rounded">
              <img
                    src={course.coverphoto}
                    alt="Course Thumbnail"
                    className="w-full h-full object-cover rounded"
                  />
              </div>

              <h3 className="text-white text-lg font-semibold mb-2 overflow-hidden overflow-ellipsis whitespace-nowrap">{course.title}</h3>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Teacher: {course.teacher.username}</p>
              <p className="text-gray-400 overflow-hidden overflow-ellipsis whitespace-nowrap">{course.description}</p>

              <div className="absolute bottom-4 right-4 flex space-x-2">
                <button className="bg-orange-500 text-white hover:bg-orange-700 px-2 py-1 rounded focus:outline-none focus:shadow-outline" onClick={() => enrollInCourse(course._id)}>Enroll</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
    </div>
    
  );
};

export default StudentLand;
