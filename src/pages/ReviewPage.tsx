import { ArrowRight, RotateCcw } from "lucide-react";
import { Link } from "react-router-dom";
import { allLessons } from "../data";
import { getProgress, getUnmemorizedKanji } from "../lib/progress";

export default function ReviewPage() {
  const progress = getProgress();
  const allKanji = allLessons.flatMap((lesson) => lesson.kanji.map((kanji) => ({ kanji, lesson })));
  const unmemorized = getUnmemorizedKanji(allKanji.map((item) => item.kanji), progress);
  const frequentMistakes = Object.entries(progress.mistakes)
    .sort((a, b) => b[1] - a[1])
    .map(([kanjiId, count]) => {
      const match = allKanji.find((item) => item.kanji.id === kanjiId);
      return match ? { ...match, count } : undefined;
    })
    .filter(Boolean)
    .slice(0, 12);

  return (
    <div className="space-y-6">
      <section className="rounded-lg border border-stone-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-bold uppercase tracking-wide text-akane">Review</p>
        <h1 className="mt-2 text-3xl font-black text-sumi">Kanji yang perlu diulang</h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-600">
          Halaman ini membaca data hafalan dan skor dari localStorage.
        </p>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-lg border border-stone-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-black text-sumi">Belum hafal</h2>
          <div className="mt-4 grid gap-3">
            {unmemorized.length > 0 ? (
              unmemorized.slice(0, 12).map((item) => {
                const lesson = allLessons.find((candidate) => candidate.kanji.some((kanji) => kanji.id === item.id));
                return (
                  <Link
                    key={item.id}
                    to={lesson ? `/${lesson.level}/lesson/${lesson.id}` : "/"}
                    className="flex items-center justify-between gap-3 rounded-lg border border-stone-200 bg-washi p-4 transition hover:border-red-200"
                  >
                    <div className="flex items-center gap-3">
                      <span className="kanji-font text-3xl font-bold">{item.kanji}</span>
                      <div>
                        <p className="font-bold text-sumi">{item.meaning}</p>
                        <p className="text-sm text-zinc-600">{lesson?.title}</p>
                      </div>
                    </div>
                    <ArrowRight className="text-zinc-400" size={18} />
                  </Link>
                );
              })
            ) : (
              <p className="rounded-lg bg-emerald-50 p-4 text-sm font-semibold text-emerald-700">Semua kanji sample sudah ditandai hafal.</p>
            )}
          </div>
        </div>

        <div className="rounded-lg border border-stone-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-black text-sumi">Sering salah</h2>
          <div className="mt-4 grid gap-3">
            {frequentMistakes.length > 0 ? (
              frequentMistakes.map((item) => item && (
                <div key={item.kanji.id} className="flex items-center justify-between gap-3 rounded-lg border border-stone-200 bg-washi p-4">
                  <div className="flex items-center gap-3">
                    <span className="kanji-font text-3xl font-bold">{item.kanji.kanji}</span>
                    <div>
                      <p className="font-bold text-sumi">{item.kanji.meaning}</p>
                      <p className="text-sm text-zinc-600">Salah {item.count}x di {item.lesson.title}</p>
                    </div>
                  </div>
                  <Link to={`/${item.lesson.level}/lesson/${item.lesson.id}/quiz`} className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-vermilion px-4 text-sm font-bold text-white transition hover:bg-akane">
                    <RotateCcw size={16} /> Ulang
                  </Link>
                </div>
              ))
            ) : (
              <p className="rounded-lg bg-stone-100 p-4 text-sm font-semibold text-zinc-700">Belum ada riwayat salah dari quiz.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
