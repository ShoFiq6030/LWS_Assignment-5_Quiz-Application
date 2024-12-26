import React, { useEffect, useState } from "react";

import logo from "../assets/logo.svg";
import { useParams } from "react-router-dom";
import { useApi } from "../hooks/useApi";
import QuizSideBar from "./../components/quiz/QuizSideBar";
import Questions from "./../components/quiz/Questions";

function QuizPage() {
  const [quizData, setQuizData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { api } = useApi();

  const { id } = useParams(); // Get the quiz ID from the URL
  

  useEffect(() => {
    const getQuizData = async () => {
      try {
        const response = await api.get(
          `${import.meta.env.VITE_SERVER_URL}/api/quizzes/${id}`
        );
        // console.log(response.data.data.questions);
        if (response.status === 200) {
          setQuizData(response?.data?.data.questions);
        }
      } catch (error) {
        console.error("Failed to fetch quiz data:", error);
      } finally {
        setLoading(false);
      }
    };
    getQuizData();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }
  console.log(quizData);

  return (
    <main className="max-w-8xl mx-auto h-[calc(100vh-10rem)]">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 h-full">
        <QuizSideBar quizData={quizData} />
        <Questions quizData={quizData} quizId={id} />
      </div>
    </main>
  );
}

export default QuizPage;
