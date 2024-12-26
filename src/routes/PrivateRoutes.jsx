import React from "react";
import { useAuth } from "../hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";
import Header from './../components/common/Header';

function PrivateRoutes() {
  const { auth } = useAuth();
  return (
    <>
      {auth.user ? (
        <div className="bg-[#F5F3FF] min-h-screen">
          <div className="container mx-auto py-3">
            <Header />
            <Outlet />
            <footer className="mt-6 mb-3 opacity-40 text-center">
              Copyright & copy; 2024 Learn With Sumit | All Rights Reserved
            </footer>
          </div>
        </div>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
}

export default PrivateRoutes;
