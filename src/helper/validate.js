import toast from "react-hot-toast";

/** validate login page Username */
export async function UsernameValidate(values) {
  const errors = UsernameVerify({}, values);

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
