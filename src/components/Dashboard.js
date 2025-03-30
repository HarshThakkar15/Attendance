import React from "react";
import { Link } from "react-router-dom";
import { FaUserGraduate, FaChalkboardTeacher, FaCalendarAlt, FaClipboardList } from "react-icons/fa";
import "./Dashboard.css"; // We'll create this CSS file

const Dashboard = () => {
    const menuItems = [
        { name: "Students", icon: <FaUserGraduate className="menu-icon" />, path: "/students", bgColor: "bg-blue" },
        { name: "Faculty", icon: <FaChalkboardTeacher className="menu-icon" />, path: "/faculty", bgColor: "bg-green" },
        { name: "View Attendance", icon: <FaClipboardList className="menu-icon" />, path: "/view-attendance", bgColor: "bg-purple" },
        { name: "Timetable", icon: <FaCalendarAlt className="menu-icon" />, path: "/timetable", bgColor: "bg-red" }
    ];

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <h1 className="dashboard-title">📊 Dashboard</h1>
            </div>

            <div className="dashboard-grid">
                {menuItems.map((item, index) => (
                    <Link key={index} to={item.path} className="menu-link">
                        <div className={`menu-card ${item.bgColor}`}>
                            <div className="menu-content">
                                <h2 className="menu-title">{item.name}</h2>
                                <div className="menu-icon-wrapper">{item.icon}</div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;