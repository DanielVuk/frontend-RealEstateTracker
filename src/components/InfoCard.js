import { Box, Paper, Stack, Typography } from "@mui/material";
import React from "react";
import GetIcon from "./GetIcon";

const InfoCard = ({ title, desc, iconName = null }) => {
  return (
    <Paper
      sx={{
        alignItems: "center",
        bgcolor: "white",
        display: "flex",
        justifyContent: iconName ? "none" : "center",
        p: 1,
      }}
    >
      <Box
        mr={2}
        sx={{
          alignItems: "center",
          backgroundColor: "secondary.dark",
          borderRadius: 1,
          display: iconName ? "flex" : "none",
          height: "64px",
          justifyContent: "center",
          width: "70px",
        }}
      >
        <GetIcon iconName={iconName} size="medium" />
      </Box>
      <Stack mt={1} alignItems="center">
        <Typography fontWeight="bold">{title}</Typography>
        <Typography noWrap>{desc}</Typography>
      </Stack>
    </Paper>
  );
};

export default InfoCard;
