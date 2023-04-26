import React, { useContext, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { Context } from "./Store";
import SideNavBar from "./components/SideNavBar";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import ProtectedRoutes from "./components/ProtectedRoutes";

const MenuRoutes = () => {
  const [state, setState] = useContext(Context);
  console.log(state);

  useEffect(() => {
    const token = localStorage.getItem("token");

    setState({
      user: token,
    });
  }, []);

  return (
    <Routes>
      <Route path="/auth" element={<Auth />} />
      <Route element={<ProtectedRoutes />}>
        <Route element={<SideNavBar />}>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default MenuRoutes;
