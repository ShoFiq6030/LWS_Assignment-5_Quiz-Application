import React from "react";
import DashboardSideBar from "../../components/admin/DashboardSideBar";
import CreateQuizMain from "../../components/admin/CreateQuizMain";

function QuizSetPage() {
  
  return (
    <div className="bg-[#F5F3FF] min-h-screen flex">
      <DashboardSideBar/>
      <CreateQuizMain/>
    </div>
  );
}

export default QuizSetPage;
