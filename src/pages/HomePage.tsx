import { ArrowRight, BookOpen, ClipboardList } from "lucide-react";
import { Link } from "react-router-dom";
import ProgressBar from "../components/ProgressBar";
import { allLessons, n4Lessons, n5Lessons } from "../data";
import { getOverallProgress, getProgress } from "../lib/progress";

export default function HomePage() {
  const progress = getProgress();
  const overallProgress = getOverallProgress(allLessons, progress);
  const n5Progress = getOverallProgress(n5Lessons, progress);
  const n4Progress = getOverallProgress(n4Lessons, progress);

  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-lg border border-stone-200 bg-white shadow-soft">
        <div className="grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="p-6 sm:p-8 lg:p-10">
            <p className="text-sm font-bold uppercase tracking-wide text-akane">日本語 kanji study</p>
            <h1 className="mt-3 text-4xl font-black leading-tight text-sumi sm:text-5xl">Kanji Challenge N5-N4</h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-600">
              Belajar kanji per lesson, tandai yang sudah hafal, lalu cek pemahaman lewat latihan pilihan ganda.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link to="/n5" className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-vermilion px-6 text-base font-bold text-white transition hover:bg-akane">
                Masuk N5 <ArrowRight size={18} />
              </Link>
              <Link to="/n4" className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-stone-300 bg-white px-6 text-base font-bold text-sumi transition hover:border-red-200 hover:bg-red-50">
                Masuk N4 <ArrowRight size={18} />
              </Link>
            </div>
          </div>
          <div className="relative min-h-64 bg-sumi p-6 text-white sm:p-8 lg:p-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(215,53,53,0.45),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.10),transparent)]" />
            <div className="relative flex h-full flex-col justify-between gap-8">
              <div className="kanji-font text-8xl font-bold text-white/95">挑戦</div>
              <div className="space-y-4">
                <ProgressBar value={overallProgress} label="Total hafalan" />
                {progress.lastVisited ? (
                  <Link
                    to={`/${progress.lastVisited.level}/lesson/${progress.lastVisited.lessonId}`}
                    className="flex items-center justify-between rounded-lg bg-white/10 p-4 text-sm font-semibold text-white ring-1 ring-white/15 transition hover:bg-white/15"
                  >
                    <span>Terakhir: {progress.lastVisited.lessonTitle}</span>
                    <ArrowRight size={18} />
                  </Link>
                ) : (
                  <div className="rounded-lg bg-white/10 p-4 text-sm font-semibold text-white ring-1 ring-white/15">
                    Progress belajar terakhir akan muncul di sini.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border border-stone-200 bg-white p-5 shadow-sm">
          <BookOpen className="text-akane" size={24} />
          <h2 className="mt-4 text-lg font-bold">N5 Lessons</h2>
          <p className="mt-1 text-sm text-zinc-600">11 lesson sesuai struktur target.</p>
          <div className="mt-4"><ProgressBar value={n5Progress} label="N5" /></div>
        </div>
        <div className="rounded-lg border border-stone-200 bg-white p-5 shadow-sm">
          <BookOpen className="text-akane" size={24} />
          <h2 className="mt-4 text-lg font-bold">N4 Lessons</h2>
          <p className="mt-1 text-sm text-zinc-600">20 lesson placeholder siap diisi.</p>
          <div className="mt-4"><ProgressBar value={n4Progress} label="N4" /></div>
        </div>
        <Link to="/review" className="rounded-lg border border-stone-200 bg-white p-5 shadow-sm transition hover:border-red-200 hover:shadow-soft">
          <ClipboardList className="text-akane" size={24} />
          <h2 className="mt-4 text-lg font-bold">Review</h2>
          <p className="mt-1 text-sm text-zinc-600">Lihat kanji belum hafal dan yang sering salah.</p>
          <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-akane">
            Buka review <ArrowRight size={16} />
          </span>
        </Link>
      </section>
    </div>
  );
}
