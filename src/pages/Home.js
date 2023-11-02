import { Button, Container, Grid } from "@mui/material";
import React, { useContext } from "react";
import { Context } from "../Store";

import InfoCard from "../components/InfoCard";
import { Data } from "../data";
import Property from "../components/Property";
import Carousel from "react-elastic-carousel";

const breakPointsForProperties = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 1 },
  { width: 768, itemsToShow: 6 },
  { width: 1200, itemsToShow: 8 },
];

const Home = () => {
  const [state] = useContext(Context);
  console.log("HOME PAGE: ", state.user?.name, "    ", state.user?.email);
  return (
    <Container maxWidth="fluid">
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6} md={4}>
          <InfoCard title="Total propertys: " desc="0/5" />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <InfoCard title="Total propertys: " desc="0/5" />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <InfoCard title="Total propertys: " desc="0/5" />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <InfoCard title="Total propertys: " desc="0/5" />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <InfoCard title="Total propertys: " desc="0/5" />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <InfoCard title="Total propertys: " desc="0/5" />
        </Grid>
      </Grid>

      <Carousel breakPoints={breakPointsForProperties} verticalMode>
        {Data.map((data) => (
          <Property
            key={data.id}
            onSelect={() => {
              console.log(data);
            }}
          />
        ))}
      </Carousel>
      {/* <Container maxWidth="lg">
        <Grid container spacing={4} mt={1}>
          <Grid item xs={12} sm={6} md={4}>
            <Button sx={{ width: "300px", height: "100%", bgcolor: "white" }}>
              ADD NEW
            </Button>
          </Grid>
          {Data.map((property, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Property property={property} />
            </Grid>
          ))}
        </Grid>
      </Container> */}
    </Container>
  );
};

export default Home;
