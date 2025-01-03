import React from "react";
import { Routes, Route, useParams } from "react-router-dom";
import AdminLayout from "../pages/layouts/AdminLayout";
import ProductList from "src/components/admin/productList";
const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="products" element={<ProductList />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
