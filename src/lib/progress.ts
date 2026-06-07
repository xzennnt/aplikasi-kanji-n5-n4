import type { KanjiEntry, Lesson, Level } from "../data/types";

const STORAGE_KEY = "kanji-challenge-progress-v1";

export type LessonScore = {
  score: number;
  total: number;
  completedAt: string;
  wrongKanjiIds: string[];
};

export type ProgressState = {
  memorizedKanjiIds: string[];
  lessonScores: Record<string, LessonScore>;
  mistakes: Record<string, number>;
  visitedLessons: string[];
  lastVisited?: {
    level: Level;
    lessonId: number;
    lessonTitle: string;
  };
};

const defaultProgress: ProgressState = {
  memorizedKanjiIds: [],
  lessonScores: {},
  mistakes: {},
  visitedLessons: []
};

const canUseStorage = () => typeof window !== "undefined" && !!window.localStorage;

export function getProgress(): ProgressState {
  if (!canUseStorage()) return defaultProgress;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? { ...defaultProgress, ...JSON.parse(raw) } : defaultProgress;
  } catch {
    return defaultProgress;
  }
}

export function saveProgress(progress: ProgressState) {
  if (!canUseStorage()) return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function getLessonKey(level: Level, lessonId: number) {
  return `${level}-${lessonId}`;
}

export function isKanjiMemorized(kanjiId: string, progress = getProgress()) {
  return progress.memorizedKanjiIds.includes(kanjiId);
}

export function toggleKanjiMemorized(kanjiId: string) {
  const progress = getProgress();
  const memorized = new Set(progress.memorizedKanjiIds);

  if (memorized.has(kanjiId)) {
    memorized.delete(kanjiId);
  } else {
    memorized.add(kanjiId);
  }

  const next = { ...progress, memorizedKanjiIds: [...memorized] };
  saveProgress(next);
  return next;
}

export function recordLessonVisit(lesson: Lesson) {
  const progress = getProgress();
  const lessonKey = getLessonKey(lesson.level, lesson.id);
  const visitedLessons = Array.from(new Set([...progress.visitedLessons, lessonKey]));
  const next = {
    ...progress,
    visitedLessons,
    lastVisited: {
      level: lesson.level,
      lessonId: lesson.id,
      lessonTitle: lesson.title
    }
  };
  saveProgress(next);
  return next;
}

export function getLessonStatus(lesson: Lesson, progress = getProgress()) {
  const lessonKey = getLessonKey(lesson.level, lesson.id);
  const score = progress.lessonScores[lessonKey];
  const memorizedCount = lesson.kanji.filter((item) => progress.memorizedKanjiIds.includes(item.id)).length;

  if ((score && score.score === score.total && score.total > 0) || (lesson.kanji.length > 0 && memorizedCount === lesson.kanji.length)) {
    return "selesai";
  }

  if (score || progress.visitedLessons.includes(lessonKey) || memorizedCount > 0) {
    return "belajar";
  }

  return "belum mulai";
}

export function saveQuizResult(level: Level, lessonId: number, score: number, total: number, wrongKanjiIds: string[]) {
  const progress = getProgress();
  const lessonKey = getLessonKey(level, lessonId);
  const mistakes = { ...progress.mistakes };

  wrongKanjiIds.forEach((id) => {
    mistakes[id] = (mistakes[id] ?? 0) + 1;
  });

  const next: ProgressState = {
    ...progress,
    mistakes,
    lessonScores: {
      ...progress.lessonScores,
      [lessonKey]: {
        score,
        total,
        completedAt: new Date().toISOString(),
        wrongKanjiIds
      }
    }
  };

  saveProgress(next);
  return next;
}

export function getOverallProgress(lessons: Lesson[], progress = getProgress()) {
  const kanji = lessons.flatMap((lesson) => lesson.kanji);
  if (kanji.length === 0) return 0;
  const memorized = kanji.filter((item) => progress.memorizedKanjiIds.includes(item.id)).length;
  return Math.round((memorized / kanji.length) * 100);
}

export function getUnmemorizedKanji(kanji: KanjiEntry[], progress = getProgress()) {
  return kanji.filter((item) => !progress.memorizedKanjiIds.includes(item.id));
}
