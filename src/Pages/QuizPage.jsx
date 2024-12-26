import React, { useEffect, useState } from "react";

import logo from "../assets/logo.svg";
import { useParams } from "react-router-dom";
import { useApi } from "../hooks/useApi";
import QuizSideBar from "./../components/quiz/QuizSideBar";
import Questions from "./../components/quiz/Questions";

function QuizPage() {
  const [quizData, setQuizData] = useState(null);
  const { api } = useApi();

  const { id } = useParams(); // Get the quiz ID from the URL
  console.log("Quiz ID:", id);
  useEffect(() => {
    const getQuizData = async () => {
      const response = await api.get(
        `${import.meta.env.VITE_SERVER_URL}/api/quizzes/${id}`
      );

      console.log(response.data);
      if (response.status === 200) {
        setQuizData(response?.data?.questions);
      }
    };
    getQuizData();
  }, [id]);

  // if (!quizData) {
  //   return <p>Loading...</p>;
  // }

  return (
    <main className="max-w-8xl mx-auto h-[calc(100vh-10rem)]">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 h-full">
        <QuizSideBar quizData={quizData} />
        <Questions quizData={quizData} />
      </div>
    </main>
  );
}

export default QuizPage;
