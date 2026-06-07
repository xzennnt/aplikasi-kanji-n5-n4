import { ArrowLeft, RotateCcw, Trophy } from "lucide-react";
import { useMemo, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import QuizCard from "../components/QuizCard";
import { getLesson, isLevel, levelLabels } from "../data";
import { getQuizForLesson } from "../lib/quiz";
import { saveQuizResult } from "../lib/progress";

export default function QuizPage() {
  const { level, lessonId } = useParams();
  const parsedLessonId = Number(lessonId);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  if (!isLevel(level) || !Number.isInteger(parsedLessonId)) return <Navigate to="/" replace />;

  const lesson = getLesson(level, parsedLessonId);
  if (!lesson) return <Navigate to={`/${level}`} replace />;

  const questions = useMemo(() => getQuizForLesson(lesson), [lesson]);
  const score = questions.filter((question) => answers[question.id] === question.correctAnswer).length;
  const wrongKanjiIds = questions
    .filter((question) => answers[question.id] !== question.correctAnswer)
    .map((question) => question.kanjiId);

  const handleSubmit = () => {
    setSubmitted(true);
    saveQuizResult(level, lesson.id, score, questions.length, wrongKanjiIds);
  };

  const handleReset = () => {
    setAnswers({});
    setSubmitted(false);
  };

  const allAnswered = questions.every((question) => answers[question.id]);

  return (
    <div className="space-y-6">
      <section className="rounded-lg border border-stone-200 bg-white p-6 shadow-sm">
        <Link to={`/${level}/lesson/${lesson.id}`} className="inline-flex items-center gap-2 text-sm font-bold text-akane">
          <ArrowLeft size={16} /> Kembali ke lesson
        </Link>
        <div className="mt-4 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-akane">{levelLabels[level]} Lesson {lesson.id}</p>
            <h1 className="mt-2 text-3xl font-black text-sumi">Latihan {lesson.theme}</h1>
          </div>
          {submitted && (
            <div className="rounded-lg bg-sumi px-5 py-4 text-white">
              <div className="flex items-center gap-2 text-sm font-semibold text-white/80"><Trophy size={17} /> Skor akhir</div>
              <p className="mt-1 text-3xl font-black">{score}/{questions.length}</p>
            </div>
          )}
        </div>
      </section>

      {questions.length > 0 ? (
        <>
          <section className="grid gap-4">
            {questions.map((question, index) => (
              <QuizCard
                key={question.id}
                question={question}
                index={index}
                selectedAnswer={answers[question.id]}
                submitted={submitted}
                onSelect={(answer) => setAnswers((current) => ({ ...current, [question.id]: answer }))}
              />
            ))}
          </section>
          <div className="flex flex-col gap-3 rounded-lg border border-stone-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-end">
            {submitted ? (
              <button type="button" onClick={handleReset} className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-stone-300 px-5 text-sm font-bold text-sumi transition hover:bg-stone-100">
                <RotateCcw size={17} /> Latihan ulang
              </button>
            ) : (
              <button
                type="button"
                disabled={!allAnswered}
                onClick={handleSubmit}
                className="inline-flex h-11 items-center justify-center rounded-full bg-vermilion px-6 text-sm font-bold text-white transition hover:bg-akane disabled:cursor-not-allowed disabled:bg-stone-300"
              >
                Submit jawaban
              </button>
            )}
          </div>
        </>
      ) : (
        <section className="rounded-lg border border-dashed border-stone-300 bg-white p-8 text-center shadow-sm">
          <p className="text-lg font-bold text-sumi">Quiz untuk lesson ini belum tersedia.</p>
          <p className="mt-2 text-sm text-zinc-600">Tambahkan minimal empat kanji atau isi quizData untuk membuat latihan.</p>
        </section>
      )}
    </div>
  );
}
