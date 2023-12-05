import { createTheme } from "@mui/material/styles";

export const Colors = {
  background: "#FFF9F8",
  expense: "#ffcccc",
  income: "#ccff99",
  primary: "#EA5E34",
  secondary: "#58D7FF",
};

export const Theme = createTheme({
  palette: {
    background: {
      default: Colors.background,
    },
    primary: {
      main: Colors.primary,
    },
    secondary: {
      main: Colors.secondary,
    },
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 5,
          color: Colors.primary,
          fontWeight: 600,
          margin: "5px 0",
        },
      },
    },
  },
});
