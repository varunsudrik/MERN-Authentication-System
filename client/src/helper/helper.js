import axios from "axios";

//authenication
export const authenticate = async (Username) => {
  try {
    return axios.post("/api/authenticate", { Username });
  } catch (error) {
    return { error: "Username dont exist" };
  }
};

// get user information
export const getUser = async ({ Username }) => {
  try {
    const { data } = axios.get(`/api/user/${Username}`);
    return { data };
  } catch (error) {
    return { error: "Password not valid" };
  }
};

// register user
export const registerUser = async (credentials) => {
  try {
    const {
      data: { msg },
      status,
    } = axios.post("/api/register", credentials);
    let { Username, email } = credentials;

    // send mail
    if (status === 201) {
      await axios.post("/api/registerMail", {
        Username,
        userEmail: email,
        text: msg,
      });
    }
    return Promise.resolve(msg);
  } catch (error) {
    return Promise.reject({ error });
  }
};

// login
export const login = async ({ Username, Password }) => {
  try {
    if (Username) {
      const { data } = await axios.post("/api/login", { Username, Password });
      return Promise.resolve(data);
    }
  } catch (error) {
    return Promise.reject({ error });
  }
};

// update user
export const updateuser = async (response) => {
  try {
    const token = await localStorage.getItem("token");
    const data = await axios.put("/api/updateuser", response, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return Promise.resolve(data);
  } catch (error) {
    Promise.reject({ error: "Couldn't update user" });
  }
};

export const generateOTP = async (Username) => {
  try {
    const {
      data: { code },
      status,
    } = await axios.put("/api/generate", { params: { Username } });
    // send mail
    if (status === 201) {
      let {
        data: { email },
      } = await getUser({ Username });
      let text = `Your Password Recovery OTP is ${code}. Verify and recover your password`;
      await axios.post(`/api/registerMail`, {
        Username,
        userEmail: email,
        text,
        subject: "Password Recovery",
      });
    }
    return Promise.resolve(code);
  } catch (err) {
    Promise.reject({ err });
  }
};