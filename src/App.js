import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Timetable from "./components/Timetable";
import Students from './components/Students'; 
import StudentDashboard from "./components/students/StudentDashboard";
import Faculty from './components/Faculty';
import FacultyDashboard from "./components/faculty/FacultyDashboard";
import FacultyAttendance from "./components/faculty/FacultyAttendance";
import MarkAttendance from "./components/students/MarkAttendance";
import MyTimetable from "./components/faculty/MyTimetable";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import '@fortawesome/fontawesome-free/css/all.min.css';
//import 'bootstrap/dist/css/bootstrap.min.css';
//import 'bootstrap/dist/js/bootstrap.bundle.min';
//import "bootstrap-icons/font/bootstrap-icons.css";
const App = () => {
    return (
        
            <Router>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    
                    {/* Student Routes */}
                    <Route path="/students" element={<Students />} />
                    <Route path="/student-dashboard" element={<StudentDashboard />} />
                    <Route path="/mark-attendance" element={<MarkAttendance />} />
                    
                    {/* Faculty Routes */}
                    <Route path="/faculty" element={<Faculty />} />
                    <Route path="/faculty-dashboard" element={<FacultyDashboard />} />
                    <Route path="/faculty-attendance" element={<FacultyAttendance />} />
                    
                    {/* Common Routes */}
                    <Route path="/timetable" element={<Timetable />} />
                    <Route path="/my-timetable" element={<MyTimetable />} />
                    <Route path="/view-attendance" element={<h1>View Attendance Page</h1>} />
                </Routes>
            </Router>
        
    );
};

export default App;