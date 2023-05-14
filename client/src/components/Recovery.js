import * as React from "react";
import "../styles/Username.css";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import toast, { Toaster } from "react-hot-toast";
import { useState, useEffect } from "react";
// import PasswordValidate from "../helper/validate.js";
import { useAuthStore } from "../store/store";
import { generateOTP, verifyOTP } from "../helper/helper";
import { useNavigate } from "react-router-dom";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function Recovery() {
  let navigate = useNavigate();
  const { Username } = useAuthStore((state) => state.auth);
  const [OTP, setOTP] = useState();
  console.log(`Username is ${Username} at recovery`);

  useEffect(() => {
    generateOTP(Username).then((OTP) => {
      console.log(OTP);
      if (OTP) return toast.success("OTP has been send to your email!");
      return toast.error("Problem while generating OTP!");
    });
  }, [Username]);

  // React.useEffect(() => {
  //   generateOTP(Username).then((OTP) => {
  //     console.log(OTP);

  //     if (OTP) return toast.success("OTP Sent");
  //     return toast.error("OTP Failed");
  //   });
  // }, [Username]);

  // sending otp
  async function onSubmit(e) {
    e.preventDefault();
    try {
      let { status } = await verifyOTP({ Username, code: OTP });
      if (status === 201) {
        toast.success("Verify Successfully!");
        return navigate("/reset");
      }
    } catch (error) {
      return toast.error("Wront OTP! Check email again!");
    }
  }
  // resend otp
  const resentOTP = () => {
    let sendPromise = generateOTP(Username);
    toast.promise(sendPromise, {
      loading: "success",
      success: "OTP sent successfully",
      error: "OTP sent failed",
    });
    sendPromise.then((OTP) => {
      console.log(OTP);
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Toaster />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h2" variant="h5">
            Recovery
          </Typography>
          <Typography variant="h6" component="h2" style={{ color: "gray" }}>
            Enter OTP to request password
          </Typography>

          <Box>
            <Typography className="otp-text" style={{ marginTop: "75px" }}>
              Enter 6 digit OTP sent to your email addess
            </Typography>

            <TextField
              // onSubmit={onSubmit}
              margin="normal"
              fullWidth
              id="Password"
              // label="Pacvssword"
              name="Password"
              autoComplete="Password"
              type="text"
              placeholder="OTP"
              // later change type to password
              autoFocus
              required
              onChange={(e) => setOTP(e.target.value)}
            />
            <form className="pt-20" onSubmit={onSubmit}>
              <div className="textbox flex flex-col items-center gap-6">
                <div className="input text-center">
                  <span className="py-4 text-sm text-left text-gray-500">
                    Enter 6 digit OTP sent to your email address.
                  </span>
                  <input
                    onChange={(e) => setOTP(e.target.value)}
                    className=""
                    type="text"
                    placeholder="OTP"
                  />
                </div>

                <button className="" type="submit">
                  Recover
                </button>
              </div>
            </form>

            {/* <TextField
              id="input-with-icon-textfield"
              label="TextField"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
              variant="standard"
            /> */}
            {/* <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            /> */}
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <br></br>
            <Grid container>
              {/* <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid> */}
              <Grid item>
                <Link
                  //href="http://localhost:3000/reset"
                  variant="body2"
                  onClick={resentOTP}
                >
                  {"Cant get OTP? Resend "}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
