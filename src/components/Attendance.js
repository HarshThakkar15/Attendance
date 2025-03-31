import React, { useState } from "react";
import Webcam from "react-webcam";
import "./Attendance.css"; 

const Attendance = () => {
  const [attendanceMarked, setAttendanceMarked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const markAttendance = () => {
    setIsLoading(true);
    // Simulate API call with timeout
    setTimeout(() => {
      setAttendanceMarked(true);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="attendance-container">
      <div className="attendance-card">
        <h2 className="attendance-title">Attendance System</h2>
        
        <div className="webcam-container">
          <Webcam className="webcam" />
          <div className="webcam-overlay"></div>
        </div>
        
        <button 
          className={`attendance-button ${isLoading ? 'loading' : ''}`} 
          onClick={markAttendance}
          disabled={isLoading || attendanceMarked}
        >
          {isLoading ? (
            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
          ) : (
            'Mark Attendance'
          )}
        </button>
        
        {attendanceMarked && (
          <div className="success-message">
            <span className="success-icon">✓</span>
            Attendance Marked Successfully!
          </div>
        )}
      </div>
    </div>
  );
};

export default Attendance;