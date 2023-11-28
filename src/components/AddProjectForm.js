import { Button, Stack, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

const AddProjectForm = ({ onAddProject, open }) => {
  const [name, setName] = useState("");

  useEffect(() => {
    setName("");
  }, [open]);

  const handleSubmit = () => {
    onAddProject({ name });
    console.log("DODAJ PROJEKT   ");
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        handleSubmit();
      }}
    >
      <Stack>
        <Typography variant="h6">Add new project</Typography>
        <TextField
          type="text"
          placeholder="Project name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <Button type="submit">ADD</Button>
      </Stack>
    </form>
  );
};

export default AddProjectForm;
