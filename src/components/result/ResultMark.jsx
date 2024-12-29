import React from "react";
import logo from "../../assets/logo-white.svg";
import { CircularProgressbar } from "react-circular-progressbar";
import { Link } from "react-router-dom";

function ResultMark({ result, userCorrectAnswers, questions,quiz }) {
  let percentage = result.percentage;
  console.log(quiz);

  const userMarks = userCorrectAnswers
    .map((ans) => ans.mark)
    .reduce((total, currentValue) => {
      return total + currentValue;
    }, 0);
  return (
    <>
      <img src={logo} alt="logo" className="max-h-11 fixed left-6 top-6 z-50" />

      <div className="max-h-screen overflow-hidden hidden lg:flex lg:w-1/2 bg-primary flex-col justify-center p-12 relative">
        <div>
          <div className="text-white">
            <div>
              <h2 className="text-4xl font-bold mb-2">{result?.quiz?.title}</h2>
              <p>
                A quiz on React hooks like useState, useEffect, and useContext.
              </p>
            </div>
            <div className="my-6 flex items-center">
              <div className="w-1/2">
                <div className="flex gap-6 my-6">
                  <div>
                    <p className="font-semibold text-2xl my-0">
                      {questions.length}
                    </p>
                    <p className="text-gray-300">Questions</p>
                  </div>
                  <div>
                    <p className="font-semibold text-2xl my-0">
                      {userCorrectAnswers.length}
                    </p>
                    <p className="text-gray-300">Correct</p>
                  </div>
                  <div>
                    <p className="font-semibold text-2xl my-0">
                      {questions.length - userCorrectAnswers.length}
                    </p>
                    <p className="text-gray-300">Wrong</p>
                  </div>
                </div>
                <Link
                  to={"/leaderboard/"}
                  className="bg-secondary py-3 rounded-md hover:bg-secondary/90 transition-colors text-lg font-medium underline text-white"
                >
                  View Leaderboard
                </Link>
              </div>
              <div className="w-1/2 bg-primary/80 rounded-md border border-white/20 flex items-center p-4">
                <div className="flex-1">
                  <p className="text-2xl font-bold">
                    {userMarks}/{result?.quiz?.total_marks}
                  </p>
                  <p>Your Mark</p>
                </div>
                <div>
                  <CircularProgressbar
                    className="h-20"
                    styles={{
                      text: {
                        fill: "#fff",
                      },
                    }}
                    value={percentage}
                    text={`${percentage}%`}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ResultMark;
