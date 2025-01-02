import React, { useEffect, useState } from "react";
import Dashboard from "./DashboardPage";
import DashboardSideBar from "../../components/admin/DashboardSideBar";
import CreateAndUpdateForm from "../../components/admin/CreateAndUpdateForm";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAllQuizDetails } from "../../hooks/useAllQuizDetails";
import BackSvg from "./../../components/svg/BackSvg";
import { toast } from "react-toastify";
import { useApi } from "../../hooks/useApi";

function UpdateQuizSetPage() {
  const { id: quizId } = useParams();
  const { allQuizDetails } = useAllQuizDetails();
  const { api } = useApi();
  const navigate = useNavigate();

  const isEdit = true;
  const [quizDetails, setQuizDetails] = useState({
    title: "",
    description: "",
    publish: false,
  });
  useEffect(() => {
    const quiz = allQuizDetails.find((quiz) => quiz.id === quizId);
    setQuizDetails({
      title: quiz.title,
      description: quiz.description,
      status: quiz.status,
    });
  }, [quizId]);
  const handleNextClick = async (e) => {
    e.preventDefault();
    console.log(quizDetails);
    const response = await api.patch(
      `${import.meta.env.VITE_SERVER_URL}/api/admin/quizzes/${quizId}`,
      quizDetails
    );
    if (response.status === 200) {
      toast.success("Quiz updated successfully");
      navigate(`/quiz_set_entry_page/${quizId}`);
    }
  };
  const handleDeleteClick = async () => {
    if (window.confirm("Are you sure you want to delete this quiz?")) {
      const response = await api.delete(
        `${import.meta.env.VITE_SERVER_URL}/api/admin/quizzes/${quizId}`
      );
      if (response.status === 200) {
        toast.success("Quiz deleted successfully");
        navigate("/dashboard");
      }
    }
  };

  return (
    <>
      <div className="bg-[#F5F3FF] min-h-screen flex">
        <DashboardSideBar />
        <main className="md:flex-grow px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <Link
                to={"/dashboard"}
                href="#"
                className="inline-flex items-center text-sm text-gray-600 mb-6 hover:text-buzzr-purple"
              >
                <BackSvg />
                Back to home
              </Link>

              <h2 className="text-3xl font-bold mb-6">
                Update your quiz title and description
              </h2>

              <CreateAndUpdateForm
                handleNextClick={handleNextClick}
                quizDetails={quizDetails}
                setQuizDetails={setQuizDetails}
                isEdit={isEdit}
                handleDeleteClick={handleDeleteClick}
              />
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default UpdateQuizSetPage;
