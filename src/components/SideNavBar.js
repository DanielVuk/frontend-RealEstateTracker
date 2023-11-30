import {
  AddBusiness,
  ChevronLeft,
  Home,
  Logout,
  Menu,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  styled,
} from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import { useContext, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Context } from "../Store";
import appIcon from "../assets/app_icon.png";
const drawerWidth = 240;

const menu = [
  { title: "Home", path: "/", icon: Home },
  { title: "Add Real Estate", path: "/add-real-estate", icon: AddBusiness },
];

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const NavButtonsStyle = {
  "&:hover": {
    transition: "transform 0.3s",
    transform: "scale(1.2)",
  },
};

const SideNavBar = () => {
  const [state] = useContext(Context);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.clear();
    navigate("/auth", { replace: true });
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={() => setOpen(true)}
            sx={{
              mr: 2,
              ...(open && { display: "none" }),
              ...NavButtonsStyle,
            }}
          >
            <Menu />
          </IconButton>
          <Box
            alignItems="center"
            display="flex"
            justifyContent="space-between"
            width="100%"
          >
            <Typography variant="h6" noWrap component="div">
              {menu.some((item) => item.path === location.pathname)
                ? menu.find((item) => item.path === location.pathname).title
                : ""}
            </Typography>
            <IconButton
              color="inherit"
              onClick={handleLogOut}
              sx={{
                mr: 2,
                ...NavButtonsStyle,
              }}
            >
              <Logout />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <Box
            component="img"
            src={appIcon}
            sx={{
              height: "80px",
              my: "1.5rem",
            }}
          />
          <IconButton
            onClick={() => {
              setOpen(false);
            }}
          >
            <ChevronLeft />
          </IconButton>
        </DrawerHeader>
        <Divider />

        <Typography m={2} fontWeight={600} color="primary" textAlign="center">
          {state.user && state.user.name}
        </Typography>

        <Divider />
        <List>
          {menu.map((item) => (
            <ListItem
              key={item.title}
              disablePadding
              component={Link}
              onClick={() => setOpen(false)}
              to={item.path}
              sx={{ color: (theme) => theme.palette.primary.main }}
            >
              <ListItemButton selected={item.path === location.pathname}>
                <ListItemIcon>
                  <item.icon color="primary" />
                </ListItemIcon>
                <ListItemText primary={item.title} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <Outlet />
      </Main>
    </Box>
  );
};

export default SideNavBar;
