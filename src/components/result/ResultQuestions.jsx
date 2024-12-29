import React from "react";
import star from "../../assets/icons/asterisk.png";

function ResultQuestions({ result, questions ,userCorrectAnswers}) {
  const submitted_answers = result?.submitted_answers;

  return (
    <div className="max-h-screen md:w-1/2 flex items-center justify-center h-full p-8">
      <div className="h-[calc(100vh-50px)] overflow-y-scroll">
        <div className="px-4">
          {questions.map((ques, index) => (
            <div
              key={ques.id}
              className="rounded-lg overflow-hidden shadow-sm mb-4"
            >
              <div className="bg-white p-6 !pb-2">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">
                    {index + 1}. {ques?.question}
                  </h3>
                </div>
                <div className="space-y-2">
                  {ques.options.map((option, index) => {
                    let bgColor = "";

                    // const isRight = userCorrectAnswers.some((ans) => {
                    //   if (ans.question_id == ques.id) {
                    //     return ques.options.some(
                    //       (opt) => opt === ans.answer
                    //     );
                    //   }
                    //   return false;
                    // });
                    const rightAnswer = userCorrectAnswers.find(
                      (ans) => ans?.question_id === ques?.id
                    )?.answer;

                    // console.log(rightAnswer);
                    const submittedAnswer = submitted_answers.find(
                      (ans) => ans?.question_id === ques?.id
                    );
                    if (
                      option === rightAnswer ||
                      option === ques?.correctAnswer
                    ) {
                      bgColor = "bg-green-300";
                    } else if (
                      submittedAnswer &&
                      option === submittedAnswer?.answer
                    ) {
                      bgColor = "bg-red-300"; // User's incorrect answer
                    }

                    return (
                      <div
                        key={`${option}-${index}`}
                        className={`rounded-md p-2 ${bgColor} `}
                      >
                        <label className="flex items-center space-x-3">
                          <img className="h-3" src={star} alt="" />
                          <span className="text-buzzr-purple">{option}</span>
                        </label>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="flex space-x-4 bg-primary/10 px-6 py-2">
                <div className="flex">
                  <div className="h-5 w-1 bg-red-600"></div>
                  <div className="text-red-600 font-medium">Wrong Answer</div>
                </div>
                <div className="flex">
                  <div className="h-5 w-1 bg-green-500"></div>
                  <div className="text-green-600 font-medium">Right Answer</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ResultQuestions;
