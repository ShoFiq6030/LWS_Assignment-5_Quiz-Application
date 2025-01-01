import React from "react";
import AddSvg from "../svg/AddSvg";
import MainSvg from "../svg/MainSvg";
import { useNavigate } from "react-router-dom";

function DashboardMain({ quizSets }) {
  
  const navigate = useNavigate();

  const handleAddNewQuiz = () => {
    // Navigate to the quiz creation page
    navigate("/quiz_set_page");
  };
  return (
    <main className="flex-grow p-10">
      <header className="mb-8">
        <h2 className="text-2xl font-semibold">Hey There 👋!</h2>
        <h1 className="text-4xl font-bold">Welcome Back To Your Quiz Hub!</h1>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div onClick={handleAddNewQuiz} className="group">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 ">
            <div className="text-buzzr-purple mb-4 group-hover:scale-105 transition-all">
              <AddSvg />
            </div>
            <h3 className="font-semibold text-lg mb-2 group-hover:scale-105 transition-all">
              Create a new quiz
            </h3>
            <p className="text-gray-600 text-sm group-hover:scale-105 transition-all">
              Build from the ground up
            </p>
          </div>
        </div>
        {quizSets?.map((quizSet) => (
          <div key={quizSet?.id} onClick={() => navigate(`/quiz_set_page/${quizSet?.id}`)} >
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 group cursor-pointer">
              <div className="text-buzzr-purple mb-4 group-hover:scale-105 transition-all">
                <MainSvg />
              </div>
              <h3 className="font-semibold text-lg mb-2 group-hover:scale-105 transition-all">
                {quizSet?.title}
              </h3>
              <p className="text-gray-600 text-sm group-hover:scale-105 transition-all">
                {quizSet?.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default DashboardMain;
