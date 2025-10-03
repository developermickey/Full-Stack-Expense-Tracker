import React from "react";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (token) {
    // If logged in, redirect to home
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PublicRoute;
