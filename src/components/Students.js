import React, { useState, useEffect } from 'react';
import './Students.css';

function Students() {
  const [students, setStudents] = useState([]);
  const [allClasses, setAllClasses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useState({
    enrollment: '',
    className: ''
  });

  // Enhanced fetch function
  const fetchWithTimeout = async (url, options = {}, timeout = 5000) => {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
    
    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal
      });
      clearTimeout(id);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      if (error.name === 'AbortError') {
        throw new Error('Request timed out');
      }
      throw error;
    }
  };

  // Fetch all classes on component mount
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const data = await fetchWithTimeout('http://localhost:3001/classes');
        setAllClasses(data);
      } catch (err) {
        console.error('Error fetching classes:', err);
        setError(`Failed to load class list: ${err.message}. Check if backend is running.`);
      }
    };
    fetchClasses();
  }, []);

  // Update your handleSearch function to match:
const handleSearch = async () => {
  if (!searchParams.enrollment && !searchParams.className) {
    setError('Please enter enrollment number or select a class');
    return;
  }

  setLoading(true);
  setError(null);
  
  try {
    const params = new URLSearchParams();
    if (searchParams.enrollment) params.append('enrollment_no', searchParams.enrollment.trim());
    if (searchParams.className) params.append('class', searchParams.className.trim());

    const response = await fetch(`http://localhost:3001/students?${params.toString()}`);
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'No students found');
    }
    
    const data = await response.json();
    setStudents(data);
    
  } catch (err) {
    console.error('Search error:', err);
    setError(err.message || 'Failed to fetch student data. Please try again.');
    setStudents([]);
  } finally {
    setLoading(false);
  }
};

  // ... (keep the rest of your component code the same) ...
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const clearSearch = () => {
    setSearchParams({
      enrollment: '',
      className: ''
    });
    setStudents([]);
    setError(null);
  };

  return (
    <div className="student-app">
      <header className="app-header">
        <h1>
          <i className="fas fa-user-graduate"></i> Student Records
        </h1>
      </header>

      <div className="app-container">
        <div className="search-panel card">
          <div className="card-header">
            <h3><i className="fas fa-filter"></i> Filter Students</h3>
          </div>
          <div className="card-body">
            <div className="form-group">
              <label htmlFor="enrollment"><i className="fas fa-id-card"></i> Enrollment No</label>
              <input
                type="text"
                id="enrollment"
                name="enrollment"
                className="form-control"
                placeholder="Enter Enrollment No"
                value={searchParams.enrollment}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
              />
            </div>

            <div className="form-group">
              <label htmlFor="className"><i className="fas fa-users-class"></i> Class</label>
              <select
                id="className"
                name="className"
                className="form-control"
                value={searchParams.className}
                onChange={handleInputChange}
              >
                <option value="">All Classes</option>
                {allClasses.map(cls => (
                  <option key={cls.id} value={cls.class_name}>
                    {cls.class_name}
                  </option>
                ))}
              </select>
            </div>

            <div className="action-buttons">
              <button 
                onClick={handleSearch} 
                className="btn btn-primary search-btn"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    Searching...
                  </>
                ) : (
                  <>
                    <i className="fas fa-search"></i> Search
                  </>
                )}
              </button>
              <button 
                onClick={clearSearch} 
                className="btn btn-outline-secondary clear-btn"
              >
                <i className="fas fa-broom"></i> Clear
              </button>
            </div>
          </div>
        </div>

        {error && (
          <div className={`alert ${students.length === 0 ? 'alert-danger' : 'alert-info'}`}>
            <i className={students.length === 0 ? 'fas fa-exclamation-circle' : 'fas fa-info-circle'}></i> {error}
          </div>
        )}

        {students.length > 0 && (
          <div className="results-summary">
            <div className="badge badge-pill badge-primary">
              <i className="fas fa-database"></i> {students.length} record{students.length !== 1 ? 's' : ''} found
            </div>
          </div>
        )}

        {students.length > 0 && (
          <div className="results-table card">
            <div className="card-header">
              <h3><i className="fas fa-table"></i> Student Records</h3>
            </div>
            <div className="card-body table-responsive">
              <table className="table table-hover table-striped">
                <thead className="thead-dark">
                  <tr>
                    <th>S.No</th>
                    <th>Enrollment</th>
                    <th>Name</th>
                    <th>Branch</th>
                    <th>Type</th>
                    <th>Semester</th>
                    <th>Gender</th>
                    <th>GNU Email</th>
                    <th>Personal Email</th>
                    <th>Batch</th>
                    <th>Class</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student, index) => (
                    <tr key={student.enrollment_no || index}>
                      <td>{index + 1}</td>
                      <td>{student.enrollment_no || '-'}</td>
                      <td>
                        <span className="student-name">
                          {student.name_of_student || '-'}
                          {student.gender === 'Female' && <i className="fas fa-venus female-icon"></i>}
                          {student.gender === 'Male' && <i className="fas fa-mars male-icon"></i>}
                        </span>
                      </td>
                      <td>{student.branch || '-'}</td>
                      <td>
                        <span className={`badge ${student.hosteller_commuter === 'Hosteller' ? 'badge-success' : 'badge-info'}`}>
                          {student.hosteller_commuter || '-'}
                        </span>
                      </td>
                      <td>{student.semester || '-'}</td>
                      <td>{student.gender || '-'}</td>
                      <td>
                        {student.student_gnu_mail_id ? (
                          <a href={`mailto:${student.student_gnu_mail_id}`} className="email-link">
                            <i className="fas fa-envelope"></i> {student.student_gnu_mail_id}
                          </a>
                        ) : '-'}
                      </td>
                      <td>
                        {student.student_personal_mail_id ? (
                          <a href={`mailto:${student.student_personal_mail_id}`} className="email-link">
                            <i className="fas fa-envelope"></i> {student.student_personal_mail_id}
                          </a>
                        ) : '-'}
                      </td>
                      <td>{student.batch || '-'}</td>
                      <td>
                        <span className="class-tag">{student.class || '-'}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Students;