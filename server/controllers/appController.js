import User from "../Models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const JWT_KEY = "thisismyseckeyy";
import otpGenerator from "otp-generator";

// middleware verify username

export async function verifyUser(req, res, next) {
  try {
    const { Username } = req.method == "GET" ? req.query : req.body;

    // check the user existance
    let exist = await User.findOne({ Username });
    if (!exist) {
      return res.status(404).send("Can't find User!");
    }
    next();
  } catch (error) {
    return res.status(404).send({ error: "Authentication Error" });
  }
}

//const { Username } = req.method == "GET" ? req.query : req.body;
// check the user existance
//     let exist = await User.findOne({ Username });
//     if (exist) {
//       res.status(200).send({ msg: "success" });
//     }
//     if (!exist) return res.status(404).send({ error: "Can't find User!" });
//     next();
//   } catch (error) {
//     return res.status(404).send({ error: "Authentication Error" });
//   }
// }

// export const verifyUser = async (req, res, next) => {
//   try {
//     const { Username } = req.method == "GET" ? req.query : req.body;

//     let exist = await User.findOne({ Username });

//     if (!exist) return register.status(404).send({ Error: "User not found" });
//     next();
//   } catch (err) {
//     return res.status(400).send({ err: "Authentication error" });
//   }
// };

export const register = async (req, res) => {
  try {
    const { Username, Password, email, profile } = req.body;

    //  Check existing username

    const existUsername = new Promise((resolve, reject) => {
      User.findOne({ Username }, (err, user) => {
        if (err) reject(new Error(err));
        if (user) reject({ error: "Enter unique username" });

        resolve();
      });
    });

    const existEmail = new Promise((resolve, reject) => {
      User.findOne({ email }, (err, email) => {
        if (err) reject(new Error(err));
        if (email) reject({ error: "Enter unique email" });

        resolve();
      });
    });

    Promise.all([existUsername, existEmail])
      .then(() => {
        if (Password) {
          bcrypt
            .hash(Password, 10)
            .then((hashedPassword) => {
              const user = new User({
                Username,
                Password: hashedPassword,
                email,
                // profile: profile || "",
              });
              user
                .save()
                .then((result) =>
                  res.status(201).send({ msg: "User registered successfully" })
                )
                .catch((err) => res.status(501).send({ err }));
            })
            .catch((err) => {
              return res.status(502).send("Enable to hashed password");
            });
        }
      })
      .catch((err) => {
        return res.status(504).send({ err });
      });
  } catch (err) {
    return res.status(503).send(err);
  }
};

export async function login(req, res) {
  const { Username, Password } = req.body;

  try {
    User.findOne({ Username })
      .then((user) => {
        bcrypt
          .compare(Password, user.Password)
          .then((passwordCheck) => {
            if (!passwordCheck)
              return res.status(400).send({ error: "Don't have Password" });

            // create jwt token
            const token = jwt.sign(
              {
                userId: user._id,
                Username: user.Username,
              },
              JWT_KEY,
              { expiresIn: "24h" }
            );

            return res.status(200).send({
              msg: "Login Successful...!",
              Username: user.Username,
              token,
            });
          })
          .catch((error) => {
            return res.status(400).send({ error: "Password does not Match" });
          });
      })
      .catch((error) => {
        return res.status(404).send({ error: "Username not Found" });
      });
  } catch (err) {
    //return res.status(505).send({ err });
    return res.status(505).send(err);
  }
}

export async function getUser(req, res) {
  const { Username } = req.params;

  try {
    if (!Username) return res.status(501).send({ error: "Invalidf Username" });

    User.findOne({ Username }, function (err, user) {
      if (err) return res.status(500).send({ err });
      if (!user)
        return res.status(501).send({ error: "Couldn't Find the User" });

      /** remove password from user */
      // mongoose return unnecessary data with object so convert it into json

      const { Password, ...rest } = user.toJSON();

      return res.status(201).send(rest);
    });
  } catch (error) {
    return res.status(404).send({ error: "Cannot Find User Data" });
  }
}

export async function updateUser(req, res) {
  try {
    // to get url query data
    const { userId } = req.user;

    if (userId) {
      const body = req.body;

      // update the data
      User.updateOne({ _id: userId }, body, function (err, data) {
        if (err) throw err;

        return res.status(201).send({ msg: "Record Updated" });
      });
    } else {
      return res.status(402).send({ error: "User Not Found" });
    }
  } catch (error) {
    return res.status(403).send({ error: error.message });
  }
}

export const generateOTP = async (req, res) => {
  req.app.locals.OTP = await otpGenerator.generate(6, {
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });
  res.status(201).send({ code: req.app.locals.OTP });
};

export const verifyOTP = async (req, res) => {
  const { code } = req.query;
  if (parseInt(req.app.locals.OTP) === parseInt(code)) {
    req.app.locals.OTP = null; // reset otp value after checking
    req.app.locals.resetSession = true; // start session for password reset
    res.status(201).send({ msg: "Verification successful" });
  }
  res.status(401).send({ msg: "Invalid OTP " });
};

export const createResetSession = async (req, res) => {
  if (req.app.locals.resetSession) {
    req.app.locals.resetSession = false; // access session once only
    return res.status(201).send({ msg: "Access Grande" });
  }
  return res.status(440).send({ msg: "Session Expired" });
};
export const resetPassword = async (req, res) => {
  try {
    if (!req.app.locals.resetSession)
      return res.status(440).send({ msg: "Session Expired" });
    const { Username, Password } = req.body;

    try {
      User.findOne({ Username })
        .then((user) => {
          bcrypt
            .hash(Password, 10)
            .then((hashedPassword) => {
              User.updateOne(
                {
                  Username: user.Username,
                },
                { Password: hashedPassword },
                function (err, data) {
                  if (err) throw err;
                  return res.status(201).send({ msg: "Record Updated" });
                }
              );
            })
            .catch((errpr) => {
              res.status(500).send({ error: "Enable to hashed password" });
            });
        })
        .catch((err) => {
          res.status(404).send({ error: "Invalid username" });
        });
    } catch (err) {
      res.status(500).send({ err });
    }
  } catch (error) {
    res.status(401).send({ error });
  }
};
