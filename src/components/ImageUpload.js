import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Button, Grid, IconButton, Typography } from "@mui/material";
import React from "react";

const ImageUpload = ({ images, onImageChange }) => {
  console.log("PRIKAZ:::", images);

  const handleFileChange = (e) => {
    const selectedFilesArray = Array.from(e.target.files);

    onImageChange([...images, ...selectedFilesArray]);
  };

  const handleRemoveImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    onImageChange(newImages);
  };

  const removeAllImages = () => {
    onImageChange([]);
  };

  return (
    <Box>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileChange}
        id="image-upload"
        style={{ display: "none" }}
      />
      <label htmlFor="image-upload">
        <Button
          variant="contained"
          component="span"
          startIcon={<AddAPhotoIcon />}
          sx={{ marginTop: "2rem" }}
        >
          Add Images
        </Button>
      </label>
      {images.length > 0 && (
        <Box>
          <Typography variant="h6">Selected Images:</Typography>
          <Grid container spacing={1}>
            {images &&
              images.map((image, index) => (
                <Grid item key={index}>
                  <Box position="relative">
                    {image instanceof File ? (
                      <img
                        src={URL.createObjectURL(image)}
                        alt={`${index}`}
                        height="100"
                      />
                    ) : (
                      <img src={image} alt={`${index}`} height="100" />
                    )}
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => handleRemoveImage(index)}
                      sx={{ position: "absolute", top: 0, right: 0 }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Grid>
              ))}
          </Grid>
          <Button variant="outlined" onClick={removeAllImages}>
            Remove All Images
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default ImageUpload;
