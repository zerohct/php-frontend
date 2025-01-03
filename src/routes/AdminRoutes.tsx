import React from "react";
import { Routes, Route, useParams } from "react-router-dom";
import AdminLayout from "../pages/layouts/AdminLayout";
import ProductList from "src/components/admin/productList";
import AdminOrdersPage from "src/components/admin/orderAdmin";
const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="products" element={<ProductList />} />
        <Route path="orders" element={<AdminOrdersPage />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
