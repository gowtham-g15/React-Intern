import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    userName: '',
    roleNames: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRoleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      roleNames: checked
        ? [...prev.roleNames, value]
        : prev.roleNames.filter((role) => role !== value),
    }));
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form data
    if (!formData.name || !formData.email || !formData.password || !formData.userName) {
      alert('Please fill in all required fields');
      return;
    }
    
    if (formData.roleNames.length === 0) {
      alert('Please select at least one role');
      return;
    }

    try {
      console.log('Sending registration request with data:', formData);
      const response = await axios.post(
        'https://springboot-intern-rjt3.onrender.com/api/auth/register',
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          validateStatus: function (status) {
            return status < 500; // Reject only if the status code is greater than or equal to 500
          }
        }
      );
      
      if (response.status >= 200 && response.status < 300) {
        alert('Registration successful! Please login with your credentials.');
        navigate('/'); // Redirect to login page after successful registration
      } else {
        // Handle 4xx errors from the server
        const errorMessage = response.data?.message || 
                            response.data?.error || 
                            `Registration failed with status ${response.status}`;
        throw new Error(errorMessage);
      }
      
    } catch (err) {
      console.error('Registration Error:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status,
        config: {
          url: err.config?.url,
          method: err.config?.method,
          data: err.config?.data
        }
      });
      
      let errorMessage = 'Registration failed. Please try again.';
      if (err.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (err.response.status === 400) {
          errorMessage = 'Validation error: ' + (err.response.data?.message || 'Please check your input');
        } else if (err.response.status === 409) {
          errorMessage = 'User with this username or email already exists';
        } else {
          errorMessage = `Server error (${err.response.status}): ${err.response.data?.message || 'Please try again later'}`;
        }
      } else if (err.request) {
        // The request was made but no response was received
        errorMessage = 'No response from server. Please check your connection.';
      }
      
      alert(errorMessage);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card p-4 shadow">
            <h2 className="text-center mb-4">Register</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Full Name"
                  required
                />
              </div>

              <div className="mb-3">
                <input
                  type="text"
                  name="userName"
                  value={formData.userName}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Username"
                  required
                />
              </div>

              <div className="mb-3">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Email"
                  required
                />
              </div>

              <div className="mb-3">
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Password"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-check-label me-3">
                  <input
                    type="checkbox"
                    className="form-check-input me-1"
                    value="ROLE_USER"
                    checked={formData.roleNames.includes("ROLE_USER")}
                    onChange={handleRoleCheckboxChange}
                  />
                  ROLE_USER
                </label>

                <label className="form-check-label">
                  <input
                    type="checkbox"
                    className="form-check-input me-1"
                    value="ROLE_ADMIN"
                    checked={formData.roleNames.includes("ROLE_ADMIN")}
                    onChange={handleRoleCheckboxChange}
                  />
                  ROLE_ADMIN
                </label>
              </div>

              <button type="submit" className="btn btn-primary w-100">Register</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
