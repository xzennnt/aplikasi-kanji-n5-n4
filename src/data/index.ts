import { n4Lessons } from "./n4Lessons";
import { n5Lessons } from "./n5Lessons";
import type { Level, Lesson } from "./types";

export { n4Lessons, n5Lessons };

export const lessonsByLevel: Record<Level, Lesson[]> = {
  n5: n5Lessons,
  n4: n4Lessons
};

export const allLessons = [...n5Lessons, ...n4Lessons];

export const levelLabels: Record<Level, string> = {
  n5: "N5",
  n4: "N4"
};

export function getLessonsByLevel(level: Level) {
  return lessonsByLevel[level];
}

export function getLesson(level: Level, lessonId: number) {
  return lessonsByLevel[level].find((lesson) => lesson.id === lessonId);
}

export function isLevel(value: string | undefined): value is Level {
  return value === "n5" || value === "n4";
}
