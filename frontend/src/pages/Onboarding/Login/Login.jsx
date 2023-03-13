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
    <section className="login">
      <article className="login__container container">
        <div className="login__container-contents">
          <div style={{ width: "100%" }}>
            <Toaster
              position="top-center"
              reverseOrder={false}
              toastOptions={{ duration: 2000 }}
            />
            <div className="login__container-contents-header">
              <h3>
                <span>LRI</span> Login
              </h3>
              <p>Access to our dashboard</p>
            </div>

            <form
              className="register__container-contents-form"
              onSubmit={formik.handleSubmit}
              autoComplete="off"
            >
              <div className="form__input-box">
                <label htmlFor="email">Email Address</label>
                <input
                  {...formik.getFieldProps("email")}
                  type="text"
                  id="email"
                  className="form-control"
                />
              </div>

              <div className="form__input-box">
                <label htmlFor="password">Password</label>
                <div className="input-box--password">
                  <input
                    {...formik.getFieldProps("password")}
                    type={showPassword ? "text" : "password"}
                    id="password"
                    className="form-control password-input"
                  />
                  <div
                    className="password-visibility"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                  </div>
                </div>
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
          </div>
        </div>
      </article>
    </section>
  );
};

export default Login;
