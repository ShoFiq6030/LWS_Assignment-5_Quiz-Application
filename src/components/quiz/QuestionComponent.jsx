import React, { useState } from "react";
import Questions from "./Questions";
import QuestionSideBar from "./QuestionSideBar";

function QuestionComponent({ questions, quizId }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});

  const handleOptionChange = (questionId, option) => {
    setSelectedAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: option,
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      alert("You have reached the end of the quiz!");
    }
  };

  return (
    <>
      <QuestionSideBar questions={questions} currentQuestionIndex={currentQuestionIndex} />
      <Questions
        questions={questions}
        quizId={quizId}
        handleNext={handleNext}
        handleOptionChange={handleOptionChange}
        selectedAnswers={selectedAnswers}
        currentQuestionIndex={currentQuestionIndex}
      />
    </>
  );
}

export default QuestionComponent;
