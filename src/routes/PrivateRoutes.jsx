import React from "react";
import { useAuth } from "../hooks/useAuth";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Header from "./../components/common/Header";
import QuestionsProvider from "../provider/QuestionsProvider";
import Footer from "../components/common/Footer";
import ResultProvider from "../provider/ResultProvider";

function PrivateRoutes() {
  const { auth } = useAuth();
  const location = useLocation();

  const hideHeaderFooterRoutes = ["/result"];
  const shouldHideHeaderFooter = hideHeaderFooterRoutes.includes(
    location.pathname
  );
  return (
    <>
      {auth.user ? (
        <div className="bg-[#F5F3FF] min-h-screen">
          <div className="container mx-auto py-3">
            <QuestionsProvider>
              <ResultProvider>
                {!shouldHideHeaderFooter && <Header />}
                <Outlet />
                {!shouldHideHeaderFooter && <Footer />}
              </ResultProvider>
            </QuestionsProvider>
          </div>
        </div>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
}

export default PrivateRoutes;
