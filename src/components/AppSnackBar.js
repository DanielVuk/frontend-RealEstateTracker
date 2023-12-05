import { Alert, Snackbar } from "@mui/material";
import { useState } from "react";

const useSnackBar = () => {
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [message, setMessage] = useState();
  const [severity, setSeverity] = useState("success");

  const openSnackBarHelper = (message, severity) => {
    setMessage(message);
    setSeverity(severity);
    setOpenSnackBar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackBar(false);
  };

  const SnackBar = () => {
    return (
      <Snackbar
        open={openSnackBar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert severity={severity}>{message}</Alert>
      </Snackbar>
    );
  };

  return {
    openSnackBarHelper,
    SnackBar,
  };
};

export default useSnackBar;
