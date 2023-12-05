import { Box, Card, IconButton, Stack, Typography } from "@mui/material";
import React from "react";
import { formatDate } from "../helpers/formatDate";
import GetIcon from "./GetIcon";

const Project = ({ project, onDelete, onComplete, onSelect, selected }) => {
  return (
    <Card
      onClick={onSelect}
      sx={{
        alignItems: "center",
        borderRadius: 5,
        boxShadow: 3,
        display: "flex",
        mb: 1,
        minWidth: "400px",
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
          alignItems: "center",
          border: "4px solid",
          borderColor: "primary.main",
          borderRadius: "25px",
          height: "50px",
          justifyContent: "center",
          width: "55px",
        }}
      >
        {project.status === "in progress" ? (
          <GetIcon iconName="Build" color="primary.main" size="medium" />
        ) : (
          <GetIcon iconName="Done" color="primary.main" size="medium" />
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
            <GetIcon iconName="Delete" color="error.main" />
          </IconButton>
          {project.status === "in progress" && (
            <IconButton
              onClick={onComplete}
              sx={{
                backgroundColor: "background.default",
                ml: 1,
              }}
            >
              <GetIcon iconName="Done" color="primary.main" />
            </IconButton>
          )}
        </Box>
      </Box>
    </Card>
  );
};

export default Project;
