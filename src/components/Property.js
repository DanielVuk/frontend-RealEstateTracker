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
    <Card>
      <CardMedia component="img" src={image} />
      <CardContent>
        <Typography variant="h6" fontWeight="bold">
          $ {property.price}
        </Typography>
        <Typography>
          {property.place.city}, {property.place.adress}, {property.place.zip}
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          mt: -3,
          flexDirection: "column",
          display: "flex",
          justifyContent: "flex-end",
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
