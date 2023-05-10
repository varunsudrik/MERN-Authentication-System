import express from "express";
import Auth, { localVariables } from "../middleware/auth.js";
import { registerMail } from "../controllers/mailer.js";

import {
  register,
  verifyUser,
  login,
  getUser,
  updateUser,
  generateOTP,
  verifyOTP,
  createResetSession,
  resetPassword,
} from "../controllers/appController.js";

let router = express.Router();

// post request
router.post("/register", register);

router.post("/registerMail", registerMail);

router.post("/authenticate", verifyUser, (req, res) => {
  res.end();
});
router.post("/login", verifyUser, login);

// get routes

router.get("/user/:Username", getUser); // user with username

router.get("/generateOTP", verifyUser, localVariables, generateOTP); // generate random otp

router.get("/verifyOTP", verifyUser, verifyOTP); // verify random otp

router.get("/createResetSession", createResetSession); // reset variables

// put routes

router.put("/updateuser", Auth, updateUser); // update user
//router.put("/updateuser", updateUser); // update user

router.put("/resetPassword", verifyUser, resetPassword); // reset password

export default router;
