import { Check, RotateCcw } from "lucide-react";
import type { KanjiEntry } from "../data/types";

type KanjiCardProps = {
  item: KanjiEntry;
  memorized: boolean;
  onToggle: (kanjiId: string) => void;
};

export default function KanjiCard({ item, memorized, onToggle }: KanjiCardProps) {
  return (
    <article className="rounded-lg border border-stone-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
        <div className="flex items-center gap-4 sm:w-48 sm:flex-col sm:items-start">
          <div className="kanji-font flex h-24 w-24 shrink-0 items-center justify-center rounded-lg bg-stone-50 text-6xl text-sumi ring-1 ring-stone-200">
            {item.kanji}
          </div>
          <button
            type="button"
            onClick={() => onToggle(item.id)}
            className={[
              "inline-flex h-10 items-center justify-center gap-2 rounded-full px-4 text-sm font-bold transition",
              memorized ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100" : "bg-vermilion text-white hover:bg-akane"
            ].join(" ")}
          >
            {memorized ? <RotateCcw size={16} /> : <Check size={16} />}
            {memorized ? "ulang lagi" : "sudah hafal"}
          </button>
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-red-50 px-3 py-1 text-sm font-bold text-akane">{item.meaning}</span>
            <span className="rounded-full bg-stone-100 px-3 py-1 text-sm font-medium text-zinc-700">
              Onyomi: {item.onyomi.length ? item.onyomi.join(" / ") : "-"}
            </span>
            <span className="rounded-full bg-stone-100 px-3 py-1 text-sm font-medium text-zinc-700">
              Kunyomi: {item.kunyomi.length ? item.kunyomi.join(" / ") : "-"}
            </span>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {item.examples.map((example) => (
              <div key={`${item.id}-${example.word}-${example.reading}`} className="rounded-lg border border-stone-200 bg-washi p-4">
                <p className="kanji-font text-2xl font-bold text-sumi">{example.word}</p>
                <p className="mt-1 text-sm font-semibold text-akane">{example.reading}</p>
                <p className="mt-2 text-sm text-zinc-600">{example.meaning}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
