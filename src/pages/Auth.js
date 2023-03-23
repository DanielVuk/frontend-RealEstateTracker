import {
  Box,
  Button,
  Divider,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import EmailIcon from "@mui/icons-material/Email";
import React, { useState } from "react";
import logo from "../assets/logo.png";
import { useTheme } from "@mui/material/styles";
import LockIcon from "@mui/icons-material/Lock";
import LockResetIcon from "@mui/icons-material/LockReset";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const Auth = () => {
  const theme = useTheme();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmationPass, setConfirmationPass] = useState("");

  const submit = async (event) => {
    event.preventDefault();

    try {
      console.log("email: ", email);
      console.log("password: ", password);
      console.log("confirmation: ", confirmationPass);
    } catch (error) {}
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
      ></Box>
      <Box
        bgcolor="white"
        border="solid 1px"
        borderColor={theme.palette.primary.main}
        borderRadius={3}
        boxShadow="5"
        mt="5vh"
        p={5}
        sx={{ maxWidth: { xs: "350px", md: "500px" } }}
      >
        <Typography variant="h6">
          {isLogin ? "Login" : "Create account"}
        </Typography>
        <Divider sx={{ marginBottom: "20px" }} />
        <Box component="form" onSubmit={submit}>
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
          ></TextField>
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
                    <LockResetIcon color="primary"></LockResetIcon>
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
    </Stack>
  );
};

export default Auth;
