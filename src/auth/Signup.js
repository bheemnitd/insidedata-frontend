import React, { useState } from 'react';
import './Signup.css'
import Login from "./Login";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    dob: '',
    contactNumber: '',
  });

  const [msgInputDivVisible, setMsgInputDivVisible] = useState(true);
  const [showLogin, setShowLogin] = useState(true);

  const handleLoginClick = () => {
      setShowLogin(true);
  };

  const validateName = (name) => {
    const regex = /^[a-zA-Z ]{2,60}$/;
    if (regex.test(name)) {
      return true;
    } else {
      alert('Name: only alphabet with space allowed max limit 60.');
      return false;
    }
  };

  const validatePassword = (password) => {
    const regex = /^[0-9A-Za-z]\w{6,10}$/;
    if (regex.test(password)) {
      return true;
    } else {
      alert('Password: min 6 max 10 alphanumeric.');
      return false;
    }
  };

  const validateEmail = (email) => {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (regex.test(String(email).toLowerCase())) {
      return true;
    } else {
      alert('Email: please write a valid email');
      return false;
    }
  };

  const validateDOB = (dob) => {
    const today = new Date();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const year = today.getFullYear();
    const currentDate = [year, month, day].join('-');
    const todayTimestamp = Date.parse(currentDate);
    const dobTimestamp = Date.parse(dob);

    if (dobTimestamp <= todayTimestamp) {
      return true;
    } else {
      alert('DOB: cannot be a future date or empty');
      return false;
    }
  };

  const validateContactNumber = (contactNumber) => {
    const regex = /^\d{10}$/;
    if (regex.test(contactNumber)) {
      return true;
    } else {
      alert('Mobile no: should be of 10 digits.');
      return false;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      validateName(formData.name) &&
      validateEmail(formData.email) &&
      validatePassword(formData.password) &&
      validateDOB(formData.dob) &&
      validateContactNumber(formData.contactNumber)
    ) {
      // Perform form submission logic here
      console.log('Form data submitted:', formData);
    }
  };

  return (
    <div className="card auth-card bg-transparent ">
      <div className="card-body text-center">
        <h2>New Registration</h2>
        <div className="container mt-3">
          {msgInputDivVisible && (
            <form onSubmit={handleSubmit} id="registration-form">
              {/* Add your CSRF token here if needed */}
              {/* <input type="hidden" name="csrfmiddlewaretoken" value="{% csrf_token %}" /> */}

              <input
                type="text"
                className="form-control form-control-md mt-3"
                id="name"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />

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

              <input
                type="date"
                className="form-control form-control-md mt-3"
                id="dob"
                name="dob"
                placeholder="DOB"
                value={formData.dob}
                onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
              />

              <input
                type="text"
                className="form-control form-control-md mt-3"
                id="contact-number"
                name="contactNumber"
                placeholder="Mobile No."
                value={formData.contactNumber}
                onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                maxLength="10"
              />

              <div className="d-grid">
                <button type="submit" className="btn btn-outline-dark btn-sm mt-2" id="register-submit-btn">
                  Register
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
      <div className="card-footer text-center">
        {/*Already Registered? <a href="#" onClick={handleLoginClick}>LOGIN</a>*/}
        {/*Already Registered? <a href="/login">LOGIN</a>*/}
      </div>
        {/*{showLogin ? <Login /> : null}*/}
    </div>
  )
};

export default Signup;
