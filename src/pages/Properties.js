import { Container, Grid, Typography } from "@mui/material";
import React from "react";
import { Data } from "../data";
import Property from "../components/Property";

const Properties = () => {
  return (
    <Container>
      <Grid container spacing={4}>
        {Data.map((property, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Property property={property} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Properties;
