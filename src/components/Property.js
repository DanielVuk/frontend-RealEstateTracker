import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React from "react";
import image from "../assets/kuca.jpeg";

const Property = ({ property }) => {
  return (
    <Card sx={{ maxWidth: "300px" }}>
      <CardMedia component="img" src={image} />
      <CardContent>
        <Typography variant="h6">$ {property.price}</Typography>
        <Typography>
          {property.place.city}, {property.place.adress}, {property.place.zip}
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          mt: -3,
          width: "100%",
        }}
      >
        <Button size="small">EDIT</Button>
        <Button size="small">DELETE</Button>
      </CardActions>
    </Card>
  );
};

export default Property;
