import React from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="auth-container">
      {/* Left Column */}
      <div className="left-column">
        <div className="logo">
          <span></span> Online Complaint Portal
        </div>
        <h1>Welcome!</h1>
        <p>Please Signup or Login to continue</p>
      </div>

      {/* Right Column */}
      <div className="right-column">
        <div className="form-container">
          <h2>Get Started</h2>
          <button 
            onClick={() => navigate('/signup')}
            style={{ marginBottom: '10px' }}
          >
            Go to Signup
          </button>
          <button onClick={() => navigate('/login')}
              style={{ marginBottom: '10px' }}
              >
            Go to Login
          </button>
          <button onClick={() => navigate('/adminlogin')}>
           Admin Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
