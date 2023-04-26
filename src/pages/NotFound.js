import { Link } from "react-router-dom";
import { Button, Container, Typography } from "@mui/material";

const NotFound = () => {
  return (
    <Container
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        flexDirection: "column",
        textAlign: "center",
      }}
    >
      <Typography variant="h1" sx={{ mb: 4 }}>
        404
      </Typography>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Oops! Page not found
      </Typography>
      <Typography variant="body1" sx={{ mb: 4 }}>
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </Typography>
      <Button variant="contained" component={Link} to="/" size="large">
        Go to Home
      </Button>
    </Container>
  );
};

export default NotFound;
