import React, { useState } from "react";
import "../../../dist/main.css";
import { Link } from "react-router-dom";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import { registerValidation } from "../../../helper/validate";
import { useFormik } from "formik";

const Register = () => {
  // This is to turn on and off the password visibility
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      checkbox: false, // set initial value to false
    },
    validate: registerValidation,
    validateOnBlur: false,
    validateOnChange: false,

    onSubmit: async (values, actions) => {
      if (formik.isValid) {
        console.log(values);
        toast.success("Registration Successful");

        // wait for 1 sec before resetting the form
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // reset the checkbox value
        formik.setFieldValue("checkbox", false);

        actions.resetForm();
      } else {
        toast.error("Registration Failed");
      }
    },
  });

  return (
    <body className="login">
      <section className="login__container ">
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{ duration: 9000 }}
        />
        <h3 className="login__header">
          <span>LRI</span> Registration
        </h3>
        <p className="login__para">Access to our mentoring programme</p>
        <form
          className="form"
          onSubmit={formik.handleSubmit}
          autoComplete="off"
        >
        <label htmlFor="firstName">First Name</label>
        <input
          {...formik.getFieldProps("firstName")}
          type="text"
          id="firstName"
          className="form__input"
        />    
        <label htmlFor="lastName">Last Name</label>
        <input
          {...formik.getFieldProps("lastName")}
          type="text"
          id="lastName"
          className="form__input"
        />
        <label htmlFor="email">Email Address</label>
        <input
          {...formik.getFieldProps("email")}
          type="text"
          id="email"
          className="form__input"
        />
        <div className="grid grid__2">
        <label htmlFor="password">Password</label>
        <label htmlFor="confirmPassword">Confirm Password</label>
        </div>
        <div className="grid grid__2">
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
          <div className="password">
              <input
                {...formik.getFieldProps("confirmPassword")}
                type={showPassword ? "password" : "text" }
                id="confirmPassword"
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
        </div>      
        

            
                
            

          

          <div className="form__input-box">
            <div className="custom-control custom-control-xs custom-checkbox">
              <input
                {...formik.getFieldProps("checkbox")}
                type="checkbox"
                id="acceptedTos"
                name="checkbox"
                checked={formik.values.checkbox}
                className="custom-control-input"
              />
              <label
                className="custom-control-label"
                htmlFor="agree_checkbox_user"
              >
                I agree to privacy policy & Terms
              </label>
            </div>
          </div>

          <button className="btn btn-primary" type="submit">
            Create Account
          </button>

          <div className="form__footer">
            Already have an account?{" "}
            <Link className="form__footer-link " to="/">
              Login
            </Link>
          </div>
        </form>
        
      </section>
    </body>
  );
};

export default Register;
