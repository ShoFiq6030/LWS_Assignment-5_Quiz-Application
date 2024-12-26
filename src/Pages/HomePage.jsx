import React, { useEffect } from "react";

import avatar from "../assets/avater.webp";

import { useAuth } from "./../hooks/useAuth";
import Quiz from "../components/quiz/Quiz";
import { useApi } from "../hooks/useApi";
import { useQuiz } from "../hooks/useQuiz";

function HomePage() {
  const { auth } = useAuth();
  const { api } = useApi();
  const { setQuizzes } = useQuiz();

  useEffect(() => {
    const getQuizzes = async () => {
      const response = await api.get(
        `${import.meta.env.VITE_SERVER_URL}/api/quizzes`
      );
      setQuizzes(response.data.data);
    };
    getQuizzes();
  }, []);

  return (
    <>
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
      <Quiz />
    </>
  );
}

export default HomePage;
