import React, { useEffect, useState } from "react";
import { useApi } from "../../hooks/useApi";

function AddQuestionRight({ quizId, questions }) {
  const { api } = useApi();
  console.log(quizId);

  // useEffect(() => {
  //   const getQuestions = async () => {
  //     try {
  //       // const response = await api.get(
  //       //   `${import.meta.env.VITE_SERVER_URL}/api/quizzes/${quizId}`
  //       // );
  //       // console.log(response.data);
  //       // setQuestions(response.data);
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   };
  //   getQuestions();
  // }, [quizId]);
  // console.log(questions)

  return (
    <div className="px-4">
      {questions?.map((question, index) => (
        <div
          key={question.question}
          className="rounded-lg overflow-hidden shadow-sm mb-4"
        >
          <div className="bg-white p-6 !pb-2">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                {index + 1}. {question.question}
              </h3>
            </div>
            {question?.options.map((option, index) => (
              <div key={option} className="space-y-2">
              <label className="flex items-center space-x-3">
                <input
                  type="radio"
                  name="answer1"
                  className="form-radio text-buzzr-purple"
                  checked={question.correctAnswer === option}
                />
                <span>{option}</span>
              </label>
              
            </div>
            ))}
            
          </div>
          <div className="flex space-x-4 bg-primary/10 px-6 py-2">
            <button className="text-red-600 hover:text-red-800 font-medium">
              Delete
            </button>
            <button className="text-primary hover:text-primary/80 font-medium">
              Edit Question
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AddQuestionRight;