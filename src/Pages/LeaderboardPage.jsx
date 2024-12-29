import React, { useEffect } from "react";
import logo from "../assets/logo.svg";

import { useParams } from "react-router-dom";
import { useState } from "react";
import { useApi } from "../hooks/useApi";
import LeaderBoardLeft from "../components/leaderBoard/LeaderBoardLeft";
import LeaderBoardRight from "../components/leaderBoard/LeaderBoardRight";

function LeaderboardPage() {
  const [leaderBoardData, setLeaderBoardData] = useState();
  const { id } = useParams();
  const { api } = useApi();

  const attempts = leaderBoardData?.attempts;
  const quizData=leaderBoardData?.quiz

  const userMarkInfo = attempts
    ?.map((attempt) => {
      const submitted_answers = attempt?.submitted_answers;
      const correct_answers = attempt?.correct_answers;

      const userCorrectAnswers = correct_answers.filter((correctAnswer) => {
        const submittedAnswer = submitted_answers.find(
          (sa) => sa?.question_id === correctAnswer?.question_id
        );
        return (
          submittedAnswer && correctAnswer.answer === submittedAnswer.answer
        );
      });

      const userTotalMark = userCorrectAnswers.reduce((total, currentValue) => {
        return total + currentValue?.marks;
      }, 0);

      const totalCorrect = userCorrectAnswers.length;

      const totalWrong = submitted_answers.length - totalCorrect; // Wrong answers = Total submitted - Correct answers

      return {
        user: attempt?.user,
        totalMark: userTotalMark,
        totalCorrect,
        totalWrong,
      };
    })
    ?.sort((a, b) => b.totalMark - a.totalMark) // Sort by total marks (highest first)
    ?.map((user, index, sortedArray) => {
      // Add position field, considering ties
      const position =
        index > 0 && user.totalMark === sortedArray[index - 1].totalMark
          ? sortedArray[index - 1].position // Same position as the previous user if marks are equal
          : index + 1; // Otherwise, the position is the current index + 1

      return {
        ...user,
        position,
      };
    });

  console.log(userMarkInfo);

  useEffect(() => {
    const getLeaderBoardData = async () => {
      try {
        const response = await api.get(
          `${import.meta.env.VITE_SERVER_URL}/api/quizzes/${id}/attempts`
        );

        console.log(response);
        if (response.status === 200) {
          setLeaderBoardData(response?.data?.data);
        }
      } catch (error) {
        console.error("Failed to fetch quiz data:", error);
      }
    };
    getLeaderBoardData();
  }, [id]);

  console.log(leaderBoardData);
  return (
    <div className="bg-[#F5F3FF]  p-4">
      <main className="min-h-[calc(100vh-50px)] flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl overflow-hidden">
          <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <LeaderBoardLeft userMarkInfo={userMarkInfo} />

            <LeaderBoardRight userMarkInfo={userMarkInfo} quizData={quizData} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default LeaderboardPage;
