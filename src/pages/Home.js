import {
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../Store";
import InfoCard from "../components/InfoCard";
import Property from "../components/Property";
import { formatCurrency } from "../helpers/formatCurrency";
import { getCountOfActiveProjects } from "../helpers/getCountOfActiveProjects";
import { getTotalAmountByType } from "../helpers/getTotalAmountByType";
import { getPaginatedProperties } from "../services/propertyServices";

const initialFilter = {
  type: "",
  minPrice: "",
  maxPrice: "",
  minArea: "",
  maxArea: "",
};

const Home = () => {
  const [state, setState] = useContext(Context);
  const [localState, setLocalState] = useState({
    currentPage: 1,
    itemsPerPage: 5,
    totalProperties: 0,
    properties: [],
    filter: initialFilter,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setState((prevState) => ({ ...prevState, loading: true }));
        const { properties, totalProperties } = await getPaginatedProperties(
          localState.currentPage,
          localState.itemsPerPage,
          localState.filter
        );
        setLocalState({
          ...localState,
          properties,
          totalProperties,
        });
        setState((prevState) => ({ ...prevState, loading: false }));
      } catch (error) {
        console.error(error);
        setState((prevState) => ({ ...prevState, loading: false }));
      }
    };
    fetchData();
  }, [localState.currentPage, state.properties.length]);

  const paginate = (pageNumber) => {
    setLocalState({ ...localState, currentPage: pageNumber });
  };

  const handleFilterChange = (field, value) => {
    setLocalState((prevState) => ({
      ...prevState,
      filter: {
        ...prevState.filter,
        [field]: value,
      },
    }));
  };

  const handleFilterClick = async (isReset = false) => {
    try {
      setState((prevState) => ({ ...prevState, loading: true }));
      const { properties, totalProperties } = await getPaginatedProperties(
        localState.currentPage,
        localState.itemsPerPage,
        isReset ? initialFilter : localState.filter
      );

      setLocalState((prevLocalState) => ({
        ...prevLocalState,
        properties,
        totalProperties,
        filter: isReset ? initialFilter : prevLocalState.filter,
      }));
      setState((prevState) => ({ ...prevState, loading: false }));
    } catch (error) {
      console.error(error);
      setState((prevState) => ({ ...prevState, loading: false }));
    }
  };

  return (
    <Container maxWidth="lg">
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6} md={4}>
          <InfoCard title="Total properties: " desc={state.properties.length} />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <InfoCard
            title="Total projects: "
            desc={state.properties.reduce(
              (sum, property) => sum + property.projects.length,
              0
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <InfoCard
            title="Total income: "
            desc={formatCurrency(getTotalAmountByType(state, "income"))}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <InfoCard
            title="Asset purchase value: "
            desc={formatCurrency(
              state.properties.reduce(
                (sum, property) => sum + property.price,
                0
              )
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <InfoCard
            title="Active projects: "
            desc={getCountOfActiveProjects(state)}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <InfoCard
            title="Total expenses: "
            desc={formatCurrency(getTotalAmountByType(state, "expense"))}
          />
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid xs={12} md={3} minWidth={263}>
          <Box bgcolor="white" borderRadius={1} boxShadow={1} p={2}>
            <Typography variant="body2" fontWeight="bold">
              FILTRIRAJ REZULTATE
              {Object.values(localState.filter).some(
                (value) => value !== ""
              ) ? (
                <Button
                  size="small"
                  onClick={() => {
                    handleFilterClick(true);
                  }}
                >
                  RESET
                </Button>
              ) : null}
            </Typography>
            <Divider sx={{ mt: 1, mb: 2 }} />
            <FormControl fullWidth variant="outlined">
              <InputLabel id="type-label">Real Estate Type</InputLabel>
              <Select
                id="type"
                label="Real Estate Type"
                labelId="type-label"
                size="small"
                onChange={(e) => handleFilterChange("type", e.target.value)}
                value={localState.filter.type}
                required
              >
                <MenuItem value="Apartment">Apartment</MenuItem>
                <MenuItem value="House">House</MenuItem>
                <MenuItem value="Land">Land</MenuItem>
                <MenuItem value="Garage">Garage</MenuItem>
                <MenuItem value="Commercial Property">
                  Commercial Property
                </MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
            </FormControl>
            <Box display="flex" alignItems="center" justifyContent="center">
              <TextField
                fullWidth
                placeholder="Min Price"
                onChange={(e) => handleFilterChange("minPrice", e.target.value)}
                type="number"
                size="small"
                value={localState.filter.minPrice}
              />
              <Typography mx={0.5}> - </Typography>
              <TextField
                fullWidth
                placeholder="Max Price"
                onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
                type="number"
                size="small"
                value={localState.filter.maxPrice}
              />
            </Box>
            <Box display="flex" alignItems="center" justifyContent="center">
              <TextField
                fullWidth
                placeholder="Min Area"
                size="small"
                onChange={(e) => handleFilterChange("minArea", e.target.value)}
                type="number"
                value={localState.filter.minArea}
              />
              <Typography mx={0.5}> - </Typography>
              <TextField
                fullWidth
                size="small"
                placeholder="Max Area"
                onChange={(e) => handleFilterChange("maxArea", e.target.value)}
                type="number"
                value={localState.filter.maxArea}
              />
            </Box>
            <Button variant="contained" onClick={() => handleFilterClick()}>
              Apply Filters
            </Button>
          </Box>
        </Grid>

        {localState.properties.length > 0 ? (
          <Grid
            bgcolor="white"
            borderRadius={1}
            boxShadow={1}
            md={9}
            mt={1}
            p={2}
            xs={12}
          >
            <Link to="add-real-estate">
              <Button sx={{ mb: 1 }} variant="outlined">
                Add Real Estate
              </Button>
            </Link>
            {localState.properties.map((property) => (
              <Property key={property._id} property={property} />
            ))}
            <Pagination
              count={Math.ceil(
                localState.totalProperties / localState.itemsPerPage
              )}
              page={localState.currentPage}
              onChange={(event, value) => paginate(value)}
              color="primary"
              sx={{ mt: 3 }}
            />
          </Grid>
        ) : (
          <Typography mt={2}>
            There are not properties to show.
            <Link to="add-real-estate">
              <Button variant="outlined">Add Real Estate</Button>
            </Link>
          </Typography>
        )}
      </Grid>
    </Container>
  );
};

export default Home;
