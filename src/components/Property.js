import { Box, ButtonBase, IconButton, Stack, Typography } from "@mui/material";
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../Store";
import { formatCurrency } from "../helpers/formatCurrency";
import { formatDate } from "../helpers/formatDate";
import { deleteProperty } from "../services/propertyServices";
import useSnackBar from "./AppSnackBar";
import GetIcon from "./GetIcon";

const Property = ({ property }) => {
  const [state, setState] = useContext(Context);
  const { SnackBar, openSnackBarHelper } = useSnackBar();
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
      openSnackBarHelper("Property successfully deleted.", "success");
    } catch (error) {
      console.log(error);
      openSnackBarHelper(error.message, "error");
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
          navigate(`/property/${property._id}`);
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
        <Typography
          color="primary"
          component={Link}
          to={`/property/${property._id}`}
        >
          {property.location.city}, {property.location.street},
          {property.location.zip}
        </Typography>
        <Typography>Land area: {property.area} m2</Typography>
        <Typography>
          Purchase date: {formatDate(property.purchaseDate)}
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h6">{formatCurrency(property.price)}</Typography>
          <Box display="flex">
            <IconButton
              onClick={() => handleDeleteProperty(property)}
              sx={{ backgroundColor: "background.default" }}
            >
              <GetIcon iconName="Delete" color="error.main" />
            </IconButton>
            <IconButton
              onClick={() => handleEditProperty(property)}
              sx={{
                backgroundColor: "background.default",
                marginLeft: "15px",
              }}
            >
              <GetIcon iconName="Edit" color="primary.main" />
            </IconButton>
          </Box>
        </Box>
      </Stack>
      <SnackBar />
    </Box>
  );
};

export default Property;
