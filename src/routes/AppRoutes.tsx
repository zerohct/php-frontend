import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/user/Home";
import Cart from "../pages/user/Cart";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cart" element={<Cart />} />
    </Routes>
  );
};

export default AppRoutes;
