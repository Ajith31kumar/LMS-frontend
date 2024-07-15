import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [isStudentFormOpen, setStudentFormOpen] = useState(true);
  const [isTeacherFormOpen, setTeacherFormOpen] = useState(false);
  const [studentname, setStudentName] = useState("");
  const [studentemail, setStudentEmail] = useState("");
  const [studentpass, setStudentPass] = useState("");
  const [teachername, setTeacherName] = useState("");
  const [teacheremail, setTeacherEmail] = useState("");
  const [teacherpass, setTeacherPass] = useState("");
  const [teacherqualification, setTeacherQualification] = useState("");
  const navigate = useNavigate(); // Hook to navigate programmatically

  const openStudentForm = () => {
    setStudentFormOpen(true);
    setTeacherFormOpen(false);
  };

  const openTeacherForm = () => {
    setTeacherFormOpen(true);
    setStudentFormOpen(false);
  };

  const handleStudentSubmit = (event) => {
    event.preventDefault();
    const data = {
      username: studentname,
      email: studentemail,
      password: studentpass,
    };

    axios.post("https://lms-backend-1-xmc6.onrender.com/students/student_add", data)
      .then((res) => {
        if (res.status === 201) {
          navigate("/open-student"); // Navigate to the student page
        } else {
          return Promise.reject();
        }
      })
      .catch((err) => {
        alert(err);
      });
  };

  const handleTeacherSubmit = (event) => {
    event.preventDefault();
    const data = {
      username: teachername,
      email: teacheremail,
      password: teacherpass,
      highestQualification: teacherqualification,
    };

    axios.post("https://lms-backend-1-xmc6.onrender.com/teachers/teacher_add", data)
      .then((res) => {
        if (res.status === 201) {
          navigate("/open-teacher"); // Navigate to the teacher page
        } else {
          return Promise.reject();
        }
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-zinc-900 p-6">
      <div className="card shadow-2xl h-1/2 md:w-1/2 xl:w-1/3 bg-zinc-800">
        <div className="w-full">
          <button onClick={openStudentForm} className="active:bg-zinc-900 h-14 w-1/2 border-2 text-white border-zinc-900 text-center xl:text-2xl md:text-xl">
            Student Registration
          </button>
          <button onClick={openTeacherForm} className="active:bg-zinc-900 h-14 w-1/2 border-2 text-white border-zinc-900 text-center xl:text-2xl md:text-xl">
            Teacher Registration
          </button>
        </div>
        <div className="form-container p-6">
          {isStudentFormOpen && (
            <div className="form student-form">
              <h2 className="text-white text-md mb-8">Student Registration</h2>
              <form onSubmit={handleStudentSubmit}>
                <input className="w-full xl:h-10 md:h-8 rounded-md p-4 mb-7 bg-zinc-600 text-white" onChange={(event) => setStudentName(event.target.value)} type="text" placeholder="Username" />
                <input className="w-full xl:h-10 md:h-8 rounded-md p-4 mb-7 bg-zinc-600 text-white" onChange={(event) => setStudentEmail(event.target.value)} type="email" placeholder="Email" />
                <input className="w-full xl:h-10 md:h-8 rounded-md p-4 mb-7 bg-zinc-600 text-white" onChange={(event) => setStudentPass(event.target.value)} type="password" placeholder="Password" />
                <button type="submit" className="bg-orange-500 text-white hover:bg-orange-700 hover:text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full md:w-64">SignUp as Student</button>
              </form>
            </div>
          )}
          {isTeacherFormOpen && (
            <div className="form teacher-form">
              <h2 className="text-white text-md mb-8">Teacher Registration</h2>
              <form onSubmit={handleTeacherSubmit}>
                <input className="w-full xl:h-10 md:h-8 rounded-md p-4 mb-5 bg-zinc-600 text-white" onChange={(event) => setTeacherName(event.target.value)} type="text" placeholder="Username" />
                <input className="w-full xl:h-10 md:h-8 rounded-md p-4 mb-5 bg-zinc-600 text-white" onChange={(event) => setTeacherEmail(event.target.value)} type="email" placeholder="Email" />
                <input className="w-full xl:h-10 md:h-8 rounded-md p-4 mb-5 bg-zinc-600 text-white" onChange={(event) => setTeacherPass(event.target.value)} type="password" placeholder="Password" />
                <input className="w-full xl:h-10 md:h-8 rounded-md p-4 mb-5 bg-zinc-600 text-white" onChange={(event) => setTeacherQualification(event.target.value)} type="text" placeholder="Qualification" />
                <button type="submit" className="bg-orange-500 text-white hover:bg-orange-700 mt-10 hover:text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full md:w-64">SignUp as Instructor</button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
