import { CheckCircle2, XCircle } from "lucide-react";
import type { QuizQuestion } from "../data/types";

type QuizCardProps = {
  question: QuizQuestion;
  index: number;
  selectedAnswer?: string;
  submitted: boolean;
  onSelect: (answer: string) => void;
};

export default function QuizCard({ question, index, selectedAnswer, submitted, onSelect }: QuizCardProps) {
  const isCorrect = selectedAnswer === question.correctAnswer;

  return (
    <article className="rounded-lg border border-stone-200 bg-white p-5 shadow-sm">
      <div className="flex items-start gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sumi text-sm font-bold text-white">{index + 1}</span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold uppercase tracking-wide text-akane">{question.type.replace(/-/g, " ")}</p>
          <h2 className="mt-1 text-lg font-bold text-sumi">{question.prompt}</h2>
        </div>
      </div>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {question.choices.map((choice) => {
          const selected = selectedAnswer === choice;
          const correct = submitted && choice === question.correctAnswer;
          const wrong = submitted && selected && choice !== question.correctAnswer;

          return (
            <button
              type="button"
              key={choice}
              disabled={submitted}
              onClick={() => onSelect(choice)}
              className={[
                "min-h-12 rounded-lg border px-4 py-3 text-left text-base font-semibold transition",
                selected ? "border-akane bg-red-50 text-akane" : "border-stone-200 bg-washi text-sumi hover:border-red-200",
                correct ? "border-emerald-500 bg-emerald-50 text-emerald-800" : "",
                wrong ? "border-red-500 bg-red-50 text-red-700" : ""
              ].join(" ")}
            >
              {choice}
            </button>
          );
        })}
      </div>
      {submitted && (
        <div className={`mt-5 rounded-lg border p-4 ${isCorrect ? "border-emerald-200 bg-emerald-50" : "border-red-200 bg-red-50"}`}>
          <div className={`flex items-center gap-2 text-sm font-bold ${isCorrect ? "text-emerald-700" : "text-red-700"}`}>
            {isCorrect ? <CheckCircle2 size={18} /> : <XCircle size={18} />}
            {isCorrect ? "Benar" : "Salah"}
          </div>
          <p className="mt-2 text-sm text-zinc-700">Jawaban benar: <span className="font-bold">{question.correctAnswer}</span></p>
          <p className="mt-1 text-sm text-zinc-700">{question.explanation}</p>
        </div>
      )}
    </article>
  );
}
