import './App.css';
import { HashRouter,Routes,Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import RegisterPage from './components/RegisterPage';
import SignInStudent from './components/SignInStudent';
import SignInTeacher from './components/SignInTeacher';
import StudentLand from './components/StudentLand';
import TeacherLand from './components/TeacherLand';
import CreateCourse from './components/CreateCourse';
import CoursePage from './components/CoursePage';
import ContentPage from './components/ContentPage';
import PlayVideo from './components/PlayVidoe';

import Studentenrolled from './components/StudentEnrolled';


//page routes



function App() {
  return (
    <div className="App bg-zinc-900 ">
       <HashRouter>
        <Routes>
          <Route path="/" element={<LandingPage/>}/>
          <Route path="/register-student" element={<RegisterPage/>}/>
          <Route path="/open-student" element={<SignInStudent/>}/>
          <Route path="/open-teacher" element={<SignInTeacher/>}/>
          <Route path="/student-land/:studentId" element={<StudentLand/>}/>
          <Route path="/teacher-land/:teacherId" element={<TeacherLand />} />
          <Route path="/course-create/:teacherId" element={<CreateCourse/>}/>
          <Route path="/video-page/:courseId" element={<CoursePage/>}/>
          <Route path= "see-videos/:courseId" element={<ContentPage/>}/>
          <Route path="/play-video/:videoUrl" element={<PlayVideo/>} />
          <Route path="/enrolled-courses/:studentId" element={<Studentenrolled/>}/>
        </Routes>
      </HashRouter>
      
      
    </div>
  );
}

export default App;