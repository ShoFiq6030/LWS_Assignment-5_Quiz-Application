import React from "react";

export default function AddUpdateQuestion({
  questionData,
  handleAdd,
  handleTextChange,
  handleCorrectAnswerChange,
  handleOptionChange,
  questions
}) {
  console.log(questionData);
  return (
    <div className="">
      <h2 className="text-3xl font-bold mb-4">Binary Tree Quiz</h2>
      <div className="bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded-full inline-block mb-4">
        Total number of questions : {questions?.length}
      </div>
      <p className="text-gray-600 mb-4">
        Test understanding of binary tree traversal methods, tree properties,
        and algorithms.
      </p>

      <div className="space-y-4">
        <h2 className="text-xl font-bold text-foreground">Create Quiz</h2>

        <div>
          <label
            htmlFor="question"
            className="block text-sm font-medium text-foreground mb-1"
          >
            Question Title
          </label>
          <input
            type="text"
            id="question"
            name="question"
            className="w-full mt-2 p-2 border border-input rounded-md bg-background text-foreground"
            placeholder="Enter quiz title"
            onChange={handleTextChange}
            value={questionData.question}
          />
        </div>

        <p className="text-sm text-gray-600 mt-4">Add Options</p>

        <div id="optionsContainer" className="space-y-2 mt-4">
          {questionData.options.map((option, index) => (
            <div
              key={index}
              className="flex items-center space-x-2 px-4 py-1 rounded-md group focus-within:ring focus-within:ring-primary/80 bg-white"
            >
              <input
                type="checkbox"
                id={`option${index}`}
                name="correctAnswer"
                value={option}
                className="text-primary focus:ring-0 w-4 h-4"
                checked={questionData.correctAnswer === option}
                onChange={(e) => handleCorrectAnswerChange(e, option)}
                disabled={option===""}
              />
              <label htmlFor={`option${index}`} className="sr-only">
                Option {index + 1}
              </label>
              <input
                type="text"
                id={`optionText${index}`}
                className="w-full p-2 bg-transparent rounded-md text-foreground outline-none focus:ring-0"
                placeholder={`Option ${index + 1}`}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                value={option}
                
              />
            </div>
          ))}
        </div>
        {questionData.correctAnswer === "0" && <p className="text-red-400 pl-2">select a checkbox for correct answer</p>}
        <button
          className={`w-full   ${
            questionData.question.trim() === "" ||
            questionData.options.filter((option) => option.trim() !== "")
              .length < 4 ||
            questionData.correctAnswer === "0"
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-primary hover:bg-primary/90"
          } text-white text-primary-foreground p-2 rounded-md  transition-colors`}
          onClick={handleAdd}
          disabled={
            questionData.question.trim() === "" ||
            questionData.options.filter((option) => option.trim() !== "")
              .length < 4 ||
            questionData.correctAnswer === "0"
          }
        >
          Save Quiz
        </button>

      </div>
    </div>
  );
}
