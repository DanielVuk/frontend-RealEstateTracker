import { Box, Button, Container, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../Store";
import InfoCard from "../components/InfoCard";
import Property from "../components/Property";

const Home = () => {
  const [state] = useContext(Context);

  return (
    <Container maxWidth="lg">
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6} md={4}>
          <InfoCard title="Total propertys: " desc="0/5" />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <InfoCard title="Total projects: " desc="0/5" />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <InfoCard title="Total income: " desc="0/5" />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <InfoCard title="Asset value: " desc="0/5" />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <InfoCard title="Active projects: " desc="0/5" />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <InfoCard title="Total expenses: " desc="0/5" />
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid xs={12} md={3}>
          <Box bgcolor="white" boxShadow={1} width="100%">
            filtriranje
          </Box>
        </Grid>

        {state.properties.length > 0 ? (
          <Grid
            bgcolor="white"
            borderRadius={1}
            boxShadow={1}
            md={9}
            mt={1}
            p={2}
            xs={12}
          >
            <Link to="add-real-estate">
              <Button sx={{ mb: 1 }} variant="outlined">
                Add Real Estate
              </Button>
            </Link>
            {state.properties.map((property) => (
              <Property key={property._id} property={property} />
            ))}
          </Grid>
        ) : (
          <Typography mt={2}>
            There are not properties to show.
            <Link to="add-real-estate">
              <Button variant="outlined">Add Real Estate</Button>
            </Link>
          </Typography>
        )}
      </Grid>
    </Container>
  );
};

export default Home;
