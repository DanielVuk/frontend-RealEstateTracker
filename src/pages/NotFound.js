import { Link } from "react-router-dom";
import { Button, Container, Typography } from "@mui/material";

const NotFound = () => {
  return (
    <Container
      sx={{
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        justifyContent: "center",
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
        We couldn't find the page you were looking for.
      </Typography>
      <Button variant="contained" component={Link} to="/" size="large">
        Go to Home
      </Button>
    </Container>
  );
};

export default NotFound;
