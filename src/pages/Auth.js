import {
  Box,
  Button,
  Divider,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import jwtDecode from "jwt-decode";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context, initialState } from "../Store";
import logo from "../assets/logo.png";
import useSnackBar from "../components/AppSnackBar";
import GetIcon from "../components/GetIcon";
import { getUser, login, register } from "../services/userServices";

const Auth = () => {
  const navigate = useNavigate();
  const [state, setState] = useContext(Context);

  const { SnackBar, openSnackBarHelper } = useSnackBar();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmationPass, setConfirmationPass] = useState("");

  useEffect(() => {
    if (localStorage.getItem("token")) {
      const expiresIn =
        localStorage.getItem("tokenExpiration") * 1000 - new Date().getTime();

      if (expiresIn < 0) {
        setState(initialState);
        localStorage.clear();
      } else {
        setTimeout(() => {
          setState(initialState);
          localStorage.clear();
        }, expiresIn);
      }

      navigate("/", { replace: true });
    }
  }, []);

  const submit = async (event) => {
    event.preventDefault();

    try {
      setState({ ...state, loading: true });
      if (isLogin) {
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
          openSnackBarHelper(
            "The confirmation password is incorrect.",
            "error"
          );

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
      console.log(err);
      openSnackBarHelper(err.response?.data || err.message, "error");

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
                    <GetIcon
                      iconName="Person"
                      color="primary.main"
                      size="medium"
                    />
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
                  <GetIcon
                    iconName="Email"
                    color="primary.main"
                    size="medium"
                  />
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
                  <GetIcon iconName="Lock" color="primary.main" size="medium" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? (
                      <GetIcon iconName="VisibilityOff" color="primary.main" />
                    ) : (
                      <GetIcon iconName="Visibility" color="primary.main" />
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
                    <GetIcon
                      iconName="LockReset"
                      color="primary.main"
                      size="medium"
                    />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? (
                        <GetIcon
                          iconName="VisibilityOff"
                          color="primary.main"
                        />
                      ) : (
                        <GetIcon iconName="Visibility" color="primary.main" />
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
      <SnackBar />
    </Stack>
  );
};

export default Auth;
