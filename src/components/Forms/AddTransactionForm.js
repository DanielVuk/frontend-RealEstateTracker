import {
  Button,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
const AddTransactionForm = ({ open, onAddTransaction }) => {
  const [type, setType] = useState("income");
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState("");

  useEffect(() => {
    setType("income");
    setAmount("");
    setDescription("");
  }, [open]);

  const handleType = (event, newType) => {
    if (newType === null) return;

    setType(newType);
  };

  const handleSubmit = () => {
    onAddTransaction({ type, amount, description });
  };
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        handleSubmit();
      }}
    >
      <Stack>
        <Typography variant="h6">Add new transaction</Typography>

        <ToggleButtonGroup
          exclusive
          fullWidth
          onChange={handleType}
          sx={{ marginY: "25px" }}
          value={type}
        >
          <ToggleButton value="income" color="success">
            <Typography>Income</Typography>
          </ToggleButton>
          <ToggleButton value="expense" color="error">
            <Typography>Expense</Typography>
          </ToggleButton>
        </ToggleButtonGroup>

        <TextField
          inputProps={{
            min: 0,
          }}
          label="Amount"
          onChange={(e) => setAmount(e.target.value)}
          placeholder="amount"
          required
          sx={{ mb: 2 }}
          type="number"
          value={amount}
        />

        <TextField
          label="Description"
          placeholder="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <Button type="submit">ADD</Button>
      </Stack>
    </form>
  );
};

export default AddTransactionForm;
