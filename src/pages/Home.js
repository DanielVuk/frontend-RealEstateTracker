import { Box, Container } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import React, { useContext } from "react";
import { Context } from "../Store";
import InfoCard from "../components/InfoCard";
import Property from "../components/Property";

const Home = () => {
  const [state] = useContext(Context);
  console.log("HOME PAGE: ", state.user?.name, "    ", state.user?.email);
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
          <Box bgcolor="white" boxShadow={1} height={300} width="100%">
            filtriranje
          </Box>
        </Grid>

        <Grid
          bgcolor="white"
          borderRadius={1}
          boxShadow={1}
          md={9}
          mt={1}
          p={2}
          xs={12}
        >
          <Property></Property>
          <Property></Property>
          <Property></Property>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
