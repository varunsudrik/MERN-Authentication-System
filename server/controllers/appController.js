import User from "../Models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const JWT_KEY = "thisismyseckeyy";

// middleware verify username

export const verifyUser = async (req, res, next) => {
  try {
    const { Username } = req.method == "GET" ? req.query : req.body;

    let exist = await User.findOne({ Username });
    if (!exist) return register.status(404).send({ Error: "User not found" });
    next();
  } catch (err) {
    return res.status(400).send({ err: "Authentication error" });
  }
};

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
                profile: profile || "",
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
        return res.status(503).send({ error: err.message });
      });
  } catch (err) {
    return res.status(504).send(err);
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

// export const getUser = async (req, res) => {
//   const { Username } = req.params;
//   try {
//     if (!Username) return res.status(501).send({ Error: "Invalid username" });

//     User.findOne({ Username }, (err, user) => {
//       if (err) return res.status(500).send({ err });
//       if (!user) return res.status(404).send({ Error: "User not found" });

//       return res.status(201).send("yo");
//     });
//   } catch (err) {
//     return res.status(404).send({ Error: "Couldnt find user" });
//   }
// };

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

      // const { Password, ...rest } = Object.assign({}, user.toJSON());

      // return res.status(201).send(rest);
      // const { Password, ...rest } = Object.assign({}, user.toJSON());

      const { Password, ...rest } = user.toJSON();

      return res.status(201).send(rest);
    });
  } catch (error) {
    return res.status(404).send({ error: "Cannot Find User Data" });
  }
}

export const updateUser = async (req, res) => {
  res.json("getUser route");
};
export const generateOTP = async (req, res) => {
  res.json("getUser route");
};
export const verifyOTP = async (req, res) => {
  res.json("getUser route");
};
export const createResetSession = async (req, res) => {
  res.json("getUser route");
};
export const resetPassword = async (req, res) => {
  res.json("getUser route");
};
