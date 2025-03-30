import React, { useState } from "react";
import { MapPin, Clock, Camera } from "lucide-react";
import Webcam from "react-webcam";
import { motion } from "framer-motion";
import "./AttendanceDashboard.css";

const AttendanceDashboard = () => {
  const [classStarted, setClassStarted] = useState(false);
  const [attendanceMarked, setAttendanceMarked] = useState(false);

  const startClass = () => {
    setClassStarted(true);
  };

  const markAttendance = () => {
    if (!classStarted) {
      alert("Class has not started yet!");
      return;
    }
    setAttendanceMarked(true);
  };

  return (
    <div className="container attendance-container">
      <motion.h1
        className="dashboard-title"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        🎓 Smart Attendance System
      </motion.h1>

      {/* Faculty Location & Start Class Button */}
      <motion.div
        className="card location-card"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="card-body">
          <div className="location-info">
            <MapPin className="location-icon" />
            <span className="location-text">Faculty Location: Live</span>
          </div>
          <button 
            onClick={startClass} 
            disabled={classStarted}
            className={`btn ${classStarted ? 'btn-success' : 'btn-primary'} start-class-btn`}
          >
            {classStarted ? "Class Started ✅" : "Start Class"}
          </button>
        </div>
      </motion.div>

      {/* Timetable & Attendance Section */}
      <motion.div
        className="card attendance-card"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.3 } }}
      >
        <div className="card-body">
          <div className="class-time">
            <Clock className="clock-icon" />
            <span className="time-text">Your Class: 10:00 AM - 11:30 AM</span>
          </div>

          <Webcam className="webcam-view" />

          <button 
            onClick={markAttendance} 
            className="btn btn-primary mark-attendance-btn"
          >
            <Camera className="camera-icon" /> Mark Attendance
          </button>

          {attendanceMarked && (
            <p className="attendance-success">✅ Attendance Marked Successfully!</p>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default AttendanceDashboard;