import React, { useState } from "react";
import "./Register.scss";
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
    <section className="register">
      <article className="register__container container">
        <div className="register__container-contents">
          <Toaster
            position="top-center"
            reverseOrder={false}
            toastOptions={{ duration: 9000 }}
          />
          <div className="register__container-contents-header">
            <h3>
              <span>LRI</span> Registration
            </h3>
            <p>Access to our mentoring programme</p>
          </div>

          <form
            className="register__container-contents-form"
            onSubmit={formik.handleSubmit}
            autoComplete="off"
          >
            <div className="form__group-row">
              <div className="form__group-col">
                <div className="form__input-box">
                  <label htmlFor="firstName">First Name</label>

                  <input
                    {...formik.getFieldProps("firstName")}
                    type="text"
                    id="firstName"
                    className="form-control"
                  />
                </div>
              </div>
              <div className="form__group-col">
                <div className="form__input-box">
                  <label htmlFor="lastName">Last Name</label>

                  <input
                    {...formik.getFieldProps("lastName")}
                    type="text"
                    id="lastName"
                    className="form-control"
                  />
                </div>
              </div>
            </div>

            <div className="form__input-box">
              <label htmlFor="email">Email Address</label>
              <input
                {...formik.getFieldProps("email")}
                type="text"
                id="email"
                className="form-control"
              />
            </div>

            <div className="form__group-row">
              <div className="form__group-col">
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
              </div>

              <div className="form__group-col">
                <div className="form__input-box">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input
                    {...formik.getFieldProps("confirmPassword")}
                    type={showPassword ? "text" : "password"}
                    id="confirmPassword"
                    className="form-control"
                  />
                </div>
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
        </div>
      </article>
    </section>
  );
};

export default Register;
