import React from "react";

function CreateAndUpdateForm({
  handleNextClick,
  quizDetails,
  setQuizDetails,
  isEdit,
}) {
  return (
    <form onSubmit={handleNextClick}>
      <div className="mb-4">
        <label
          htmlFor="quiz-title"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Quiz title
        </label>
        <input
          type="text"
          id="quiz-title"
          name="quiz-title"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-buzzr-purple focus:border-buzzr-purple"
          placeholder="Quiz"
          onChange={(e) =>
            setQuizDetails({ ...quizDetails, title: e.target.value })
          }
          value={quizDetails.title}
        />
      </div>

      <div className="mb-6">
        <label
          htmlFor="quiz-description"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Description (Optional)
        </label>
        <textarea
          id="quiz-description"
          name="quiz-description"
          rows="4"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-buzzr-purple focus:border-buzzr-purple"
          placeholder="Description"
          onChange={(e) =>
            setQuizDetails({
              ...quizDetails,
              description: e.target.value,
            })
          }
          value={quizDetails.description}
        ></textarea>
      </div>
      {isEdit && (
        <div className="mb-6">
          <input
            type="checkbox"
            id="publish"
            name="publish"
            className="text-primary focus:ring-0 w-4 h-3"
            onChange={(e) =>
              setQuizDetails({
                ...quizDetails,
                publish: e.target.checked,
              })
            }
          />
          <label htmlFor="publish" className="m-1">
            Publish
          </label>
        </div>
      )}

      <button
        type="submit"
        className={`w-full block text-center ${
          quizDetails.title === "" ? "bg-gray-500 " : "bg-primary  hover:bg-primary/90"
        } text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary`}
        disabled={quizDetails.title === "" }
      >
        Next
      </button>
    </form>
  );
}

export default CreateAndUpdateForm;
