import { Fade, CircularProgress } from "@mui/material";

const LoadingSpinner = ({ loading }) => {
  return (
    <Fade in={loading}>
      <CircularProgress
        disableShrink
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          zIndex: "tooltip",
        }}
      />
    </Fade>
  );
};

export default LoadingSpinner;
