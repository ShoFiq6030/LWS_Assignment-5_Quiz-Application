import React from "react";
import logo from "../assets/logo.svg";
import avatar from "../assets/avater.webp";
import bg2 from "../assets/backgrounds/2.jpg";
import bg5 from "../assets/backgrounds/5.jpg";
import bg1 from "../assets/backgrounds/1.jpeg";
import bg3 from "../assets/backgrounds/3.jpg";

function HomePage() {
  return (
    <div className="bg-[#F5F3FF] min-h-screen">
      <div className="container mx-auto py-3">
        <header className="flex justify-between items-center mb-12">
          <img src={logo} className="h-7" />
          <div>
            <button
              className="px-4 py-2 rounded hover:bg-primary hover:text-white transition-colors"
              style={{ fontFamily: "Jaro" }}
            >
              Login
            </button>

            <button
              className="px-4 py-2 rounded hover:bg-primary hover:text-white transition-colors"
              style={{ fontFamily: "Jaro" }}
            >
              Logout
            </button>
          </div>
        </header>

        <div className="text-center mb-12">
          <img
            src={avatar}
            alt="Profile Picture"
            className="w-32 h-32 rounded-full border-4 border-primary mx-auto mb-4 object-cover"
          />
          <p className="text-xl text-gray-600">Welcome</p>
          <h2
            className="text-4xl font-bold text-gray-700"
            style={{ fontFamily: "Jaro" }}
          >
            Saad Hasan
          </h2>
        </div>
        <main className="bg-white p-6 rounded-md h-full">
          <section>
            <h3 className="text-2xl font-bold mb-6">Participate In Quizees</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <a
                href="./result.html"
                className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow max-h-[450px] relative group cursor-pointer"
              >
                <div className="group-hover:scale-105 absolute transition-all text-white  text-center top-1/2 -translate-y-1/2 px-4">
                  <h1 className=" text-5xl" style={{ fontFamily: "Jaro" }}>
                    JavaScript Basic Quiz
                  </h1>
                  <p className="mt-2 text-lg">
                    Test your knowledge of JavaScript basics with quizzes that
                    cover essential concepts, syntax, and foundational
                    programming skills
                  </p>
                </div>
                <div className="hidden absolute transition-all bg-black/80 w-full h-full left-0 top-0 text-white group-hover:grid place-items-center">
                  <div>
                    <h1 className="text-3xl font-bold">Already Participated</h1>
                    <p className="text-center">
                      Click to view your leaderboard
                    </p>
                  </div>
                </div>
                <img
                  src={bg2}
                  alt="JavaScript Hoisting"
                  className="w-full h-full object-cover rounded mb-4"
                />
              </a>

              <a
                href="./quiz_page.html"
                className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow max-h-[450px] cursor-pointer group relative"
              >
                <div className="group-hover:scale-105 absolute transition-all text-white  text-center top-1/2 -translate-y-1/2 px-4">
                  <h1 className=" text-5xl" style={{ fontFamily: "Jaro" }}>
                    JavaScript Basic Quiz
                  </h1>
                  <p className="mt-2 text-lg">
                    Test your knowledge of JavaScript basics with quizzes that
                    cover essential concepts, syntax, and foundational
                    programming skills
                  </p>
                </div>
                <img
                  src={bg3}
                  alt="JavaScript Hoisting"
                  className="w-full h-full object-cover rounded mb-4 transition-all "
                />
              </a>

              <div className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow max-h-[450px] cursor-pointer group relative">
                <div className="group-hover:scale-105 absolute transition-all text-white  text-center top-1/2 -translate-y-1/2 px-4">
                  <h1 className=" text-5xl" style={{ fontFamily: "Jaro" }}>
                    JavaScript Basic Quiz
                  </h1>
                  <p className="mt-2 text-lg">
                    Test your knowledge of JavaScript basics with quizzes that
                    cover essential concepts, syntax, and foundational
                    programming skills
                  </p>
                </div>
                <img
                  src={bg5}
                  alt="JavaScript Hoisting"
                  className="w-full h-full object-cover rounded mb-4 transition-all "
                />
              </div>

              <div className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow max-h-[450px] relative group cursor-pointer ">
                <div className="absolute transition-all text-white  text-center top-1/2 -translate-y-1/2 px-4">
                  <h1 className=" text-5xl" style={{ fontFamily: "Jaro" }}>
                    JavaScript Basic Quiz
                  </h1>
                  <p className="mt-2 text-lg">
                    Test your knowledge of JavaScript basics with quizzes that
                    cover essential concepts, syntax, and foundational
                    programming skills
                  </p>
                </div>
                <div className="hidden absolute transition-all bg-black/80 w-full h-full left-0 top-0 text-white group-hover:grid place-items-center">
                  <div>
                    <h1 className="text-3xl font-bold">Already Participated</h1>
                    <p className="text-center">You got 20 out of 50</p>
                  </div>
                </div>
                <img
                  src={bg1}
                  alt="JavaScript Hoisting"
                  className="w-full h-full object-cover rounded mb-4 "
                />
              </div>
            </div>
          </section>
        </main>

        <footer className="mt-6 mb-3 opacity-40 text-center">
          Copyright & copy; 2024 Learn With Sumit | All Rights Reserved
        </footer>
      </div>
    </div>
  );
}

export default HomePage;
