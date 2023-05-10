import * as React from "react";
import "../styles/Username.css";
import InputAdornment from "@mui/material/InputAdornment";
import AccountCircle from "@mui/icons-material/AccountCircle";
// import { Link } from "react-router-dom";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
//import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useFormik } from "formik";
import toast, { Toaster } from "react-hot-toast";
// import PasswordValidate from "../helper/validate.js";
import { profileValidation } from "../helper/validate";
import { Link } from "react-router-dom";
import useFetch from "../hooks/fetch.hook";
import { useAuthStore } from "../store/store";
import { updateuser } from "../helper/helper";

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

export default function Profile() {
  const { Username } = useAuthStore((state) => state.auth);

  const [{ isLoading, apiData, serverError }] = useFetch(`/user/${Username}`);

  const formik = useFormik({
    initialValues: {
      FirstName: apiData?.FirstName || " ",
      LastName: apiData?.LastName || " ",
      Mobile: apiData?.Mobile || " ",
      email: apiData?.email || " ",
      Address: apiData?.Address || " ",
    },
    enableReinitialize: true,
    validate: profileValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      let updatePromise = updateuser(values);
      toast.promise(updatePromise, {
        loading: "Updating...",
        success: "Updated profile",
        error: "Error updating profile",
      });
    },
  });
  if (isLoading) return <h1>isLoading</h1>;
  if (serverError) return <h1>{serverError.message}</h1>;

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
            Profile
          </Typography>
          <Typography variant="h6" component="h2" style={{ color: "gray" }}>
            Update your details{" "}
          </Typography>

          <Box
            component="form"
            // onSubmit={handleSubmit}
            onSubmit={formik.handleSubmit}
            noValidate
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch" },
            }}
          >
            <div className="form-grid">
              <TextField
                margin="normal"
                fullWidth
                id="FirstName"
                label="FirstName"
                name="FirstName"
                type="text"
                // later change type to password
                autoFocus
                {...formik.getFieldProps("FirstName")}
                required
              />
              <TextField
                margin="normal"
                fullWidth
                id="LastName"
                label="LastName"
                name="LastName"
                type="text"
                // later change type to password
                autoFocus
                {...formik.getFieldProps("LastName")}
                required
              />
              <TextField
                margin="normal"
                fullWidth
                id="Mobile"
                label="Mobile No."
                name="Mobile"
                type="text"
                // later change type to password
                autoFocus
                {...formik.getFieldProps("Mobile")}
                required
              />
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
            </div>
            <div>
              {" "}
              <TextField
                style={{ width: "400px" }}
                margin="normal"
                //fullWidth
                id="Address"
                label="Address"
                name="Address"
                type="text"
                // later change type to password
                autoFocus
                {...formik.getFieldProps("Address")}
                required
              />
            </div>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Update
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
