import React, { useEffect, useState } from "react";
import DashboardSideBar from "../../components/admin/DashboardSideBar";
import DashboardMain from "../../components/admin/DashboardMain";
import { useAuth } from "../../hooks/useAuth";
import { useApi } from "../../hooks/useApi";

function Dashboard() {
  const [quizSets, setQuizSets] = useState(null);
  const { auth } = useAuth();
  const userRole=auth?.user?.role
  const { api } = useApi();

  useEffect(() => {
    if (!userRole || userRole !== "admin") {
      return;
    }

    const getQuizzes = async () => {
      try {
        const response = await api.get(
          `${import.meta.env.VITE_SERVER_URL}/api/admin/quizzes`
        );
        console.log(response);
        setQuizSets(response.data);
      } catch (err) {
        console.error("Failed to fetch quiz data:", err);
      }
    };
    getQuizzes();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen flex">
      <DashboardSideBar />

      <DashboardMain quizSets={quizSets} />
    </div>
  );
}

export default Dashboard;
