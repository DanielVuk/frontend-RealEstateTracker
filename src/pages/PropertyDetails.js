import {
  Box,
  Container,
  Grid,
  IconButton,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { BarChart, LineChart } from "@mui/x-charts";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../Store";
import { Colors } from "../Theme";
import AppModal from "../components/AppModal";
import useSnackBar from "../components/AppSnackBar";
import AddProjectForm from "../components/Forms/AddProjectForm";
import AddTransactionForm from "../components/Forms/AddTransactionForm";
import GetIcon from "../components/GetIcon";
import InfoCard from "../components/InfoCard";
import Project from "../components/Project";
import Transaction from "../components/Transaction";
import { formatCurrency } from "../helpers/formatCurrency";
import {
  getIncomeExpenseByProjectChart,
  getPropertyChart,
} from "../services/chartServices";
import { getPropertyById, updateProperty } from "../services/propertyServices";

const PropertyDetails = () => {
  const [state, setState] = useContext(Context);
  const { SnackBar, openSnackBarHelper } = useSnackBar();
  const { id } = useParams();
  const [property, setProperty] = useState({});
  const [projectModal, setProjectModal] = useState(false);
  const [transactionModal, setTransactionModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState();
  const [projectTypeFIlter, setProjectTypeFilter] = useState([
    "in progress",
    "completed",
  ]);
  const [transactionTypeFIlter, setTransactionTypeFilter] = useState([
    "income",
    "expense",
  ]);

  const [incomeExpenseChart, setIncomeExpenseChart] = useState();
  const [propertyChart, setPropertyChart] = useState();

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
      openSnackBarHelper(error.message, "error");
      setState({ ...state, loading: false });
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getIncomeExpenseByProjectChart(id);
        const res = await getPropertyChart(id);

        setIncomeExpenseChart(response.data);
        setPropertyChart(res.data);
      } catch (error) {
        console.error("Error fetching chart data:", error);
        openSnackBarHelper(error.message, "error");
      }
    };
    fetchData();
  }, [property.projects]);

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
      openSnackBarHelper(error.message, "error");
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
      openSnackBarHelper("Transaction successfully added.", "success");
    } catch (error) {
      console.log(error);
      openSnackBarHelper(error.message, "error");
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
      setSelectedProject();
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

  const handleCompleteProject = async (project) => {
    try {
      setState({ ...state, loading: true });
      project.status = "completed";

      let result = await updateProperty(localStorage.getItem("token"), id, {
        ...property,
        projects: [...property.projects].map((p) =>
          p._id === project._id ? project : p
        ),
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

  const handleProjectTypeChange = (event, newType) => {
    if (newType.length === 0) return;

    setProjectTypeFilter(newType);
  };
  const handleTransactionTypeChange = (event, newType) => {
    if (newType.length === 0) return;

    setTransactionTypeFilter(newType);
  };

  return (
    <Container maxWidth="lg">
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6} md={4}>
          <InfoCard title="Type: " desc={property?.type} isIcon={false} />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <InfoCard
            title="Purchase price: "
            desc={formatCurrency(property?.price)}
            isIcon={false}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <InfoCard
            title="Area: "
            desc={property?.area + ` m²`}
            isIcon={false}
          />
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
          {propertyChart &&
            property.projects?.length > 0 &&
            property.projects.reduce((count, project) => {
              return count + project.transactions.length;
            }, 0) > 0 && (
              <LineChart
                height={300}
                colors={[Colors.primary]}
                series={[
                  {
                    data: propertyChart?.propertyValues,
                    label: "Property Value",
                  },
                ]}
                xAxis={[
                  {
                    scaleType: "point",
                    data: propertyChart?.dates,
                    tickLabelStyle: {
                      angle: 45,
                      textAnchor: "start",
                      fontSize: 8,
                    },
                  },
                ]}
              />
            )}
        </Grid>
        <Grid item xs={12} sm={6}>
          {incomeExpenseChart &&
            property.projects &&
            property.projects?.length > 0 &&
            property.projects.reduce((count, project) => {
              return count + project.transactions.length;
            }, 0) > 0 && (
              <BarChart
                height={300}
                colors={[Colors.income, Colors.expense]}
                series={[
                  {
                    data: incomeExpenseChart?.incomeData,
                    label: "income",
                    id: "incomeId",
                    stack: "total",
                  },
                  {
                    data: incomeExpenseChart?.expenseData,
                    label: "expense",
                    id: "expenseId",
                    stack: "total",
                  },
                ]}
                xAxis={[
                  { data: incomeExpenseChart?.xLabels, scaleType: "band" },
                ]}
              />
            )}
        </Grid>
      </Grid>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Box display="flex">
            <Typography variant="h6" my={1}>
              Projects: {property?.projects?.length}
            </Typography>
            <IconButton size="large" onClick={() => setProjectModal(true)}>
              <GetIcon iconName="AddCircleOutline" color="primary.main" />
            </IconButton>
          </Box>

          {property.projects?.length > 0 && (
            <ToggleButtonGroup
              fullWidth
              value={projectTypeFIlter}
              onChange={handleProjectTypeChange}
              sx={{ mb: 1 }}
            >
              <ToggleButton value="in progress" color="success">
                <Typography>In progress</Typography>
              </ToggleButton>
              <ToggleButton value="completed" color="secondary">
                <Typography>Completed</Typography>
              </ToggleButton>
            </ToggleButtonGroup>
          )}

          {property?.projects?.length > 0 ? (
            property.projects
              .filter((p) => projectTypeFIlter.includes(p.status))
              .map((project) => (
                <Project
                  key={project._id}
                  project={project}
                  onDelete={() => handleDeleteProject(project)}
                  onComplete={() => handleCompleteProject(project)}
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

            {selectedProject && (
              <IconButton
                size="large"
                onClick={() => setTransactionModal(true)}
              >
                <GetIcon iconName="AddCircleOutline" color="primary.main" />
              </IconButton>
            )}
          </Box>

          {selectedProject && selectedProject.transactions?.length > 0 && (
            <ToggleButtonGroup
              fullWidth
              value={transactionTypeFIlter}
              onChange={handleTransactionTypeChange}
              sx={{ mb: 1 }}
            >
              <ToggleButton value="income" color="success">
                <Typography>Income</Typography>
              </ToggleButton>
              <ToggleButton value="expense" color="error">
                <Typography>Expense</Typography>
              </ToggleButton>
            </ToggleButtonGroup>
          )}

          {selectedProject &&
            selectedProject?.transactions
              ?.filter((t) => transactionTypeFIlter.includes(t.type))
              .map((t) => (
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
      <SnackBar />
    </Container>
  );
};

export default PropertyDetails;
