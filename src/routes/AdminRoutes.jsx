import React from "react";
import { useAuth } from "../hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";

function AdminRoutes() {
  const { auth } = useAuth();

  if (!auth || !auth.user) {
    return <Navigate to="/login" />;
  }
  return (
    <>{auth?.user.role === "admin" ? <Outlet /> : <Navigate to="/login" />}</>
  );
}

export default AdminRoutes;
