import { quizData } from "../data/quizData";
import type { KanjiEntry, Lesson, QuizQuestion } from "../data/types";

function unique<T>(items: T[]) {
  return Array.from(new Set(items));
}

function makeChoices(correct: string, options: string[]) {
  return unique([correct, ...options.filter((item) => item !== correct)]).slice(0, 4);
}

function firstReading(kanji: KanjiEntry) {
  return kanji.kunyomi[0] ?? kanji.onyomi[0] ?? "-";
}

export function getQuizForLesson(lesson: Lesson): QuizQuestion[] {
  const explicitQuiz = quizData[`${lesson.level}-${lesson.id}`];
  if (explicitQuiz?.length) return explicitQuiz;

  if (lesson.kanji.length < 4) return [];

  const meanings = lesson.kanji.map((item) => item.meaning);
  const readings = lesson.kanji.map(firstReading);
  const kanjiChars = lesson.kanji.map((item) => item.kanji);

  return lesson.kanji.slice(0, 4).map((item, index) => {
    const type = (["reading", "meaning", "kanji-from-reading", "sentence-kanji"] as const)[index % 4];

    if (type === "reading") {
      const correctAnswer = firstReading(item);
      return {
        id: `${item.id}-reading`,
        type,
        kanjiId: item.id,
        prompt: `Pilih bacaan untuk ${item.kanji}.`,
        choices: makeChoices(correctAnswer, readings),
        correctAnswer,
        explanation: `${item.kanji} dapat dibaca ${correctAnswer} pada kosakata dasar.`
      };
    }

    if (type === "meaning") {
      return {
        id: `${item.id}-meaning`,
        type,
        kanjiId: item.id,
        prompt: `Apa arti dari ${item.kanji}?`,
        choices: makeChoices(item.meaning, meanings),
        correctAnswer: item.meaning,
        explanation: `${item.kanji} berarti ${item.meaning}.`
      };
    }

    if (type === "kanji-from-reading") {
      const reading = firstReading(item);
      return {
        id: `${item.id}-kanji-from-reading`,
        type,
        kanjiId: item.id,
        prompt: `Pilih kanji untuk bacaan ${reading}.`,
        choices: makeChoices(item.kanji, kanjiChars),
        correctAnswer: item.kanji,
        explanation: `${reading} adalah salah satu bacaan untuk ${item.kanji}.`
      };
    }

    const example = item.examples[0];
    return {
      id: `${item.id}-sentence-kanji`,
      type,
      kanjiId: item.id,
      prompt: `Pilih kanji yang benar untuk kata ${example?.reading ?? firstReading(item)}.`,
      choices: makeChoices(item.kanji, kanjiChars),
      correctAnswer: item.kanji,
      explanation: `${example?.word ?? item.kanji} berarti ${example?.meaning ?? item.meaning}.`
    };
  });
}
