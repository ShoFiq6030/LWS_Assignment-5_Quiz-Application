import React, { useEffect, useState } from "react";
import avatar from "../assets/avater.webp";
import { useAuth } from "./../hooks/useAuth";
import { useApi } from "../hooks/useApi";

import QuizSets from "../components/quiz/QuizSets";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const [quizSets, setQuizSets] = useState(null);
  const { auth } = useAuth();
  const { api } = useApi();
  const navigate = useNavigate();

  const userRole = auth?.user?.role;

  useEffect(() => {
    const getQuizzes = async () => {
      if (!userRole || userRole === "admin") {
        navigate("/dashboard");
        return;
      }
      try {
        const response = await api.get(
          `${import.meta.env.VITE_SERVER_URL}/api/quizzes`
        );
        setQuizSets(response.data.data);
      } catch (err) {
        console.error("Failed to fetch quiz data:", err);
      }
    };
    getQuizzes();
  }, []);

  return (
    <div className="bg-[#F5F3FF] min-h-screen">
      <div className="container mx-auto py-3">
        <div className="text-center mb-12">
          <img
            src={avatar}
            alt="Profile Picture"
            className="w-32 h-32 rounded-full border-4 border-primary mx-auto mb-4 object-cover"
          />
          <p className="text-xl text-gray-600">Welcome</p>
          <h2
            className="text-4xl font-bold text-gray-700"
            style={{ fontFamily: "Jaro" }}
          >
            {auth.user.full_name}
          </h2>
        </div>
        <QuizSets quizSets={quizSets} />
      </div>
    </div>
  );
}

export default HomePage;
