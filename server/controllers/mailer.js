import nodemailer from "nodemailer";
import Mailgen from "mailgen";
import express from "express";

import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();
import { env } from "process";

let nodeConfig = {
  host: "smtp.ethereal.email",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: env.USER_EMAIL, // generated ethereal user
    pass: env.USER_PASS, // generated ethereal password
  },
};

let transporter = nodemailer.createTransport(nodeConfig);

var mailGenerator = new Mailgen({
  theme: "default",
  product: {
    // Appears in header & footer of e-mails
    name: "Mailgen",
    link: "https://mailgen.js/",
    // Optional product logo
    // logo: 'https://mailgen.js/img/logo.png'
  },
});

export const registerMail = async (req, res) => {
  const { Username, userEmail, text, subject } = req.body;

  var email = {
    body: {
      name: Username,
      intro:
        text || "Welcome to Mailgen! We're very excited to have you on board.",
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };
  var emailBody = mailGenerator.generate(email); // Generate an HTML email with the provided contents

  let message = {
    from: env.USER_EMAIL,
    to: userEmail,
    subject: subject || "Signup Successfully",
    html: emailBody,
  };

  transporter
    .sendMail(message)
    .then(res.status(200).send({ msg: "Check your mailbox" }))
    .catch((error) => res.status(500).send({ error })); //send mail
};

// Optionally, preview the generated HTML e-mail by writing it to a local file

// `emailBody` now contains the HTML body,
// and `emailText` contains the textual version.
//
// It's up to you to send the e-mail.
// Check out nodemailer to accomplish this:
// https://nodemailer.com/
