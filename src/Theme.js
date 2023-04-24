import { createTheme } from "@mui/material/styles";

const Colors = {
  primary: "#EA5E34",
  secondary: "#58D7FF",
  background: "#FFF9F8",
};

export const Theme = createTheme({
  palette: {
    primary: {
      main: Colors.primary,
    },
    secondary: {
      main: Colors.secondary,
    },
    background: {
      default: Colors.background,
    },
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          color: Colors.primary,
          fontWeight: 600,
          margin: "5px 0",
          borderRadius: 5,
        },
      },
    },
  },
});
