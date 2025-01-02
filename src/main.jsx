import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { ToastContainer } from "react-toastify";
import AuthProvider from "./provider/AuthProvider.jsx";
import "react-circular-progressbar/dist/styles.css";
import AddQuizProvider from "./provider/AddquizProvider.jsx";
import AllQuizDetailsProvider from "./provider/AllQuizDetailsProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <AuthProvider>
        <AddQuizProvider>
          <AllQuizDetailsProvider>
          <App />
          <ToastContainer />
          </AllQuizDetailsProvider>
        </AddQuizProvider>
      </AuthProvider>
    </Router>
  </StrictMode>
);
