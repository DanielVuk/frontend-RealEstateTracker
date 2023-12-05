import {
  AccountBalance,
  AddAPhoto,
  AddCircleOutline,
  Build,
  Delete,
  Done,
  Edit,
  Home,
  Logout,
  Menu,
  TrendingDown,
  TrendingUp,
  Work,
  Visibility,
  VisibilityOff,
  Person,
  Email,
  Lock,
  LockReset,
} from "@mui/icons-material";
const GetIcon = ({ iconName, color = "white", size = "" }) => {
  switch (iconName) {
    case "Delete":
      return <Delete fontSize={size} sx={{ color: color }} />;
    case "Edit":
      return <Edit fontSize={size} sx={{ color: color }} />;
    case "Logout":
      return <Logout fontSize={size} sx={{ color: color }} />;
    case "Email":
      return <Email fontSize={size} sx={{ color: color }} />;
    case "Menu":
      return <Menu fontSize={size} sx={{ color: color }} />;
    case "Lock":
      return <Lock fontSize={size} sx={{ color: color }} />;
    case "LockReset":
      return <LockReset fontSize={size} sx={{ color: color }} />;
    case "Home":
      return <Home fontSize={size} sx={{ color: color }} />;
    case "Work":
      return <Work fontSize={size} sx={{ color: color }} />;
    case "TrendingUp":
      return <TrendingUp fontSize={size} sx={{ color: color }} />;
    case "AccountBalance":
      return <AccountBalance fontSize={size} sx={{ color: color }} />;
    case "TrendingDown":
      return <TrendingDown fontSize={size} sx={{ color: color }} />;
    case "Build":
      return <Build fontSize={size} sx={{ color: color }} />;
    case "Done":
      return <Done fontSize={size} sx={{ color: color }} />;
    case "AddAPhoto":
      return <AddAPhoto fontSize={size} sx={{ color: color }} />;
    case "AddCircleOutline":
      return <AddCircleOutline fontSize={size} sx={{ color: color }} />;
    case "Visibility":
      return <Visibility fontSize={size} sx={{ color: color }} />;
    case "VisibilityOff":
      return <VisibilityOff fontSize={size} sx={{ color: color }} />;
    case "Person":
      return <Person fontSize={size} sx={{ color: color }} />;
    default:
      return null;
  }
};

export default GetIcon;
