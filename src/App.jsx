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

function App() {
  return (
    <>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/quiz_page/:id" element={<QuizPage />} />
          <Route path="/result" element={<ResultPage />} />
          <Route path="/leaderboard/:id" element={<LeaderboardPage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/quiz_set_page" element={<QuizSetPage />} />
        <Route path="/quiz_set_entry_page" element={<QuizSetEntryPage />} />
        <Route path="*" element={<NoFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
