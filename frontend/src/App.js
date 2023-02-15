import React from 'react';
import { Route, Routes } from 'react-router-dom';

//Home Layout
import "./Home/assets/plugins/fontawesome/css/all.min.css";
import "./Home/assets/css/style.css";
import "./Home/assets/css/bootstrap.min.css"
import "./Home/assets/css/modal.css"
import "./Home/assets/plugins/fontawesome/css/fontawesome.min.css"
// import "./Home/assets/js/jquery.min.js"
// import "./Home/assets/js/bootstrap.min.js"
// import "./Home/assets/js/script.js"


//Components
import Login from "./Home/Authentication/login";
import Register from './Home/Authentication/register';
import ForgotPassword from './Home/Authentication/forgotpassword'

function Main() {
  return (
    <Routes>
        <Route path="/" exact element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/forgotpassword" element={<ForgotPassword/>} />
        <Route path="/login" exact element={<Login/>} />
    </Routes>

      
    );
}

export default Main;
