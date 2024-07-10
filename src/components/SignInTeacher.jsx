import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignInTeacher = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://lms-backend-1-xmc6.onrender.com/teachers/teacher_login', {
        email,
        password,
      });

      if (response.data.success) {
        // Redirect to TeacherLand component with the teacher ID
        toast.success("Login successful!");
        navigate(`/teacher-land/${response.data.teacherId}`);
    
      } else {
        // Handle unsuccessful login, show an error message or take appropriate action
        toast.error("Login failed. Invalid email or password.");
      }
    } catch (error) {
      // Handle errors, including 401 status
      toast.error("Login failed. Invalid email or password.");
      console.error("Error during sign-in", error);
      if (error.response && error.response.status === 401) {
        toast.error("Unauthorized access. Invalid email or password.");
      } else {
        toast.error("An error occurred during login.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-zinc-900 p-6 w-full">
      <div className="card shadow-2xl h-1/2 md:w-1/2 xl:w-1/3 bg-zinc-800 rounded-md">
        <div className="form-container p-6">
          <h2 className="text-white text-xl mb-8">Signin As Instructor</h2>
          <form onSubmit={handleSignin}>
            <input
              className="w-full xl:h-10 md:h-8 rounded-md p-4 mb-5 bg-zinc-600 text-white"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="w-full xl:h-10 md:h-8 rounded-md p-4 mb-5 bg-zinc-600 text-white"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="submit"
              className="bg-orange-500 text-white hover:bg-orange-700 hover:text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full md:w-64"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignInTeacher;
