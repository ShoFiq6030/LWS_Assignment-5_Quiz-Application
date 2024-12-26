import React, { useState } from "react";
import { QuizContext } from "../context";

function QuizProvider({ children }) {
  const [quizzes, setQuizzes] = useState({});
  return (
    <QuizContext.Provider value={{ quizzes, setQuizzes }}>
      {children}
    </QuizContext.Provider>
  );
}

export default QuizProvider;
