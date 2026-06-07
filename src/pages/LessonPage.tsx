import { ArrowLeft, ArrowRight, ClipboardList } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import KanjiCard from "../components/KanjiCard";
import ProgressBar from "../components/ProgressBar";
import { getLesson, getLessonsByLevel, isLevel, levelLabels } from "../data";
import { getProgress, isKanjiMemorized, recordLessonVisit, toggleKanjiMemorized } from "../lib/progress";

export default function LessonPage() {
  const { level, lessonId } = useParams();
  const parsedLessonId = Number(lessonId);
  const [version, setVersion] = useState(0);

  if (!isLevel(level) || !Number.isInteger(parsedLessonId)) return <Navigate to="/" replace />;

  const lesson = getLesson(level, parsedLessonId);
  if (!lesson) return <Navigate to={`/${level}`} replace />;

  const lessons = getLessonsByLevel(level);
  const previousLesson = lessons.find((item) => item.id === lesson.id - 1);
  const nextLesson = lessons.find((item) => item.id === lesson.id + 1);
  const progress = getProgress();

  useEffect(() => {
    recordLessonVisit(lesson);
  }, [lesson]);

  const memorizedCount = useMemo(
    () => lesson.kanji.filter((item) => isKanjiMemorized(item.id, progress)).length,
    [lesson.kanji, progress, version]
  );
  const lessonProgress = lesson.kanji.length ? Math.round((memorizedCount / lesson.kanji.length) * 100) : 0;

  const handleToggle = (kanjiId: string) => {
    toggleKanjiMemorized(kanjiId);
    setVersion((current) => current + 1);
  };

  return (
    <div className="space-y-6">
      <section className="rounded-lg border border-stone-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-akane">{levelLabels[level]} Lesson {lesson.id}</p>
            <h1 className="mt-2 text-3xl font-black text-sumi">{lesson.theme}</h1>
            <p className="mt-2 text-sm text-zinc-600">{lesson.kanji.length} kanji dalam lesson ini.</p>
          </div>
          <div className="w-full md:w-72">
            <ProgressBar value={lessonProgress} label="Kanji hafal" />
          </div>
        </div>
      </section>

      {lesson.kanji.length > 0 ? (
        <section className="grid gap-4">
          {lesson.kanji.map((item) => (
            <KanjiCard key={item.id} item={item} memorized={isKanjiMemorized(item.id, getProgress())} onToggle={handleToggle} />
          ))}
        </section>
      ) : (
        <section className="rounded-lg border border-dashed border-stone-300 bg-white p-8 text-center shadow-sm">
          <p className="text-lg font-bold text-sumi">Lesson ini masih placeholder.</p>
          <p className="mt-2 text-sm text-zinc-600">Struktur data sudah siap diisi di folder src/data.</p>
        </section>
      )}

      <nav className="flex flex-col gap-3 rounded-lg border border-stone-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-2">
          {previousLesson && (
            <Link to={`/${level}/lesson/${previousLesson.id}`} className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-stone-300 px-4 text-sm font-bold text-sumi transition hover:bg-stone-100">
              <ArrowLeft size={17} /> Sebelumnya
            </Link>
          )}
          {nextLesson && (
            <Link to={`/${level}/lesson/${nextLesson.id}`} className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-stone-300 px-4 text-sm font-bold text-sumi transition hover:bg-stone-100">
              Berikutnya <ArrowRight size={17} />
            </Link>
          )}
        </div>
        <Link to={`/${level}/lesson/${lesson.id}/quiz`} className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-vermilion px-5 text-sm font-bold text-white transition hover:bg-akane">
          <ClipboardList size={17} /> Mulai latihan
        </Link>
      </nav>
    </div>
  );
}
