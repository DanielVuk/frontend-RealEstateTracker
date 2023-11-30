import ApartmentIcon from "@mui/icons-material/Apartment";
import CategoryIcon from "@mui/icons-material/Category";
import DeleteIcon from "@mui/icons-material/Delete";
import GarageOutlinedIcon from "@mui/icons-material/GarageOutlined";
import HouseIcon from "@mui/icons-material/House";
import LandscapeIcon from "@mui/icons-material/Landscape";
import StorefrontIcon from "@mui/icons-material/Storefront";

import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../Store";
import ImageUpload from "../components/ImageUpload";
import {
  addProperty,
  getPropertyById,
  updateProperty,
} from "../services/propertyServices";
import uploadImages from "../firebase/uploadImages";
import { useNavigate, useParams } from "react-router-dom";

const realEstateOptions = [
  { value: "Apartment", icon: <ApartmentIcon /> },
  { value: "House", icon: <HouseIcon /> },
  { value: "Land", icon: <LandscapeIcon /> },
  { value: "Garage", icon: <GarageOutlinedIcon /> },
  { value: "Commercial Property", icon: <StorefrontIcon /> },
  { value: "Other", icon: <CategoryIcon /> },
];

const AddProperty = ({ editMode = false }) => {
  const [state, setState] = useContext(Context);
  const { id } = useParams();
  const navigate = useNavigate();

  const [property, setProperty] = useState({
    type: "",
    location: { city: "", street: "", zip: "" },
    area: 0,
    price: 0,
    purchaseDate: new Date(),
    imageUrls: [],
    owners: [],
    contacts: [],
    projects: [],
    description: "",
  });

  const fetchData = async () => {
    try {
      if (editMode) {
        let result = await getPropertyById(localStorage.getItem("token"), id);
        console.log("DOBIVRENI PROPERTY: ", result);

        setProperty({
          type: result?.type || "",
          location: result?.location || { city: "", street: "", zip: "" },
          area: result?.area || 0,
          price: result?.price || 0,
          purchaseDate: result?.purchaseDate || new Date(),
          imageUrls: result?.imageUrls || [],
          owners: result?.owners || [],
          contacts: result?.contacts || [],
          projects: [],
          description: result?.description || "",
        });
      }
    } catch (error) {
      console.error("Error fetching property:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [editMode, id]);

  console.log("My property: ", property);

  const handleImageChange = (newImages) => {
    setProperty({ ...property, imageUrls: newImages });
  };

  const handleAddOwner = () => {
    const hasEmptyOwner = property.owners.some(
      (owner) => owner.name === "" || owner.share === ""
    );

    if (!hasEmptyOwner) {
      const totalShare = property.owners.reduce(
        (total, owner) => total + parseFloat(owner.share || 0),
        0
      );

      if (totalShare < 100) {
        setProperty({
          ...property,
          owners: [...property.owners, { name: "", share: "" }],
        });
      } else {
        console.error("Total ownership share must not exceed 100%.");
      }
    }
  };

  const handleRemoveOwner = (indexToRemove) => {
    setProperty({
      ...property,
      owners: [...property.owners].filter(
        (_, index) => index !== indexToRemove
      ),
    });
  };

  const handleAddContact = () => {
    let hasEmptyContact = property.contacts.some(
      (contact) => contact.name === "" || contact.number === ""
    );

    if (!hasEmptyContact) {
      setProperty({
        ...property,
        contacts: [...property.contacts, { name: "", number: "" }],
      });
    }
  };

  const handleRemoveContact = (indexToRemove) => {
    setProperty({
      ...property,
      contacts: [...property.contacts].filter(
        (_, index) => index !== indexToRemove
      ),
    });
  };

  const handleSubmit = async () => {
    try {
      setState({ ...state, loading: true });

      if (editMode) {
        //srediti slike za novo slanje
        let imageDownloadUrls = await uploadImages(property.imageUrls);

        let result = await updateProperty(localStorage.getItem("token"), id, {
          ...property,
          imageUrls: imageDownloadUrls,
        });

        setState((prevState) => ({
          ...prevState,
          properties: prevState.properties.map((p) =>
            p._id === id ? result : p
          ),
          loading: false,
        }));
        navigate("/");
        console.log("STATE NAKON UPDATE: ", state);
      } else {
        // pozvati upload images i proslijeti slike iz property
        // uploadimages obradi slike, poalje na firebase, vrati url slika za download
        let imageDownloadUrls = await uploadImages(property.imageUrls);

        // zovem backend, spremam property
        let result = await addProperty(localStorage.getItem("token"), {
          ...property,
          imageUrls: imageDownloadUrls,
        });
        console.log("RESULT: ", result.data);

        setState({
          ...state,
          properties: [...state.properties, { ...result.data }],
          loading: false,
        });
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      setState({ ...state, loading: false });
    }
  };

  return (
    <Container maxWidth="lg">
      <Typography mb={2} variant="h6">
        {editMode ? "Edit " : "Add "} Real Estate
      </Typography>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          handleSubmit();
        }}
      >
        <FormControl fullWidth variant="outlined">
          <InputLabel id="type-label">Real Estate Type</InputLabel>
          <Select
            id="type"
            label="Real Estate Type"
            labelId="type-label"
            onChange={(e) => setProperty({ ...property, type: e.target.value })}
            value={property.type}
            required
          >
            {realEstateOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {React.cloneElement(option.icon, { sx: { mb: -0.5, mr: 1 } })}
                {option.value}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Grid container my={4}>
          <TextField
            label="City"
            onChange={(e) =>
              setProperty({
                ...property,
                location: { ...property.location, city: e.target.value },
              })
            }
            placeholder="City"
            required
            sx={{ mr: 5 }}
            value={property.location.city}
            variant="standard"
          />
          <TextField
            label="Street"
            onChange={(e) =>
              setProperty({
                ...property,
                location: { ...property.location, street: e.target.value },
              })
            }
            placeholder="Street"
            required
            sx={{ mr: 5 }}
            value={property.location.street}
            variant="standard"
          />
          <TextField
            label="ZIP code"
            onChange={(e) =>
              setProperty({
                ...property,
                location: { ...property.location, zip: e.target.value },
              })
            }
            placeholder="ZIP code"
            required
            sx={{ mr: 5 }}
            value={property.location.zip}
            variant="standard"
          />
        </Grid>

        <Grid container>
          <TextField
            label="Area (m²)"
            onChange={(e) => setProperty({ ...property, area: e.target.value })}
            type="number"
            sx={{ mr: 5 }}
            value={property.area}
            variant="standard"
          />
          <TextField
            label="Price (EUR)"
            onChange={(e) =>
              setProperty({ ...property, price: e.target.value })
            }
            type="number"
            sx={{ mr: 5 }}
            value={property.price}
            variant="standard"
          />
          <TextField
            label="Purchase Date"
            onChange={(e) =>
              setProperty({
                ...property,
                purchaseDate: new Date(e.target.value).toLocaleDateString(),
              })
            }
            type="date"
            value={property.purchaseDate}
            variant="standard"
          />
        </Grid>
        <Typography fontWeight="bold" mt={2}>
          Attach Photos
        </Typography>
        <ImageUpload
          images={property.imageUrls}
          onImageChange={handleImageChange}
        />

        <Grid mb={5} container spacing={2} my={2}>
          <Grid item>
            <Typography fontWeight="bold" mb={2}>
              Owners information:
            </Typography>
            {property.owners.map((owner, index) => (
              <Box key={index}>
                <TextField
                  label="Owner's name:"
                  variant="outlined"
                  value={owner.name}
                  onChange={(e) => {
                    const newOwners = [...property.owners];
                    newOwners[index].name = e.target.value;
                    setProperty({ ...property, owners: newOwners });
                  }}
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          color="error"
                          onClick={() => handleRemoveOwner(index)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  label="Share (%)"
                  variant="outlined"
                  type="number"
                  value={owner.share}
                  onChange={(e) => {
                    const newOwners = [...property.owners];
                    newOwners[index].share = e.target.value;
                    setProperty({ ...property, owners: newOwners });
                  }}
                  fullWidth
                />
              </Box>
            ))}
            <Button variant="outlined" onClick={handleAddOwner}>
              Add Owner
            </Button>
          </Grid>
          {/* Unos kontakata */}
          <Grid item>
            <Typography fontWeight="bold" mb={2}>
              Contacts:
            </Typography>
            {property.contacts.map((contact, index) => (
              <Box display="flex" key={index}>
                <TextField
                  label="Contact Name"
                  onChange={(e) => {
                    const newContacts = [...property.contacts];
                    newContacts[index].name = e.target.value;
                    setProperty({ ...property, contacts: newContacts });
                  }}
                  sx={{ mr: 2 }}
                  value={contact.name}
                  variant="outlined"
                />
                <TextField
                  label="Contact Number"
                  value={contact.number}
                  variant="outlined"
                  onChange={(e) => {
                    const newContacts = [...property.contacts];
                    newContacts[index].number = e.target.value;
                    setProperty({ ...property, contacts: newContacts });
                  }}
                />
                <IconButton
                  onClick={() => handleRemoveContact(index)}
                  size="large"
                  color="error"
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            ))}
            <Button onClick={handleAddContact} variant="outlined">
              Add Contact
            </Button>
          </Grid>
        </Grid>
        <TextField
          label="Description"
          multiline
          rows={4}
          fullWidth
          onChange={(e) =>
            setProperty({ ...property, description: e.target.value })
          }
          value={property.description}
        />

        <Button type="submit" variant="contained">
          {editMode ? "Edit " : "Add "}
          Real Estate
        </Button>
      </form>
    </Container>
  );
};

export default AddProperty;
