import { ArrowRight, CheckCircle2, Circle, Clock3 } from "lucide-react";
import { Link } from "react-router-dom";
import type { Lesson } from "../data/types";

type LessonCardProps = {
  lesson: Lesson;
  status: "belum mulai" | "belajar" | "selesai";
};

const statusStyle = {
  "belum mulai": {
    icon: Circle,
    className: "bg-stone-100 text-zinc-600"
  },
  belajar: {
    icon: Clock3,
    className: "bg-red-50 text-akane"
  },
  selesai: {
    icon: CheckCircle2,
    className: "bg-emerald-50 text-emerald-700"
  }
};

export default function LessonCard({ lesson, status }: LessonCardProps) {
  const StatusIcon = statusStyle[status].icon;

  return (
    <Link
      to={`/${lesson.level}/lesson/${lesson.id}`}
      className="group flex min-h-40 flex-col justify-between rounded-lg border border-stone-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-red-200 hover:shadow-soft"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-akane">{lesson.level.toUpperCase()} Lesson {lesson.id}</p>
          <h2 className="mt-2 text-xl font-bold text-sumi">{lesson.theme}</h2>
        </div>
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-red-50 text-lg font-bold text-akane">
          {lesson.id}
        </span>
      </div>
      <div className="mt-6 flex items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-stone-100 px-3 py-1 text-sm font-medium text-zinc-700">{lesson.kanji.length} kanji</span>
          <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-semibold ${statusStyle[status].className}`}>
            <StatusIcon size={15} />
            {status}
          </span>
        </div>
        <ArrowRight className="text-zinc-400 transition group-hover:translate-x-1 group-hover:text-akane" size={20} />
      </div>
    </Link>
  );
}
