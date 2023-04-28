import { Person, Visibility, VisibilityOff } from "@mui/icons-material";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import LockResetIcon from "@mui/icons-material/LockReset";
import {
  Alert,
  Box,
  Button,
  Divider,
  IconButton,
  InputAdornment,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import jwtDecode from "jwt-decode";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../Store";
import logo from "../assets/logo.png";
import { getUser, login, register } from "../services/userServices";

const Auth = () => {
  const navigate = useNavigate();
  const [state, setState] = useContext(Context);

  const [error, setError] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmationPass, setConfirmationPass] = useState("");

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/", { replace: true });
    }
  }, []);

  const submit = async (event) => {
    event.preventDefault();

    try {
      setState({ ...state, loading: true });
      if (isLogin) {
        console.log("Korisnik se logira");
        let response = await login(email, password);
        localStorage.setItem("token", response.data);
        let decoded = jwtDecode(response.data);
        localStorage.setItem("tokenExpiration", decoded.exp);

        response = await getUser(response.data);

        await setState({
          ...state,
          user: {
            name: response.data.name,
            email: response.data.email,
            id: response.data._id,
          },
          loading: false,
        });

        navigate("/", { replace: true });
      } else {
        console.log("Korisnik se registrira");
        if (password !== confirmationPass) {
          setError("The confirmation password is incorrect.");
          setOpenSnackBar(true);
          setState({ ...state, loading: false });
          return;
        }

        let response = await register(name, email, password);
        localStorage.setItem("token", response.headers["x-auth-token"]);

        let decoded = jwtDecode(localStorage.getItem("token"));
        localStorage.setItem("tokenExpiration", decoded.exp);

        let result = await getUser(localStorage.getItem("token"));

        await setState({
          ...state,
          user: {
            name: result.data.name,
            email: result.data.email,
            id: result.data._id,
          },
          loading: false,
        });
        navigate("/", { replace: true });
      }
    } catch (err) {
      setError(err.response.data);
      setOpenSnackBar(true);
      setState({ ...state, loading: false });
    }
  };

  return (
    <Stack
      alignItems="center"
      bgcolor="background"
      height="100vh"
      justifyContent="center"
    >
      <Box
        component="img"
        src={logo}
        sx={{
          maxWidth: { xs: "350px", md: "450px" },
          minWidth: { xs: "300px", md: "450px" },
        }}
      />
      <Box
        bgcolor="white"
        border="solid 1px"
        borderRadius={3}
        boxShadow="5"
        mt="5vh"
        p={5}
        sx={{
          maxWidth: { xs: "350px", md: "500px" },
          borderColor: (theme) => theme.palette.primary.main,
        }}
      >
        <Typography variant="h6">
          {isLogin ? "Login" : "Create account"}
        </Typography>
        <Divider sx={{ marginBottom: "20px" }} />
        <Box component="form" onSubmit={submit}>
          {!isLogin && (
            <TextField
              fullWidth
              onChange={(e) => setName(e.target.value)}
              placeholder="Username"
              required
              value={name}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person color="primary"></Person>
                  </InputAdornment>
                ),
              }}
            />
          )}
          <TextField
            fullWidth
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            type="email"
            value={email}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon color="primary"></EmailIcon>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            fullWidth
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            type={showPassword ? "text" : "password"}
            value={password}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon color="primary"></LockIcon>
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? (
                      <VisibilityOff color="primary" />
                    ) : (
                      <Visibility color="primary" />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          ></TextField>
          {!isLogin && (
            <TextField
              fullWidth
              onChange={(e) => setConfirmationPass(e.target.value)}
              placeholder="Confirm password"
              required
              type={showPassword ? "text" : "password"}
              value={confirmationPass}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockResetIcon color="primary" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? (
                        <VisibilityOff color="primary" />
                      ) : (
                        <Visibility color="primary" />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          )}
          <Button
            fullWidth
            size="large"
            sx={{ textTransform: "none", marginTop: "5px" }}
            type="submit"
            variant="contained"
          >
            Submit
          </Button>
          <Stack alignItems="center" direction="row">
            <Typography>
              {isLogin
                ? "Don't have an account? Create one now"
                : "Already have an account?"}
            </Typography>
            <Button
              variant="text"
              onClick={() => {
                setIsLogin(!isLogin);
                setEmail("");
                setPassword("");
                setConfirmationPass("");
              }}
            >
              {isLogin ? "Register" : "Login"}
            </Button>
          </Stack>
        </Box>
      </Box>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        autoHideDuration={6000}
        onClose={() => setOpenSnackBar(false)}
        open={openSnackBar}
      >
        <Alert severity="error">{error}</Alert>
      </Snackbar>
    </Stack>
  );
};

export default Auth;
