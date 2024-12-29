import React, { useState } from "react";
import { QuestionsContext } from "../context";

function QuestionsProvider({ children }) {
  const [questions, setQuestions] = useState({});
  return (
    <QuestionsContext.Provider value={{ questions, setQuestions }}>
      {children}
    </QuestionsContext.Provider>
  );
}

export default QuestionsProvider;
