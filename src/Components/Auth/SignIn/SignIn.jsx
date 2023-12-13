import * as React from "react";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import * as Yup from "yup";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  Box,
  TextField,
  InputAdornment,
  IconButton,
  Button,
  Typography,
} from "@mui/material";
import "./signin.css";
import { useHistory } from "react-router-dom";
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
        Sales Dashboard
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function SignIn() {
  const initialValuesSignIn = {
    username: "",
    password: "",
  };

  const SignInSchema = () => {
    return Yup.object().shape({
      username: Yup.string()
        .email("Invalid Email")
        .required("Email Is Required"),
      password: Yup.string()
        .min(6, "Password Must Be Atleast 6 Characters")
        .required("Password Is Required"),
    });
  };
  const history = useHistory();
  function handleSignInFormSubmit(params) {
    console.log("params", params);
    history.push("/dashboard");
  }
  const [showPassword, setshowPassword] = React.useState(false);

  function handleClickShowPassword(params) {
    setshowPassword(!showPassword);
  }
  return (
    <ThemeProvider theme={defaultTheme}>
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
            Sign in
          </Typography>
          <Box sx={{ mt: 1 }}>
            <Formik
              initialValues={initialValuesSignIn}
              validationSchema={SignInSchema()}
              onSubmit={handleSignInFormSubmit}
            >
              <Form>
                <Field
                  name="username"
                  as={TextField}
                  variant="outlined"
                  fullWidth
                  helperText={
                    <ErrorMessage
                      name="username"
                      component="Box"
                      className="error-message"
                    />
                  }
                  id="txtuseremailid"
                  InputProps={{}}
                  label="User Email"
                  InputLabelProps={{
                    shrink: true,
                    required: true,
                  }}
                  sx={{
                    mt: "5%",
                    minHeight: "80px",
                  }}
                />
                <Field
                  sx={{
                    mt: "5%",

                    minHeight: "80px",
                  }}
                  name="password"
                  as={TextField}
                  variant="outlined"
                  fullWidth
                  helperText={
                    <ErrorMessage
                      name="password"
                      component="Box"
                      className="error-message"
                    />
                  }
                  type={showPassword ? "text" : "password"}
                  label={"Password"}
                  id="txtuserpassword"
                  InputLabelProps={{
                    shrink: true,
                    required: true,
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          edge="end"
                          id="togglePasswordVisibility"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />{" "}
                <Button
                  sx={{
                    backgroundColor: "#1206f9",
                    m: "4%",
                  }}
                  id="btnSignin"
                  variant="contained"
                  type="submit"
                >
                  Login
                </Button>
              </Form>
            </Formik>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
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
