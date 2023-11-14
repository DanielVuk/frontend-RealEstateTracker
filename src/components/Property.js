import { Box, ButtonBase, IconButton, Stack, Typography } from "@mui/material";
import React, { useContext } from "react";
import { Link } from "react-router-dom";

import DeleteIcon from "@mui/icons-material/Delete";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import { Context } from "../Store";
import image from "../assets/kuca.jpeg";
import { deleteProperty } from "../services/propertyServices";

const Property = ({ property }) => {
  const [state, setState] = useContext(Context);
  const handleDeleteProperty = async (property) => {
    try {
      setState({ ...state, loading: true });

      let response = await deleteProperty(
        localStorage.getItem("token"),
        property._id
      );

      if (response.data._id === property._id) {
        setState({
          ...state,
          properties: state.properties.filter((p) => p._id !== property._id),
          loading: false,
        });
      }
    } catch (error) {
      console.log(error);
      setState({ ...state, loading: false });
    }
  };

  return (
    <Box border="1px solid #d0d0ce" p={2} display="flex">
      <ButtonBase
        onClick={() => {
          console.log("NEKRETNINEA: ", property);
        }}
      >
        <Box
          borderRadius={1}
          component="img"
          maxHeight={200}
          maxWidth={185}
          src={image}
        />
      </ButtonBase>
      <Stack ml={2} width="100%">
        <Typography color="primary" component={Link} to="properties">
          {property.location.city}, {property.location.street},{" "}
          {property.location.zip}
        </Typography>
        <Typography>Land area: {property.area} m2</Typography>
        <Typography>Purchase date: 23.12.1999s</Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h6">{property.price}€</Typography>
          <Box display="flex">
            <IconButton
              onClick={() => handleDeleteProperty(property)}
              sx={{ backgroundColor: "background.default" }}
            >
              <DeleteIcon color="error" />
            </IconButton>
            <IconButton
              sx={{
                backgroundColor: "background.default",
                marginLeft: "15px",
              }}
            >
              <EditRoundedIcon color="primary" />
            </IconButton>
          </Box>
        </Box>
      </Stack>
    </Box>
  );
};

export default Property;
