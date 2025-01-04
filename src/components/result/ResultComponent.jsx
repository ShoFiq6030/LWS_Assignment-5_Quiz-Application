import React from "react";
import ResultMark from "./ResultMark";
import ResultQuestions from "./ResultQuestions";

function ResultComponent({ result, questions,quiz }) {
  const submitted_answers = result?.submitted_answers;
  const correct_answers = result?.correct_answers;

  const userCorrectAnswers = correct_answers?.filter((correctAnswer) => {
    const submittedAnswer = submitted_answers?.find(
      (sa) => sa.question_id === correctAnswer.question_id
    );
    return submittedAnswer && correctAnswer.answer === submittedAnswer.answer;
  });

  return (
    <>
      <ResultMark
        result={result}
        questions={questions}
        userCorrectAnswers={userCorrectAnswers}
        quiz={quiz}
      />
      <ResultQuestions questions={questions} result={result} userCorrectAnswers={userCorrectAnswers} />
    </>
  );
}

export default ResultComponent;
