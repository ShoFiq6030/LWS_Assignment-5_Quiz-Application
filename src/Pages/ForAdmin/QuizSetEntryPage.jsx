import React from "react";
import DashboardSideBar from "../../components/admin/DashboardSideBar";
import QuizEntryMain from "../../components/admin/QuizEntryMain";

function QuizSetEntryPage() {
  return (
    <div className="bg-[#F5F3FF] min-h-screen flex">
      <DashboardSideBar />
      <QuizEntryMain />
    </div>
  );
}

export default QuizSetEntryPage;
