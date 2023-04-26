import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  let token = localStorage.getItem("token");

  return token ? <Outlet /> : <Navigate to="/auth" />;
};

export default ProtectedRoutes;
