import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import LessonPage from "./pages/LessonPage";
import LevelPage from "./pages/LevelPage";
import QuizPage from "./pages/QuizPage";
import ReviewPage from "./pages/ReviewPage";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="review" element={<ReviewPage />} />
        <Route path=":level" element={<LevelPage />} />
        <Route path=":level/lesson/:lessonId" element={<LessonPage />} />
        <Route path=":level/lesson/:lessonId/quiz" element={<QuizPage />} />
      </Route>
    </Routes>
  );
}
