import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useApi } from "../hooks/useApi";
import { useQuestions } from "./../hooks/useQuestions";
import QuestionComponent from './../components/quiz/QuestionComponent';

function QuizPage() {
  const { questions, setQuestions } = useQuestions();
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
          setQuestions(response?.data?.data.questions);
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

  return (
    <main className="max-w-8xl mx-auto h-[calc(100vh-10rem)]">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 h-full">
        <QuestionComponent questions={questions} quizId={id} />
      </div>
    </main>
  );
}

export default QuizPage;
