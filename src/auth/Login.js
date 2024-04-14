import React, { useState } from 'react';
import Signup from "./Signup";
import './Signup.css'
const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showSignup, setShowSignup] = useState(true);

  const handleSignupClick = () => {
      setShowSignup(true);
  };

  const validateEmail = (email) => {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(String(email).toLowerCase());
  };

  const validatePassword = (password) => {
    const regex = /^[0-9A-Za-z]\w{6,10}$/;
    return regex.test(password);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform auth logic here
    if (validateEmail(formData.email) && validatePassword(formData.password)) {
      console.log('auth successful!'); // Replace with actual auth logic
    } else {
      alert('Invalid email or password. Please try again.');
    }
  };

  return (
    <div className="card auth-card bg-transparent">
      <div className="card-body text-center">
        <h2>Login</h2>
        <div className="container mt-3">
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              className="form-control form-control-md mt-3"
              id="email"
              name="email"
              placeholder="Email ID"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />

            <input
              type="password"
              className="form-control form-control-md mt-3"
              id="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />

            <div className="d-grid">
              <button type="submit" className="btn btn-outline-dark mt-2">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="card-footer text-center">
        {/*New user? <a href="/signup" onClick={handleSignupClick}>Sign Up</a>*/}
        {/*New user? <a href="/signup">Sign Up</a>*/}
      </div>
        {/*{showSignup ? <Signup /> : null}*/}
    </div>
  );
};

export default Login;