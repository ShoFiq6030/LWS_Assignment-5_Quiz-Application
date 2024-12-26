import React from "react";
import { useAuth } from "../hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";
import Header from "./../components/common/Header";
import QuizProvider from "../provider/QuizProvider";
import Footer from "../components/common/Footer";

function PrivateRoutes() {
  const { auth } = useAuth();
  return (
    <>
      {auth.user ? (
        <div className="bg-[#F5F3FF] min-h-screen">
          <div className="container mx-auto py-3">
            <QuizProvider>
              <Header />
              <Outlet />
              <Footer />
            </QuizProvider>
          </div>
        </div>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
}

export default PrivateRoutes;
