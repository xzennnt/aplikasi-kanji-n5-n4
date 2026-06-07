import { Navigate, useParams } from "react-router-dom";
import LessonCard from "../components/LessonCard";
import ProgressBar from "../components/ProgressBar";
import { getLessonsByLevel, isLevel, levelLabels } from "../data";
import { getLessonStatus, getOverallProgress, getProgress } from "../lib/progress";

export default function LevelPage() {
  const { level } = useParams();
  if (!isLevel(level)) return <Navigate to="/" replace />;

  const lessons = getLessonsByLevel(level);
  const progress = getProgress();
  const overallProgress = getOverallProgress(lessons, progress);

  return (
    <div className="space-y-6">
      <section className="rounded-lg border border-stone-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-akane">{levelLabels[level]}</p>
            <h1 className="mt-2 text-3xl font-black text-sumi">{levelLabels[level]} Lesson List</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-600">
              Pilih lesson, pelajari kanji satu per satu, lalu lanjutkan ke latihan.
            </p>
          </div>
          <div className="w-full md:w-72">
            <ProgressBar value={overallProgress} label={`${levelLabels[level]} hafalan`} />
          </div>
        </div>
      </section>
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {lessons.map((lesson) => (
          <LessonCard key={lesson.id} lesson={lesson} status={getLessonStatus(lesson, progress)} />
        ))}
      </section>
    </div>
  );
}
