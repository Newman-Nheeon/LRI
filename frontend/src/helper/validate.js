import toast from "react-hot-toast";

// validate login page password
export async function passwordValidate(values) {
  const errors = {};
  emailVerify(errors, values);
  passwordVerify(errors, values);
  return errors;
}

/** validate register form */
export async function registerValidation(values) {
  const errors = {};
  firstNameVerify(errors, values);
  lastNameVerify(errors, values);
  emailVerify(errors, values);
  passwordVerify(errors, values);
  confirmPasswordVerify(errors, values);
  checkboxVerify(errors, values);

  return errors;
}

////////////////////////////////////////////////////////////

/*validate password */
function passwordVerify(error = {}, values) {
  const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

  if (!values.password) {
    error.password = toast.error("Password is required");
  } else if (values.password.length < 6) {
    error.password = toast.error("Password must be at least 6 characters");
  } else if (values.password.length > 20) {
    error.password = toast.error("Password must be at most 20 characters");
  } else if (values.password.includes(" ")) {
    error.password = toast.error("Password must not contain spaces");
  } else if (!specialChars.test(values.password)) {
    error.password = toast.error("Password must have special character");
  } else if (!/[A-Z]/.test(values.password)) {
    error.password = toast.error(
      "Password must have at least one uppercase letter"
    );
  }
  return error;
}

/** validate confirm password */
function confirmPasswordVerify(error = {}, values) {
  if (!values.confirmPassword) {
    error.confirmPassword = toast.error("Confirm password is required");
  } else if (values.confirmPassword !== values.password) {
    error.confirmPassword = toast.error("Password does not match");
  }

  return error;
}

/** validate email */
function emailVerify(error = {}, values) {
  if (!values.email) {
    error.email = toast.error("Email is required");
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    error.email = toast.error("Invalid email address");
  } else if (values.email.length > 50) {
    error.email = toast.error("Email must be at most 50 characters");
  } else if (values.email.includes(" ")) {
    error.email = toast.error("Email must not contain spaces");
  }

  return error;
}

/** validate firstname */
function firstNameVerify(error = {}, values) {
  if (!values.firstName) {
    error.firstName = toast.error("Firstname is required");
  } else if (values.firstName.length < 3) {
    error.firstName = toast.error("Firstname must be at least 3 characters");
  } else if (values.firstName.length > 20) {
    error.firstName = toast.error("Firstname must be at most 20 characters");
  } else if (!/^[a-zA-Z]+$/.test(values.firstName)) {
    error.firstName = toast.error("Firstname must be alphabetic");
  }

  return error;
}

/** validate lastname */
function lastNameVerify(error = {}, values) {
  if (!values.lastName) {
    error.lastName = toast.error("Lastname is required");
  } else if (values.lastName.length < 3) {
    error.lastName = toast.error("Lastname must be at least 3 characters");
  } else if (values.lastName.length > 20) {
    error.lastName = toast.error("Lastname must be at most 20 characters");
  } else if (!/^[a-zA-Z]+$/.test(values.lastName)) {
    error.lastName = toast.error("Lastname must be alphabetic");
  }

  return error;
}

/** validate checkbox */
function checkboxVerify(error = {}, values) {
  if (!values.checkbox) {
    error.checkbox = toast.error("Please check the box");
  }

  return error;
}
