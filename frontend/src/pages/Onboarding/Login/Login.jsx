import React, { useState } from "react";
import "../../../dist/main.css";
import { Link } from "react-router-dom";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import { passwordValidate } from "../../../helper/validate";
import { useFormik } from "formik";

const Login = () => {
  // This is to turn on and off the password visibility
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: passwordValidate,
    validateOnBlur: false,
    validateOnChange: false,

    onSubmit: async (values, actions) => {
      if (formik.isValid) {
        console.log(values);
        toast.success("Login Successful");

        // wait for 1 sec before resetting the form
        await new Promise((resolve) => setTimeout(resolve, 1000));

        actions.resetForm();
      } else {
        toast.error("Login Failed");
      }
    },
  });

  return (
    <body className="login">
      <section className="login__container">
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{ duration: 2000 }}
        />
        <h3 className="login__header">
          <span>LRI</span> Login
        </h3>
        <p className="login__para">Access to our dashboard</p>
        <form
          className="form"
          onSubmit={formik.handleSubmit}
          autoComplete="off"
        >
          <label htmlFor="email">Email Address</label>
          <input
            {...formik.getFieldProps("email")}
            type="text"
            id="email"
            className="form__input"
          />
          <label htmlFor="password">Password</label>
          <div className="password">
            <input
              {...formik.getFieldProps("password")}
              type={showPassword ? "password" : "text" }
              id="password"
              maxlength="20"
              className="form__input"
            />
            <span
              className="password__visibility"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>
          
            
          

          <div className="forget__password">
            <Link className="forget__password-link" to="/forgotpassword">
              Forgot Password ?
            </Link>
          </div>

          <button className="btn btn-primary" type="submit">
            Login
          </button>

          <div className="form__footer">
            Don’t have an account?{" "}
            <Link className="form__footer-link " to="/register">
              Register
            </Link>
          </div>
        </form>
      
        
      </section>
    </body>
  );
};

export default Login;
