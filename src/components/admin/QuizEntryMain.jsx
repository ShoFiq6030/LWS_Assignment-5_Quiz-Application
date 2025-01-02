import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ArrowSvg from "./../svg/ArrowSvg";
import { useAddQuiz } from "../../hooks/useAddQuiz";
import AddUpdateQuestion from "../addQuiz/AddUpdateQuestion";
import AddQuestionRight from "../addQuiz/AddQuestionRight";
import { useApi } from "../../hooks/useApi";
import { useAllQuizDetails } from "./../../hooks/useAllQuizDetails";

function QuizEntryMain({ quizId }) {
  const { api } = useApi();

  const { allQuizDetails } = useAllQuizDetails();
  const [questionData, setQuestionData] = useState({
    question: "",
    options: ["", "", "", ""],
    correctAnswer: "0",
  });
  const [questions, setQuestions] = useState(null);
  console.log(allQuizDetails);

  useEffect(() => {
    if (!quizId || !allQuizDetails?.length) return;

    const quiz = allQuizDetails.find((quiz) => quiz.id === quizId);
    if (quiz) {
      setQuestions(quiz?.Questions);
    }
  }, [quizId, allQuizDetails]);

  const handleTextChange = (e) => {
    setQuestionData({
      ...questionData,
      [e.target.name]: e.target.value,
    });
  };
  const handleCorrectAnswerChange = (e, value) => {
    if (e.target.checked) {
      setQuestionData({ ...questionData, correctAnswer: value });
    }
  };

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...questionData.options];
    updatedOptions[index] = value;

    // Update correctAnswer if it matches the old option text
    setQuestionData({
      ...questionData,
      options: updatedOptions,
    });
  };

  const handleAdd = async () => {
    console.log(questionData);

    try {
      const response = await api.post(
        `${
          import.meta.env.VITE_SERVER_URL
        }/api/admin/quizzes/${quizId}/questions`,
        questionData
      );
      console.log(response.data);
      // setQuestions(response.data);
      setQuestionData({
        question: "",
        options: ["", "", "", ""],
        correctAnswer: "0",
      });
    } catch (err) {
      console.log(err);
    }

    setQuestions([...questions, questionData]);
    console.log(questions);
  };
  console.log(questions);

  return (
    <div className="md:flex-grow px-4 sm:px-6 lg:px-8 py-8">
      <div>
        <nav className="text-sm mb-4" aria-label="Breadcrumb">
          <ol className="list-none p-0 inline-flex">
            <li className="flex items-center">
              <Link
                to={"/dashboard"}
                className="text-gray-600 hover:text-buzzr-purple"
              >
                Home
              </Link>
              <ArrowSvg />
            </li>
            <li>
              <Link
                to={"/quiz_set_page"}
                className="text-gray-600 hover:text-buzzr-purple"
                aria-current="page"
              >
                Quizzes
              </Link>
            </li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 md:gap-8 lg:gap-12">
          <AddUpdateQuestion
            questionData={questionData}
            handleTextChange={handleTextChange}
            handleAdd={handleAdd}
            handleCorrectAnswerChange={handleCorrectAnswerChange}
            handleOptionChange={handleOptionChange}
          />
          {questions?.length > 0 && (
            <AddQuestionRight quizId={quizId} questions={questions} />
          )}
        </div>
      </div>
    </div>
  );
}

export default QuizEntryMain;
