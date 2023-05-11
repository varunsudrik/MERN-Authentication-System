import * as React from "react";
import "../styles/Username.css";
import InputAdornment from "@mui/material/InputAdornment";
import AccountCircle from "@mui/icons-material/AccountCircle";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useFormik } from "formik";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
// import PasswordValidate from "../helper/validate.js";
import { PasswordValidate } from "../helper/validate";
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

  React.useEffect(() => {
    generateOTP(Username).then((OTP) => {
      if (OTP) return toast.success("OTP Sent");
      return toast.error("OTP Failed");
    });
  }, [Username]);

  // sending otp
  const onSubmit = async (e) => {
    e.preventDefault();
    let { status } = await verifyOTP({ Username, code: OTP });
    if (status === 201) {
      toast.success("Successfully Verified");
      return navigate("/reset");
    }
    return toast.error("Invalid OTP");
  };

  // resend otp
  const resentOTP = () => {
    let sendPromise = generateOTP(Username);
    toast.promise(sendPromise);
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
                <Link href="http://localhost:3000/reset" variant="body2">
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
