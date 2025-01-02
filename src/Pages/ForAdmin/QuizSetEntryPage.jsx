import React from "react";
import DashboardSideBar from "../../components/admin/DashboardSideBar";
import QuizEntryMain from "../../components/admin/QuizEntryMain";
import { useParams } from "react-router-dom";

function QuizSetEntryPage() {
  const {id} =useParams()
  console.log(id)
  
  return (
    <div className="bg-[#F5F3FF] min-h-screen flex">
      <DashboardSideBar />
      <QuizEntryMain quizId={id} />
    </div>
  );
}

export default QuizSetEntryPage;
