import * as React from "react";
import "../styles/Username.css";
// import { Link } from "react-router-dom";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
//import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useFormik } from "formik";
import toast, { Toaster } from "react-hot-toast";
// import PasswordValidate from "../helper/validate.js";
import { registerValidation } from "../helper/validate";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../helper/helper";

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

export default function Register() {
  let navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "test123@gmail.com",
      Username: "test123",
      Password: "Admin@12345",
    },
    validate: registerValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      console.log(values);

      let registerPromise = registerUser(values);
      console.log(registerPromise);
      toast.promise(registerPromise, {
        loading: "Creating..",
        success: "Registered Successfully ...",
        error: "There was an error",
      });
      registerPromise.then(() => {
        navigate("/");
      });
      //return Promise.resolve(registerPromise);
    },
  });
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
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <Typography variant="h6" component="h2" style={{ color: "gray" }}>
            Happy to be registered
          </Typography>

          <Box
            component="form"
            // onSubmit={handleSubmit}
            onSubmit={formik.handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              fullWidth
              id="Email"
              label="Email"
              name="Email"
              autoComplete="Email"
              type="text"
              // later change type to password
              autoFocus
              {...formik.getFieldProps("email")}
              required
            />
            <TextField
              margin="normal"
              fullWidth
              id="Username"
              label="Username"
              name="Username"
              autoComplete="Username"
              type="text"
              // later change type to password
              autoFocus
              {...formik.getFieldProps("Username")}
              required
            />
            <TextField
              margin="normal"
              fullWidth
              id="Password"
              label="Password"
              name="Password"
              autoComplete="Password"
              type="text"
              // later change type to password
              autoFocus
              {...formik.getFieldProps("Password")}
              required
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
              Register
            </Button>
            <br></br>
            <Grid container>
              {/* <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid> */}
              <Grid item>
                {/* <Link href="http://localhost:3000/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link> */}
                <Link style={{ color: "#1976d2" }} variant="body2" to="/">
                  Already Registered? Login
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
