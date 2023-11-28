import { Box, Card, IconButton, Stack, Typography } from "@mui/material";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { formatDate } from "../helpers/formatDate";
import { Colors } from "../Theme";
const Transaction = ({ transaction, onDelete }) => {
  return (
    <Card sx={{ marginBottom: "0.5rem" }}>
      <Box
        bgcolor={transaction.type === "income" ? Colors.income : Colors.expense}
        display="flex"
        p={0.5}
        justifyContent="space-between"
      >
        <Stack pl={1}>
          <Typography fontWeight="bold">{transaction.description}</Typography>
          <Typography>{formatDate(transaction.date)}</Typography>
        </Stack>
        <Box display="flex" alignItems="center">
          <Typography color="primary" fontWeight="bold">
            {transaction.amount} EUR
          </Typography>
          <IconButton onClick={onDelete}>
            <DeleteIcon color="error" />
          </IconButton>
        </Box>
      </Box>
    </Card>
  );
};

export default Transaction;
