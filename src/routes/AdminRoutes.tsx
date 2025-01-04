import React from "react";
import { Routes, Route, useParams } from "react-router-dom";
import AdminLayout from "../pages/layouts/AdminLayout";
import ProductList from "src/components/admin/productList";
import CategoryList from "src/components/admin/categoryList";
import UserList from "src/components/admin/userList";
const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="products" element={<ProductList />} />
        <Route path="categories" element={<CategoryList />} />
        <Route path="user" element={<UserList />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
