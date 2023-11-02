import { AttachMoney } from "@mui/icons-material";
import { Box, IconButton, Paper, Stack, Typography } from "@mui/material";
import React from "react";

const InfoCard = ({ title, desc }) => {
  return (
    <Paper sx={{ bgcolor: "white", display: "flex", p: 1 }}>
      <Box
        mr={2}
        sx={{
          alignItems: "center",
          backgroundColor: "#17A2B8",
          borderRadius: 1,
          display: "flex",
          height: "64px",
          justifyContent: "center",
          width: "70px",
        }}
      >
        <IconButton sx={{ color: "#fff" }}>
          <AttachMoney fontSize="large" />
        </IconButton>
      </Box>
      <Stack mt={1}>
        <Typography fontWeight="bold">{title}</Typography>
        <Typography noWrap>{desc}</Typography>
      </Stack>
    </Paper>
  );
};

export default InfoCard;
