import { Box, ButtonBase, IconButton, Stack, Typography } from "@mui/material";
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import DeleteIcon from "@mui/icons-material/Delete";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import { Context } from "../Store";
import { deleteProperty } from "../services/propertyServices";

const Property = ({ property }) => {
  const [state, setState] = useContext(Context);
  const navigate = useNavigate();

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

  const handleEditProperty = async (property) => {
    navigate(`/edit-real-estate/${property._id}`);
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
          maxHeight={110}
          maxWidth={185}
          src={property.imageUrls[0]}
        />
      </ButtonBase>
      <Stack ml={2} width="100%">
        <Typography color="primary" component={Link} to="properties">
          {property.location.city}, {property.location.street},
          {property.location.zip}
        </Typography>
        <Typography>Land area: {property.area} m2</Typography>
        <Typography>
          Purchase date: {new Date(property.purchaseDate).toLocaleDateString()}
        </Typography>
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
              onClick={() => handleEditProperty(property)}
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
