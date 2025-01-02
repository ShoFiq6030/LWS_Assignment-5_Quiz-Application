import React, { useEffect, useState } from "react";
import BackSvg from "./../svg/BackSvg";
import { Link, Navigate, useParams, useNavigate } from "react-router-dom";
import { useApi } from "../../hooks/useApi";
import { useAddQuiz } from "../../hooks/useAddQuiz";
import CreateAndUpdateForm from "./CreateAndUpdateForm";

function CreateQuizMain() {
  const { api } = useApi();

  const navigate = useNavigate();

  const [quizDetails, setQuizDetails] = useState({
    title: "",
    description: "",
  });

  const handleNextClick = async (e) => {
    e.preventDefault();
    console.log(quizDetails);
    try {
      const response = await api.post(
        `${import.meta.env.VITE_SERVER_URL}/api/admin/quizzes`,
        quizDetails
      );
      console.log(response.data.data);
      const quizId = response.data.data.id;
      if (quizId) {
        navigate(`/quiz_set_entry_page/${quizId}`);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setQuizDetails({ title: "", description: "" });
    }
  };

  return (
    <main className="md:flex-grow px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <Link
            to={"/dashboard"}
            className="inline-flex items-center text-sm text-gray-600 mb-6 hover:text-buzzr-purple"
          >
            <BackSvg />
            Back to home
          </Link>

          <h2 className="text-3xl font-bold mb-6">
            Give your quiz title and description
          </h2>

          <CreateAndUpdateForm
            handleNextClick={handleNextClick}
            quizDetails={quizDetails}
            setQuizDetails={setQuizDetails}
            isEdit={false}
          />
        </div>
      </div>
    </main>
  );
}

export default CreateQuizMain;
