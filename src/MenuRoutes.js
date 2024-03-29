import React from "react";
import { Route, Routes } from "react-router-dom";
import ProtectedRoutes from "./components/ProtectedRoutes";
import SideNavBar from "./components/SideNavBar";
import AddRealEstate from "./pages/AddRealEstate";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import PropertyDetails from "./pages/PropertyDetails";
import NotFound from "./pages/NotFound";

const MenuRoutes = () => {
  return (
    <Routes>
      <Route path="/auth" element={<Auth />} />
      <Route element={<ProtectedRoutes />}>
        <Route element={<SideNavBar />}>
          <Route path="/" element={<Home />} />
          <Route path="/add-real-estate" element={<AddRealEstate />} />
          <Route
            path="/edit-real-estate/:id"
            element={<AddRealEstate editMode />}
          />
          <Route path="/property/:id" element={<PropertyDetails />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default MenuRoutes;
