import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const AdminProtection = ({ children }) => {
  const adminToken = Cookies.get("adminToken") || localStorage.getItem("adminToken");

  if (!adminToken) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default AdminProtection;
