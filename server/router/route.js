import express from "express";
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

router.post("/registerMail", (req, res) => {
  //send mail
  res.json("ds");
});

router.post("/authenticate", (req, res) => {
  // authenticate user
  res.end();
});
router.post("/login", verifyUser, login);

// get routes

router.get("/user/:Username", getUser); // user with username

router.get("/generateOTP", generateOTP); // generate random otp

router.get("/verifyOTP", verifyOTP); // verify random otp

router.get("/createResetSession", createResetSession); // reset variables

// put routes

router.put("/updateuser", updateUser); // update user

router.put("/resetPassword", resetPassword); // reset password

export default router;
