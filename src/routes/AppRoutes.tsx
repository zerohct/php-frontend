import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/user/Home";
import Cart from "../pages/user/Cart";
import LoginPage from "src/components/auth/login";
import RegisterPage from "src/components/auth/register";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
};

export default AppRoutes;
