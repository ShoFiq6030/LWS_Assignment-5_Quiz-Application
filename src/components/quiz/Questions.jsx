import React, { useEffect, useState } from "react";

import { useApi } from "../../hooks/useApi";

function Questions({ quizData, quizId }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const { api } = useApi();

  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const currentQuestion = quizData[currentQuestionIndex];

  useEffect(() => {
    setShuffledOptions(shuffleArray(currentQuestion.options));
  }, [currentQuestion]);

  const handleOptionChange = (questionId, option) => {
    setSelectedAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: option,
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      alert("You have reached the end of the quiz!");
    }
  };

  const handleSubmit = () => {
    // console.log(selectedAnswers);
    // const answers = {};
    // quizData.forEach((question) => {
    //   answers[question.id] = selectedAnswers[question.id];
    // });

    const data = {
      answers: selectedAnswers,
    };

    console.log(data);

    const postQuestions = async () => {
      try {
        const response = await api.post(
          `${import.meta.env.VITE_SERVER_URL}/api/quizzes/${quizId}/attempt`,
          data
        );
        console.log(response);
      } catch (error) {
        console.error(error);
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
          {currentQuestionIndex < quizData.length - 1 ? (
            <button
              onClick={handleNext}
              className="w-1/2 text-center ml-auto bg-primary text-white py-2 px-4 rounded-md hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary font-semibold"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="w-1/2 text-center ml-auto bg-primary text-white py-2 px-4 rounded-md hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary font-semibold"
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
