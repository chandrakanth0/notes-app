import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';
import '../styles/login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await API.post('/login', { username, password });
      alert(res.data.msg);
      navigate('/notes');
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div className="login-container">
      <h2>Welcome Back</h2>
      <div className="login-form">
        <div className="form-group">
          <label>Username</label>
          <input
            className="form-control"
            onChange={e => setUsername(e.target.value)}
            placeholder="Enter your username"
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            className="form-control"
            onChange={e => setPassword(e.target.value)}
            placeholder="Enter your password"
            type="password"
          />
        </div>
        <button className="btn btn-primary" onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;