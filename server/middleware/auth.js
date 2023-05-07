import jwt from "jsonwebtoken";
const JWT_KEY = "thisismyseckeyy";

const Auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    // retrive user details of logged in user
    const decodedToken = await jwt.verify(token, JWT_KEY);
    req.user = decodedToken;

    next();
  } catch (err) {
    return res.status(401).json({ error: "Authentication Failed" });
  }
};

export default Auth;

export const localVariables = (req, res, next) => {
  req.app.locals = {
    OTP: null,
    resetSession: true,
  };
  next();
};
