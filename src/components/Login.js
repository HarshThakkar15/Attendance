import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const Login = () => {
    const [enrollmentNumber, setEnrollmentNumber] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [shake, setShake] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const card = document.querySelector('.login-card');
        if (card) {
            card.classList.add('animate-in');
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");
        
        setTimeout(() => {
            if (enrollmentNumber === "1234" && password === "password") {
                localStorage.setItem("user", JSON.stringify({ name: "Test User", role: "student" }));
                navigate("/dashboard");
            } else {
                setError("Wrong password or username");
                setShake(true);
                setTimeout(() => setShake(false), 500);
            }
            setIsLoading(false);
        }, 1000);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="login-container">
            <div className="background-animation">
                <div className="circle circle-1"></div>
                <div className="circle circle-2"></div>
                <div className="circle circle-3"></div>
            </div>
            
            <div className={`login-card ${shake ? 'shake' : ''}`}>
                <div className="login-header">
                    <div className="logo-container">
                        <i className="bi bi-person-circle logo-icon"></i>
                    </div>
                    <p>Please login to your account</p>
                </div>
                
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Enrollment Number</label>
                        <input
                            type="text"
                            value={enrollmentNumber}
                            onChange={(e) => setEnrollmentNumber(e.target.value)}
                            className="form-control"
                            placeholder="Enter Enrollment Number"
                            required
                        />
                    </div>
                    
                    <div className="form-group password-group">
                        <label>Password</label>
                        <div className="password-input-container">
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="form-control"
                                placeholder="Enter Password"
                                required
                            />
                            <button 
                                type="button" 
                                className="toggle-password"
                                onClick={togglePasswordVisibility}
                            >
                                <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
                            </button>
                        </div>
                    </div>

                    {error && <div className="alert alert-danger">{error}</div>}

                    <button
                        type="submit"
                        className={`btn btn-primary btn-block ${isLoading ? 'loading' : ''}`}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <span className="spinner"></span>
                                <span>Logging In...</span>
                            </>
                        ) : (
                            "Log In"
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;