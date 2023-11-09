import React from "react";
import { Route, Routes } from "react-router-dom";

import SideNavBar from "./components/SideNavBar";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import ProtectedRoutes from "./components/ProtectedRoutes";
import AddProperty from "./pages/AddProperty";

const MenuRoutes = () => {
  return (
    <Routes>
      <Route path="/auth" element={<Auth />} />
      <Route element={<ProtectedRoutes />}>
        <Route element={<SideNavBar />}>
          <Route path="/" element={<Home />} />
          <Route path="/add-property" element={<AddProperty />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default MenuRoutes;
