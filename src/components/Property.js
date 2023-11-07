import { Box, ButtonBase, IconButton, Stack, Typography } from "@mui/material";
import React from "react";
import image from "../assets/kuca.jpeg";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditRoundedIcon from "@mui/icons-material/EditRounded";

const Test = ({ property }) => {
  return (
    <Box border="1px solid #d0d0ce" p={2} display="flex">
      <ButtonBase
        onClick={() => {
          console.log("idi na nekretninu");
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
          Porec, Brajde 39, 52465
        </Typography>
        <Typography>Land area: 54 m2</Typography>
        <Typography>Purchase date: 23.12.1999s</Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h6">120000€</Typography>
          <Box display="flex">
            <IconButton sx={{ backgroundColor: "background.default" }}>
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

export default Test;
