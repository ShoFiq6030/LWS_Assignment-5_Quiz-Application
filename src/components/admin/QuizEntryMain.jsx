import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ArrowSvg from "./../svg/ArrowSvg";
import { useAddQuiz } from "../../hooks/useAddQuiz";
import AddUpdateQuestion from "../addQuiz/AddUpdateQuestion";
import AddQuestionRight from "../addQuiz/AddQuestionRight";
import { useApi } from "../../hooks/useApi";
import { useAllQuizDetails } from "./../../hooks/useAllQuizDetails";
import { toast } from "react-toastify/unstyled";

function QuizEntryMain({ quizId }) {
  const { api } = useApi();

  const { allQuizDetails } = useAllQuizDetails();
  const [questionData, setQuestionData] = useState({
    question: "",
    options: ["", "", "", ""],
    correctAnswer: "0",
  });
  const [questions, setQuestions] = useState([]);
  const [editingQuestionId, setEditingQuestionId] = useState(null);
  const [quizDetails,setQuizDetails]=useState(null)

  useEffect(() => {
    if (!quizId || !allQuizDetails?.length) return;

    const quiz = allQuizDetails?.find((quiz) => quiz.id === quizId);
    if (quiz) {
      
      setQuestions(quiz?.Questions);
      setQuizDetails(quiz)
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
    try {
      if (editingQuestionId) {
        // Update existing question
       const ifConfirm= window.confirm('Are you sure you want to update this question?')
        if (ifConfirm) {
          const response = await api.patch(
            `${import.meta.env.VITE_SERVER_URL}/api/admin/questions/${editingQuestionId}`,
            questionData
          );
          if(response.statusCode === 200){
            toast.success("Question updated successfully")
          }
          const updatedQuestion = response.data.data;
          setQuestions((prevQuestions) =>
            prevQuestions.map((question) =>
              question.id === updatedQuestion.id ? updatedQuestion : question
            )
          );
        }
      } else {
        // Add new question
        const response = await api.post(
          `${
            import.meta.env.VITE_SERVER_URL
          }/api/admin/quizzes/${quizId}/questions`,
          questionData
        );
        if(response.statusCode === 200){
          toast.success("Question added successfully")
        }
        const newQuestion = response.data.data;
        setQuestions([...questions, newQuestion]);
      }

      // Reset form
      setQuestionData({
        question: "",
        options: ["", "", "", ""],
        correctAnswer: "0",
      });
      setEditingQuestionId(null);
    } catch (err) {
      console.error(err);
      toast.error("Failed to add question") 
    }
  };

  const handleDeleteQuestion = async (questionId) => {
    try {
      const isConfirmed = window.confirm(
        "Are you sure you want to delete this question?"
      );
      if (!isConfirmed) return; // Exit if the user cancels

      const response =await api.delete(
        `${import.meta.env.VITE_SERVER_URL}/api/admin/questions/${questionId}`
      );
      if(response.statusCode === 200){
        toast.success("Question deleted successfully")
      }

      setQuestions((prevQuestions) =>
        prevQuestions.filter((question) => question.id !== questionId)
      );
    } catch (err) {
      console.error("Failed to delete question:", err);
      toast.error("Failed to delete question")
    }
  };

  const handleEditQuestion = (questionId) => {
    const questionForUpdate = questions.find((q) => q.id === questionId);
    if (questionForUpdate) {
      setQuestionData({
        question: questionForUpdate.question,
        options: questionForUpdate.options,
        correctAnswer: questionForUpdate.correctAnswer,
      });
      setEditingQuestionId(questionId);
    }
  };

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
            handleDeleteQuestion={handleDeleteQuestion}
            questions={questions}
            quizDetails={quizDetails}
          />
          {questions?.length > 0 && (
            <AddQuestionRight
              quizId={quizId}
              questions={questions}
              handleDeleteQuestion={handleDeleteQuestion}
              handleEditQuestion={handleEditQuestion}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default QuizEntryMain;
