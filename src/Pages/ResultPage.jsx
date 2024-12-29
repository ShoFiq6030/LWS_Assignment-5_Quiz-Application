import React from "react";
import { useResult } from "../hooks/useresult";
import { useQuestions } from "../hooks/useQuestions";
import ResultMark from "../components/result/Resultmark";
import ResultQuestions from "../components/result/ResultQuestions";
import ResultComponent from "../components/result/ResultComponent";

// import { result, questions } from "../utils/raff";

function ResultPage() {
  const { result,quiz } = useResult();
  const { questions } = useQuestions();
  console.log(result);
  console.log(questions);

  if (!result || !questions) {
    return <p>Loading......</p>;
  }

  return (
    <div className="bg-background text-foreground min-h-screen">
      <div className="flex min-h-screen overflow-hidden">
        <ResultComponent result={result} questions={questions} quiz={quiz} />
        {/* <ResultMark
          result={result}
          userCorrectAnswers={userCorrectAnswers}
          questions={questions}
        />

        <ResultQuestions result={result} questions={questions} /> */}
      </div>
    </div>
  );
}

export default ResultPage;
