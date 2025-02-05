import React from "react";
import { useNavigate } from "react-router-dom";

function QuizCard({ quiz }) {
  const { id, title, description, thumbnail, status, is_attempted=true } = quiz;

  const navigate = useNavigate();

  const handleClick = () => {
    if (!is_attempted) {
      navigate(`/quiz_page/${id}`); // Navigate to the quiz page with the quiz ID
    } else {
      navigate(`/leaderboard/${id}`); // Navigate to the leaderboard page with the quiz ID
      // navigate(`/result`); // Navigate to the leaderboard page with the quiz ID
    }
  };

  if (status !== "published") {
    return null; // Don't render anything if not published
  }

  return (
    <div
      onClick={handleClick}
      className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl  transition-shadow max-h-[450px] relative group cursor-pointer"
    >
      <div className="group-hover:scale-105 mx-auto absolute transition-all text-white  text-center top-1/2 -translate-y-1/2 px-4">
        <h1 className=" text-4xl " style={{ fontFamily: "Jaro" }}>
          {title}
        </h1>
        <p className="mt-2 text-lg ">{description}</p>
      </div>
      <div className="hidden absolute transition-all bg-black/80 w-full h-full left-0 top-0 text-white group-hover:grid place-items-center">
        {is_attempted && (
          <div>
            <h1 className="text-3xl font-bold">Already Participated</h1>
            <p className="text-center">Click to view your leaderboard</p>
          </div>
        )}
      </div>
      <img
        src={thumbnail}
        alt="JavaScript Hoisting"
        className="w-full h-full object-cover rounded mb-4"
      />
    </div>
  );
}

export default QuizCard;
