import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './StudentDashboard.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { FaClipboardList, FaCheckCircle, FaClock, FaBook } from 'react-icons/fa';

const StudentDashboard = () => {
  useEffect(() => {
    // Card animations
    const cards = document.querySelectorAll('.menu-card');
    cards.forEach((card, index) => {
      card.style.animationDelay = `${index * 0.1}s`;
      card.classList.add('animate-in');
    });

    // Particles.js initialization
    const initParticles = async () => {
      try {
        const particlesJS = (await import('particles.js')).default;
        particlesJS('particles-js', {
          particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: "#3b82f6" },
            shape: { type: "circle" },
            opacity: { value: 0.5, random: true },
            size: { value: 3, random: true },
            line_linked: { enable: true, distance: 150, color: "#3b82f6", opacity: 0.4, width: 1 },
            move: { enable: true, speed: 2, direction: "none", random: true, straight: false, out_mode: "out" }
          },
          interactivity: {
            detect_on: "canvas",
            events: {
              onhover: { enable: true, mode: "repulse" },
              onclick: { enable: true, mode: "push" }
            }
          }
        });
      } catch (error) {
        console.error("Could not initialize particles:", error);
      }
    };

    initParticles();

    // Cleanup function
    return () => {
      // Cleanup particles
      if (window.pJSDom && window.pJSDom.length > 0) {
        window.pJSDom[0].pJS.fn.vendors.destroypJS();
        window.pJSDom = [];
      }
    };
  }, []);

  return (
    <div className="dashboard-container">
      <div className="particles-background" id="particles-js"></div>
      
      <div className="dashboard-header">
        <h1 className="dashboard-title">Student Portal</h1>
      </div>
      
      <div className="dashboard-grid">
        <Link to="/mark-attendance" className="menu-link">
          <div className="menu-card bg-blue">
            <div className="menu-content">
              <div>
                <h2 className="menu-title">Mark Attendance</h2>
              </div>
              <div className="menu-icon-wrapper">
                <i className="fas fa-check-circle menu-icon"></i>
              </div>
            </div>
            <div className="hover-effect"></div>
          </div>
        </Link>
        
        <Link to="/view-attendance" className="menu-link">
          <div className="menu-card bg-green">
            <div className="menu-content">
              <div>
                <h2 className="menu-title">View Attendance</h2>
              </div>
              <div className="menu-icon-wrapper">
                <FaClipboardList className="menu-icon" />
              </div>
            </div>
            <div className="hover-effect"></div>
          </div>
        </Link>
        
        <Link to="/timetable" className="menu-link">
          <div className="menu-card bg-purple">
            <div className="menu-content">
              <div>
                <h2 className="menu-title">College Timetable</h2>
              </div>
              <div className="menu-icon-wrapper">
              <i className="fas fa-calendar-alt menu-icon"></i>
              </div>
            </div>
            <div className="hover-effect"></div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default StudentDashboard;