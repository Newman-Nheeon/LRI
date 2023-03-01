import React from 'react';
import { useRef, useState } from "react";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import axios from '../../api/axios'

//Regular Expressions
const NameRegex = /^[a-zA-Z]{4,}$/;
const EmailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const PwdRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{6,}$/;
const REGISTER_URL = '/register';


const Register = () => {
  const userRef = useRef(); //focus input on user
  const errRef = useRef(); //focus input on error

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [errMsg, setErrMsg] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  const [success, setSuccess] = useState(false)

  // Name Validation
  const handleFirstNameChange = e => {
    setFirstName(e.target.value);
    if (e.target.value.length > 0 && !NameRegex.test(e.target.value)) {
      setFirstNameError('Invalid first name');
    } else {
      setFirstNameError('');
    }
    validateForm();
  };

  const handleLastNameChange = e => {
    setLastName(e.target.value);
    if (e.target.value.length > 0 && !NameRegex.test(e.target.value)) {
      setLastNameError('Invalid last name');
    } else {
      setLastNameError('');
    }
    validateForm();
  };

  // Email Validation
  const handleEmailChange = e => {
    setEmail(e.target.value);
    if (!EmailRegex.test(e.target.value)) {
      setEmailError('Invalid email address');
    } else {
      setEmailError('');
    }
    validateForm();
  };


  // Password Validation
  const handlePasswordChange = e => {
    setPassword(e.target.value);
    if (e.target.value.length > 0 && !PwdRegex.test(e.target.value)) {
      setPasswordError('Password must contain at least 6 characters with letters, numbers, and special characters');
    } else {
      setPasswordError('');
    }
    validateForm();
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleConfirmPasswordChange = e => {
    setConfirmPassword(e.target.value);
    if (password !== e.target.value) {
      setConfirmPasswordError('Passwords do not match');
    } else {
      setConfirmPasswordError('');
    }
    validateForm();
  };

  // Form Validate
  const validateForm = () => {
    if (!email || !EmailRegex.test(email)) {
      setIsFormValid(false);
      return;
    }
    if (!firstName || !NameRegex.test(firstName)) {
      setIsFormValid(false);
      return;
    }
    if (!lastName || !NameRegex.test(lastName)) {
      setIsFormValid(false);
      return;
    }
    if (!password || !PwdRegex.test(password)) {
      setIsFormValid(false);
      return;
    }
    if (!confirmPassword || !PwdRegex.test(confirmPassword)) {
      setIsFormValid(false);
      return;
    }
    setIsFormValid(true);
  };

  // Handle Submit
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(firstName, lastName, email, password)
    try {
      const response = await axios.post(REGISTER_URL, JSON.stringify({firstName, lastName, password, email}), 
      {
        headers: { 'Content-Type': 'application/json'}, withCredentials: true

      });
      console.log(response.data);
      console.log(response.acessToken);
      console.log(JSON.stringify(Response));
      setSuccess(true);
    } catch (err) {
      if (!err?.response){
        setErrMsg('no server response');
      }else if (err.response?.status === 409) {
        setErrMsg('username taken');
      }else{
        setErrMsg('Registration failed')
      }
    }

  };


  return (
    <div>
      <div className="bg-pattern-style bg-pattern-style-register">
      <div className="content">
        {/* Register Content */}
        <div className="account-content">
          <div className="account-box">
            <div className="login-right">
              <div className="login-header">
                <h3><span>LRI</span> Registeration</h3>
                <p className="text-muted">Access to our mentoring programme</p>
              </div>

              {/* Register Form */}
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-lg-6">
                    <div className="form-group">
                      
                      <label className="form-control-label">First Name</label>
                      <input 
                        id="firstName" 
                        type="text" 
                        ref={userRef}
                        className="form-control" 
                        name="firstName" 
                        value={firstName}
                        onChange ={handleFirstNameChange}
                        required />
                        {firstNameError && (<div style={{ color: 'red' }}>
                          <FontAwesomeIcon icon={faExclamationCircle} /> {firstNameError}</div>)}
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group">
                      
                      <label className="form-control-label">Last Name</label>
                      <input 
                        id="last-name" 
                        type="text" 
                        className="form-control" 
                        name="lastName"
                        value={lastName}
                        onChange ={handleLastNameChange}
                        required />
                        {lastNameError && (<div style={{ color: 'red' }}>
                          <FontAwesomeIcon icon={faExclamationCircle} /> {lastNameError}</div>)}
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  
                  <label className="form-control-label">Email Address</label>
                  <input 
                    id="email" 
                    type="email"
                    name='email' 
                    className="form-control" 
                    value={email}
                    onChange={handleEmailChange}
                    required />
                    {emailError && (<div style={{ color: 'red' }}>
                          <FontAwesomeIcon icon={faExclamationCircle} /> {emailError}</div>)}
                
                </div>
                <div className="row">
                  <div className="col-lg-6">
                    <div className="form-group">

                      <label className="form-control-label">Password</label>
                      <div style={{ display: 'flex' }}>
                      <input 
                        id="password" 
                        type={showPassword ? 'text' : 'password'} 
                        className="form-control" 
                        name="password"
                        value={password}
                        onChange={handlePasswordChange}
                        aria-describedby="passwordError" 
                        style={{ flexGrow: 1 }}
                        required />
                        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} onClick={togglePasswordVisibility} />
                    </div>
                    {passwordError && (<div id="passwordError" style={{ color: 'red' }}>
                          <FontAwesomeIcon icon={faExclamationCircle} /> {passwordError}</div>)}
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group">
                      
                      <label className="form-control-label">Confirm Password</label>
                      <input 
                      id="confirmPassword" 
                      type="password" 
                      className="form-control" 
                      name="passwordConfirmation"
                      value={confirmPassword}
                      onChange={handleConfirmPasswordChange}
                      aria-describedby="confirmPasswordError"
                      required />
                      {confirmPasswordError && (<div id="confirmPasswordError" style={{ color: 'red' }}>
                        <FontAwesomeIcon icon={faExclamationCircle} /> {confirmPasswordError}</div>)}
                    
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <div className="custom-control custom-control-xs custom-checkbox">
                    
                    <input type="checkbox" className="custom-control-input" name="agreeCheckboxUser" id="agree_checkbox_user" required />
                    <label className="custom-control-label" htmlFor="agree_checkbox_user">I agree to privacy policy & Terms</label>
                    
                  </div>
                  <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                </div>

                
                {/* {error && <div className={styles.error_msg} >{error}</div> } */}
                <button disabled={!isFormValid} className="btn btn-primary login-btn" type="submit">Create Account</button>
                
                <div className="account-footer text-center mt-3">
                  Already have an account? <Link className="forgot-link mb-0" to="/login">Login</Link>
                 
                </div>
               
              </form>
              {/* /Register Form */}
            </div>
          </div>
        </div>
        {/* /Register Content */}
      </div>
    </div>
    </div>
  )
}

export default Register