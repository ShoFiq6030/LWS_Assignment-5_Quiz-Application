import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

function AddQuestionRight({
  questions,
  handleDeleteQuestion,
  handleEditQuestion,
}) {
  console.log(questions);

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
            {question?.options.map((option) => {
              const uniqueId = uuidv4();
              return (
                <div key={uniqueId} className="space-y-2">
                  <label className="flex items-center space-x-3">
                    <input
                      type="radio"
                      id={uniqueId}
                      name={`answer-${uuidv4()}`}
                      className="form-radio text-buzzr-purple"
                      readOnly
                      checked={question.correctAnswer === option}
                    />
                    <span>{option}</span>
                  </label>
                </div>
              );
            })}
          </div>
          <div className="flex space-x-4 bg-primary/10 px-6 py-2">
            <button
              onClick={() => handleDeleteQuestion(question.id)}
              className="text-red-600 hover:text-red-800 font-medium"
            >
              Delete
            </button>
            <button
              className="text-primary hover:text-primary/80 font-medium"
              onClick={() => handleEditQuestion(question.id)}
            >
              Edit Question
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AddQuestionRight;
