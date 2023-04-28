import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Context, initialState } from "../Store";

const ProtectedRoutes = () => {
  const [setState] = useContext(Context);

  let token = localStorage.getItem("token");

  if (token) {
    const expiresIn =
      localStorage.getItem("tokenExpiration") * 1000 - new Date().getTime();

    if (expiresIn < 0) {
      setState(initialState);
      localStorage.clear();
    } else {
      setTimeout(() => {
        setState(initialState);
        localStorage.clear();
      }, expiresIn);
    }
  }

  return token ? <Outlet /> : <Navigate to="/auth" />;
};

export default ProtectedRoutes;
