import axios from "axios";
import jwt_decode from "jwt-decode";

axios.defaults.baseURL = process.env.REACT_APP_BACKEND;

// username from token
export const getUsername = async () => {
  const token = localStorage.getItem("token");
  if (!token) return Promise.reject("Token not found");
  let decode = jwt_decode(token);
  return decode;
};

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
    } = await axios.post("/api/register", credentials);
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

/** login function */
export async function verifyPassword({ Username, Password }) {
  try {
    console.log(Username);

    if (Username) {
      const { data } = await axios.post("/api/login", { Username, Password });
      return Promise.resolve({ data });
    }
  } catch (error) {
    return Promise.reject({ error: "Password doesn't Match...!" });
  }
}

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

export async function generateOTP(Username) {
  try {
    const {
      data: { code },
      status,
      // } = await axios.get("/api/generateOTP", { params: { Username } });
    } = await axios.get(`/api/generateOTP?Username=${Username}`);

    // send mail with the OTP
    if (status === 201) {
      let {
        data: { email },
      } = await getUser({ Username });
      let text = `Your Password Recovery OTP is ${code}. Verify and recover your password.`;
      await axios.post("/api/registerMail", {
        Username,
        userEmail: email,
        text,
        subject: "Password Recovery OTP",
      });
    }
    return Promise.resolve(code);
  } catch (error) {
    return Promise.reject({ error });
  }
}

// export const generateOTP = async (Username) => {
//   try {
//     const {
//       data: { code },
//       status,
//     } = await axios.get("/api/generateOTP", { params: { Username } });
//     // send mail
//     if (status === 201) {
//       let {
//         data: { email },
//       } = await getUser({ Username });
//       let text = `Your Password Recovery OTP is ${code}. Verify and recover your password`;
//       await axios.post(`/api/registerMail`, {
//         Username,
//         userEmail: email,
//         text,
//         subject: "Password Recovery",
//       });
//     }
//     return Promise.resolve(code);
//   } catch (err) {
//     Promise.reject({ err });
//   }
// };

export const verifyOTP = async ({ Username, code }) => {
  try {
    const { data, status } = await axios.get("/api/verifyOTP", {
      params: { Username, code },
    });
    return { data, status };
  } catch (error) {
    return Promise.reject(error);
  }
};

export const resetPassword = async ({ Username, Password }) => {
  try {
    const { data, status } = axios.put("/api/resetPassword", {
      Username,
      Password,
    });
    return Promise.resolve({ data, status });
  } catch (error) {
    return Promise.reject({ error });
  }
};
