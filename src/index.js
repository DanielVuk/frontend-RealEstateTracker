import { CssBaseline, ThemeProvider } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Auth from "../src/pages/Auth";
import { Theme } from "./Theme";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={Theme}>
      <CssBaseline>
        <Auth />
      </CssBaseline>
    </ThemeProvider>
  </React.StrictMode>
);
