import { Button, Stack, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

const AddProjectForm = ({ onAddProject, open }) => {
  const [name, setName] = useState("");

  useEffect(() => {
    setName("");
  }, [open]);

  const handleSubmit = () => {
    onAddProject({ name });
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
          onChange={(e) => setName(e.target.value)}
          placeholder="Project name"
          required
          type="text"
          value={name}
        />

        <Button type="submit">ADD</Button>
      </Stack>
    </form>
  );
};

export default AddProjectForm;
