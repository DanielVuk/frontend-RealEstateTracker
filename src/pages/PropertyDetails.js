import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Box, Container, Grid, IconButton, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../Store";
import AddProjectForm from "../components/AddProjectForm";
import AddTransactionForm from "../components/AddTransactionForm";
import AppModal from "../components/AppModal";
import InfoCard from "../components/InfoCard";
import Project from "../components/Project";
import Transaction from "../components/Transaction";
import { getPropertyById, updateProperty } from "../services/propertyServices";

const PropertyDetails = () => {
  const [state, setState] = useContext(Context);
  const { id } = useParams();
  const [property, setProperty] = useState({});
  const [projectModal, setProjectModal] = useState(false);
  const [transactionModal, setTransactionModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState();

  const fetchData = async () => {
    try {
      setState({ ...state, loading: true });
      let result = await getPropertyById(localStorage.getItem("token"), id);
      console.log("Podaci prije ažuriranja:", property);
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
      console.log("Podaci nakon ažuriranja:", result);
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
    const projectIndex = property.projects.findIndex(
      (p) => p._id === selectedProject._id
    );

    if (projectIndex !== -1)
      property.projects[projectIndex].transactions = [
        transaction,
        ...property.projects[projectIndex].transactions,
      ];

    try {
      setState({ ...state, loading: true });

      let result = await updateProperty(localStorage.getItem("token"), id, {
        ...property,
      });

      setState((prevState) => ({
        ...prevState,
        properties: prevState.properties.map((p) =>
          p._id === id ? result : p
        ),
        loading: false,
      }));
      setProperty(result);
      setTransactionModal(false);
      setSelectedProject(result.projects[projectIndex]);
    } catch (error) {
      console.log(error);
      setState({ ...state, loading: false });
      setTransactionModal(false);
    }
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

  const handelDeleteTransaction = async (transaction) => {
    setState({ ...state, loading: true });
    const projectIndex = property.projects.findIndex(
      (p) => p._id === selectedProject._id
    );

    if (projectIndex !== -1) {
      const transactionIndex = property.projects[
        projectIndex
      ].transactions.findIndex((t) => t._id === transaction._id);

      if (transactionIndex !== -1) {
        property.projects[projectIndex].transactions.splice(
          transactionIndex,
          1
        );

        try {
          let result = await updateProperty(localStorage.getItem("token"), id, {
            ...property,
          });

          setState((prevState) => ({
            ...prevState,
            properties: prevState.properties.map((p) =>
              p._id === id ? result : p
            ),
            loading: false,
          }));
          setProperty(result);
          setSelectedProject(result.projects[projectIndex]);
        } catch (error) {
          console.log(error);
          setState({ ...state, loading: false });
        }
      } else {
        console.error("Transakcija nije pronađena u projektu.");
      }
    } else {
      console.error("Projekt nije pronađen.");
    }
  };

  return (
    <Container maxWidth="lg">
      <Typography>Real Estate Details</Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6} md={4}>
          <InfoCard title="Type: " desc={property?.type} isIcon={false} />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <InfoCard
            title="Purchase price: "
            desc={property?.price}
            isIcon={false}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <InfoCard title="Area: " desc={property?.area} isIcon={false} />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <InfoCard
            title="City: "
            desc={property?.location?.city}
            isIcon={false}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <InfoCard
            title="Street: "
            desc={property?.location?.street}
            isIcon={false}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <InfoCard
            title="ZIP: "
            desc={property?.location?.zip}
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
              Projects: {property?.projects?.length}
            </Typography>
            <IconButton
              color="primary"
              size="large"
              onClick={() => setProjectModal(true)}
            >
              <AddCircleOutlineIcon />
            </IconButton>
          </Box>

          {property?.projects?.length > 0 ? (
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
              Transactions: {selectedProject?.transactions?.length}
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
          {selectedProject &&
            selectedProject?.transactions?.map((t) => (
              <Transaction
                key={t._id}
                transaction={t}
                onDelete={() => handelDeleteTransaction(t)}
              />
            ))}
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
