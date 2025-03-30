import React, { useState } from 'react';
import './Faculty.css';

function Faculty() {
  const [faculty, setFaculty] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useState({
    employeeId: '',
    shortName: '',
    fullName: ''
  });

  const fetchFaculty = async () => {
    if (!searchParams.employeeId && !searchParams.shortName && !searchParams.fullName) {
      setFaculty([]);
      setError('Please enter search criteria');
      return;
    }
  
    setLoading(true);
    setError(null);
    
    try {
      const queryParams = new URLSearchParams();
      if (searchParams.employeeId) queryParams.append('employee_id', searchParams.employeeId);
      if (searchParams.shortName) queryParams.append('short_name', searchParams.shortName);
      if (searchParams.fullName) queryParams.append('full_name', searchParams.fullName);
  
      const response = await fetch(`http://localhost:3001/faculty?${queryParams}`);
      
      if (!response.ok) {
        throw new Error(`Server error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      
      if (!data) {
        throw new Error('No data received from server');
      }
      
      setFaculty(data);
      
      if (data.length === 0) {
        setError('No records found');
      }
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err.message || 'Failed to connect to server');
      setFaculty([]);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchFaculty();
  };

  const clearSearch = () => {
    setSearchParams({ employeeId: '', shortName: '', fullName: '' });
    setFaculty([]);
    setError(null);
  };

  return (
    <div className="faculty-container container-fluid">
      <div className="header-section text-center py-5">
        <h1 className="display-4 mb-3">Faculty Search</h1>
      </div>
      
      <div className="search-section card shadow-lg mb-5">
        <div className="card-body p-4">
          <form onSubmit={handleSubmit} className="search-form">
            <div className="row g-3">
              <div className="col-md-4">
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    id="employeeId"
                    name="employeeId"
                    placeholder="Employee ID"
                    value={searchParams.employeeId}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="employeeId">Employee ID</label>
                </div>
              </div>
              
              <div className="col-md-4">
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    id="shortName"
                    name="shortName"
                    placeholder="Short Name"
                    value={searchParams.shortName}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="shortName">Short Name (e.g., RDV)</label>
                </div>
              </div>
              
              <div className="col-md-4">
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    id="fullName"
                    name="fullName"
                    placeholder="Full Name"
                    value={searchParams.fullName}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="fullName">Full Name</label>
                </div>
              </div>
            </div>
            
            <div className="button-group mt-4 d-flex justify-content-center">
              <button type="submit" className="btn btn-primary btn-lg me-3 px-4">
                <i className="bi bi-search me-2"></i>Search
              </button>
              <button 
                type="button" 
                onClick={clearSearch} 
                className="btn btn-outline-secondary btn-lg px-4"
              >
                Clear
              </button>
            </div>
          </form>
        </div>
      </div>

      {loading && (
        <div className="text-center my-4">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      
      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}

      {faculty.length > 0 && (
        <div className="results-section card shadow-sm">
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead className="table-light">
                  <tr>
                    <th>ID</th>
                    <th>Short Name</th>
                    <th>Full Name</th>
                    <th>Email</th>
                  </tr>
                </thead>
                <tbody>
                  {faculty.map((f) => (
                    <tr key={f.employee_id}>
                      <td>{f.employee_id}</td>
                      <td>{f.short_name}</td>
                      <td>{f.full_name}</td>
                      <td>
                        <a href={`mailto:${f.email_id}`} className="email-link">
                          {f.email_id}
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Faculty;