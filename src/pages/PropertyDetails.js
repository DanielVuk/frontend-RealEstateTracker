import { Box, Container, Grid, IconButton, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../Store";
import AddProjectForm from "../components/AddProjectForm";
import AppModal from "../components/AppModal";
import InfoCard from "../components/InfoCard";
import Project from "../components/Project";
import { getPropertyById, updateProperty } from "../services/propertyServices";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Transaction from "../components/Transaction";
import AddTransactionForm from "../components/AddTransactionForm";

const PropertyDetails = () => {
  const [state, setState] = useContext(Context);
  const { id } = useParams();
  const [property, setProperty] = useState({});
  const [projectModal, setProjectModal] = useState(false);
  const [transactionModal, setTransactionModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState();

  console.log("STATE: ", state);

  console.log("SELECTED PROJECT: ", selectedProject);

  const fetchData = async () => {
    try {
      setState({ ...state, loading: true });
      let result = await getPropertyById(localStorage.getItem("token"), id);

      setProperty({
        type: result?.type || "",
        location: result?.location || { city: "", street: "", zip: "" },
        area: result?.area || 0,
        price: result?.price || 0,
        purchaseDate: result?.purchaseDate || new Date(),
        imageUrls: result?.imageUrls || [],
        owners: result?.owners || [],
        contacts: result?.contacts || [],
        projects: result?.projects || [],
        description: result?.description || "",
      });
      setState({ ...state, loading: false });
    } catch (error) {
      console.error("Error fetching property:", error);
      setState({ ...state, loading: false });
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleAddProject = async (newProject) => {
    try {
      setState({ ...state, loading: true });

      let result = await updateProperty(localStorage.getItem("token"), id, {
        ...property,
        projects: [...property.projects, newProject],
      });

      setState((prevState) => ({
        ...prevState,
        properties: prevState.properties.map((p) =>
          p._id === id ? result : p
        ),
        loading: false,
      }));
      setProperty(result);
      setProjectModal(false);
    } catch (error) {
      console.log(error);
      setState({ ...state, loading: false });
      setProjectModal(false);
    }
  };

  const handleAddTransaction = async (transaction) => {
    console.log("Dodaj tranaskciju: ", transaction);

    const projectIndex = property.projects.findIndex(
      (p) => p._id === selectedProject._id
    );

    if (projectIndex !== -1)
      property.projects[projectIndex].transactions.push(transaction);
    console.log(property.projects);

    // setProperty(...property, propertyprojects.transactions: )
    // try {
    //   setState({ ...state, loading: true });

    //   let result = await updateProperty(localStorage.getItem("token"), id, {
    //     ...property,
    //     projects: [...property.projects, transaction],
    //   });

    //   setState((prevState) => ({
    //     ...prevState,
    //     properties: prevState.properties.map((p) =>
    //       p._id === id ? result : p
    //     ),
    //     loading: false,
    //   }));
    //   setProperty(result);

    //   setTransactionModal(false);
    // } catch (error) {
    //   console.log(error);
    //   setState({ ...state, loading: false });
    //   setTransactionModal(false);
    // }
  };

  const handleDeleteProject = async (project) => {
    try {
      setState({ ...state, loading: true });

      let result = await updateProperty(localStorage.getItem("token"), id, {
        ...property,
        projects: [...property.projects].filter((p) => p._id !== project._id),
      });

      setState((prevState) => ({
        ...prevState,
        properties: prevState.properties.map((p) =>
          p._id === id ? result : p
        ),
        loading: false,
      }));
      setProperty(result);
    } catch (error) {
      console.log(error);
      setState({ ...state, loading: false });
    }
  };

  return (
    <Container maxWidth="lg">
      <Typography>Real Estate Details</Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6} md={4}>
          <InfoCard title="Type: " desc={property.type} isIcon={false} />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <InfoCard
            title="Purchase price: "
            desc={property.price}
            isIcon={false}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <InfoCard title="Area: " desc={property.area} isIcon={false} />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <InfoCard
            title="City: "
            desc={property.location?.city}
            isIcon={false}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <InfoCard
            title="Street: "
            desc={property.location?.street}
            isIcon={false}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <InfoCard
            title="ZIP: "
            desc={property.location?.zip}
            isIcon={false}
          />
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12} sm={6}>
          <Box
            minWidth={200}
            minHeight={300}
            bgcolor="yellow"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            1. graf
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box
            minWidth={200}
            minHeight={300}
            bgcolor="yellowgreen"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            1. graf
          </Box>
        </Grid>
      </Grid>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Box display="flex">
            <Typography variant="h6" my={1}>
              Projects: {property.projects?.length}
            </Typography>
            <IconButton
              color="primary"
              size="large"
              onClick={() => setProjectModal(true)}
            >
              <AddCircleOutlineIcon />
            </IconButton>
          </Box>

          {property.projects?.length > 0 ? (
            property.projects.map((project) => (
              <Project
                key={project._id}
                project={project}
                onDelete={() => handleDeleteProject(project)}
                onSelect={() => {
                  selectedProject === project
                    ? setSelectedProject()
                    : setSelectedProject(project);
                }}
                selected={selectedProject}
              />
            ))
          ) : (
            <Typography variant="body1" color="textSecondary">
              Nema dostupnih projekata. Dodajte novi projekt.
            </Typography>
          )}
        </Grid>

        <Grid item xs={12} md={6}>
          <Box display="flex">
            <Typography variant="h6" my={1}>
              Transactions: {property.projects?.length}
            </Typography>
            <IconButton
              color="primary"
              disabled={selectedProject === undefined ? true : false}
              size="large"
              onClick={() => setTransactionModal(true)}
            >
              <AddCircleOutlineIcon />
            </IconButton>
          </Box>
          {selectedProject && <Transaction />}
        </Grid>
      </Grid>

      <AppModal open={projectModal} onClose={() => setProjectModal(false)}>
        <AddProjectForm onAddProject={handleAddProject} open={projectModal} />
      </AppModal>

      <AppModal
        open={transactionModal}
        onClose={() => setTransactionModal(false)}
      >
        <AddTransactionForm
          onAddTransaction={handleAddTransaction}
          open={transactionModal}
        />
      </AppModal>
    </Container>
  );
};

export default PropertyDetails;
