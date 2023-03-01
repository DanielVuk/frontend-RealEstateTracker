import {
  Box,
  Button,
  Divider,
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

const Auth = () => {
  const theme = useTheme();
  const [isLogin, setIsLogin] = useState(true);
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
        <Box component="form">
          <TextField
            fullWidth
            placeholder="Email"
            required
            type="email"
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
            placeholder="Password"
            type="password"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon color="primary"></LockIcon>
                </InputAdornment>
              ),
            }}
          ></TextField>
          {!isLogin && (
            <TextField
              fullWidth
              placeholder="Confirm password"
              type="password"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockResetIcon color="primary"></LockResetIcon>
                  </InputAdornment>
                ),
              }}
            ></TextField>
          )}
          <Button
            fullWidth
            size="large"
            sx={{ textTransform: "none", marginTop: "5px" }}
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
            <Button variant="text" onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? "Register" : "Login"}
            </Button>
          </Stack>
        </Box>
      </Box>
    </Stack>
  );
};

export default Auth;
