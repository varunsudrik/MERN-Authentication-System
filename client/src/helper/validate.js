import toast from "react-hot-toast";
//import { authenticate } from "./helper";
import { authenticate } from "./helper";

/** validate login page Username */

export async function UsernameValidate(values) {
  const errors = UsernameVerify({}, values);

  if (values.Username) {
    const { status } = await authenticate(values.Username);

    if (status !== 200) {
      errors.exist = toast.error("User does not exist");
    }
  }

  return errors;
}

/** validate Password */
export async function PasswordValidate(values) {
  const errors = PasswordVerify({}, values);

  return errors;
}

/** validate reset Password */
export async function resetPasswordValidation(values) {
  const errors = PasswordVerify({}, values);

  if (values.Password !== values.confirm_pwd) {
    errors.exist = toast.error("Password not match...!");
  }

  return errors;
}

/** validate register form */
export async function registerValidation(values) {
  const errors = UsernameVerify({}, values);
  PasswordVerify(errors, values);
  emailVerify(errors, values);

  return errors;
}
/** validate profile form */
export async function profileValidation(values) {
  const errors = emailVerify({}, values);

  return errors;
}

/** ************************************************* */

/** validate Password */
function PasswordVerify(errors = {}, values) {
  const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

  if (!values.Password) {
    errors.Password = toast.error("Password Required...!");
  } else if (values.Password.includes(" ")) {
    errors.Password = toast.error("Wrong Password...!");
  } else if (values.Password.length < 4) {
    errors.Password = toast.error(
      "Password must be more than 4 characters long"
    );
  } else if (!specialChars.test(values.Password)) {
    errors.Password = toast.error("Password must have special character");
  }

  return errors;
}

/** validate Username */
function UsernameVerify(error = {}, values) {
  if (!values.Username) {
    error.Username = toast.error("Username Required...!");
  } else if (values.Username.includes(" ")) {
    error.Username = toast.error("Invalid Username...!");
  }

  return error;
}

/** validate Email */

function emailVerify(error = {}, values) {
  if (!values.email) {
    error.email = toast.error("Email Required...!");
  } else if (values.email.includes(" ")) {
    error.email = toast.error("Invalid Email...!");
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    error.email = toast.error("Invalid email address...!");
  }

  return error;
}
