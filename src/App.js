import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Timetable from "./components/Timetable";  // ✅ Correct Import
import Students from './components/Students'; 
import StudentDashboard from "./components/StudentDashboard";
import Attendance from "./components/Attendance";
import AttendanceDashboard from "./components/AttendanceDashboard";
import Faculty from './components/Faculty';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import "bootstrap-icons/font/bootstrap-icons.css";
const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/students" element={<Students />} />
                <Route path="/faculty" element={<Faculty />} />
                <Route path="/attendance" element={<h1>Attendance Page</h1>} />
                <Route path="/view-attendance" element={<h1>View Attendance Page</h1>} />
                <Route path="/timetable" element={<Timetable />} /> 
                <Route path="/student/:id" element={<StudentDashboard />} />
            </Routes>
        </Router>
    );
};

export default App;
