import { Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import RegistrationPage from "./Pages/RegistrationPage";
import QuizPage from "./Pages/QuizPage";
import ResultPage from "./Pages/ResultPage";
import LeaderboardPage from "./Pages/LeaderboardPage";
import Dashboard from "./Pages/ForAdmin/DashboardPage";
import QuizSetPage from "./Pages/ForAdmin/QuizSetPage";
import QuizSetEntryPage from "./Pages/ForAdmin/QuizSetEntryPage";
import NoFoundPage from "./Pages/NoFoundPage";
import PrivateRoutes from "./routes/PrivateRoutes";
import UpdateQuizSetPage from "./Pages/ForAdmin/UpdateQuizSetPage";
import AdminRoutes from "./routes/AdminRoutes";

function App() {
  return (
    <>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/quiz_page/:id" element={<QuizPage />} />
          <Route path="/leaderboard/:id" element={<LeaderboardPage />} />
          <Route path="/result" element={<ResultPage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route element={<AdminRoutes />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/quiz_set_page/" element={<QuizSetPage />} />
          <Route path="/quiz_set_page/:id" element={<UpdateQuizSetPage />} />
          <Route
            path="/quiz_set_entry_page/:id"
            element={<QuizSetEntryPage />}
          />
        </Route>
        <Route path="*" element={<NoFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
