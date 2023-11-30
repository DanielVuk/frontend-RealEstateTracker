import BuildIcon from "@mui/icons-material/Build";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { Box, Card, IconButton, Stack, Typography } from "@mui/material";
import React from "react";
import { formatDate } from "../helpers/formatDate";
import DoneIcon from "@mui/icons-material/Done";
const Project = ({ project, onDelete, onComplete, onSelect, selected }) => {
  return (
    <Card
      onClick={onSelect}
      sx={{
        display: "flex",
        alignItems: "center",
        minWidth: "400px",
        borderRadius: 5,
        mb: 1,
        boxShadow: 3,
        padding: "15px",
        "&:hover": {
          cursor: "pointer",
          transition: "transform 0.5s",
          transform: "scale(1.03)",
        },
        transform:
          selected && selected._id === project._id ? "scale(1.03)" : null,
      }}
    >
      <Box
        mr={1}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "50px",
          width: "55px",
          border: "4px solid",
          borderColor: "primary.main",
          borderRadius: "25px",
        }}
      >
        {project.status === "in progress" ? (
          <BuildIcon sx={{ color: "primary.main" }} size="large" />
        ) : (
          <TaskAltIcon sx={{ color: "primary.main" }} size="large" />
        )}
      </Box>
      <Box display="flex" justifyContent="space-between" width="100%">
        <Stack>
          <Typography noWrap fontWeight="bold">
            {project.name}
          </Typography>
          <Typography noWrap>{formatDate(project.createdDate)}</Typography>
        </Stack>
        <Box>
          <IconButton
            onClick={onDelete}
            sx={{
              backgroundColor: "background.default",
            }}
          >
            <DeleteIcon color="error" />
          </IconButton>
          {project.status === "in progress" && (
            <IconButton
              onClick={onComplete}
              sx={{
                backgroundColor: "background.default",
                margin: "3px 15px",
              }}
            >
              <DoneIcon color="primary" />
            </IconButton>
          )}
        </Box>
      </Box>
    </Card>
  );
};

export default Project;
