import React, { useEffect, useState } from "react";
import { useApi } from "../../hooks/useApi";
import { toast } from "react-toastify";
import { useResult } from "../../hooks/useresult";
import { useNavigate } from "react-router-dom";

function Questions({
  questions,
  quizId,
  handleOptionChange,
  handleNext,
  currentQuestionIndex,
  selectedAnswers,
}) {
  const [shuffledOptions, setShuffledOptions] = useState([]);

  const { api } = useApi();
  const { setResult } = useResult();
  const navigate = useNavigate();

  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const currentQuestion = questions[currentQuestionIndex];

  useEffect(() => {
    setShuffledOptions(shuffleArray(currentQuestion.options));
  }, [currentQuestion]);

  // const handleOptionChange = (questionId, option) => {
  //   setSelectedAnswers((prevAnswers) => ({
  //     ...prevAnswers,
  //     [questionId]: option,
  //   }));
  // };

  // const handleNext = () => {
  //   if (currentQuestionIndex < questions.length - 1) {
  //     setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  //   } else {
  //     alert("You have reached the end of the quiz!");
  //   }
  // };

  const handleSubmit = () => {
    const data = {
      answers: selectedAnswers,
    };
    const postQuestions = async () => {
      try {
        const response = await api.post(
          `${import.meta.env.VITE_SERVER_URL}/api/quizzes/${quizId}/attempt`,
          data
        );
       
        if (response.status === 200) {
          toast.success("Quiz submitted successfully!");
          const quiz = response.data.data.quiz;
          const submitted_answers = response.data.data.submitted_answers;
          const correct_answers = response.data.data.correct_answers;
          const percentage = response.data.data.percentage;
          setResult({ quiz, submitted_answers, correct_answers, percentage });
          navigate("/result");
        }
        if (response.status === 400) {
          toast.error("Quiz submission failed!");
        }
      } catch (error) {
        console.error(error);
        toast.error(error.response.data.message);
        navigate('/login')
      }
    };

    postQuestions();
  };

  return (
    <div className="lg:col-span-2 bg-white">
      <div className="bg-white p-6 !pb-2 rounded-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-semibold">
            {currentQuestionIndex + 1}. {currentQuestion.question}
          </h3>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {shuffledOptions.map((option, index) => (
            <label
              key={index}
              className="flex items-center space-x-3 py-3 px-4 bg-primary/5 rounded-md text-lg"
            >
              <input
                type="checkbox"
                name={`answer${index}`}
                className="form-radio  text-buzzr-purple"
                onChange={() => handleOptionChange(currentQuestion.id, option)}
                checked={selectedAnswers[currentQuestion.id] === option}
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
        <div className="flex justify-between mt-4">
          {currentQuestionIndex < questions.length - 1 ? (
            <button
              onClick={handleNext}
              className={`w-1/2 text-center ml-auto text-white py-2 px-4 rounded-md hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary font-semibold ${
                !selectedAnswers[currentQuestion.id]
                  ? "bg-gray-300  cursor-not-allowed pointer-events-none"
                  : "bg-primary"
              }`}
              disabled={!selectedAnswers[currentQuestion.id]}
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className={`w-1/2 text-center ml-auto  text-white py-2 px-4 rounded-md hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary font-semibold ${
                !selectedAnswers[currentQuestion.id]
                  ? "bg-gray-300 opacity-50 cursor-not-allowed pointer-events-none"
                  : "bg-primary"
              }`}
              disabled={!selectedAnswers[currentQuestion.id]}
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Questions;
