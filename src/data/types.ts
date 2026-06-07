export type Level = "n5" | "n4";

export type KanjiExample = {
  word: string;
  reading: string;
  meaning: string;
};

export type KanjiEntry = {
  id: string;
  kanji: string;
  meaning: string;
  onyomi: string[];
  kunyomi: string[];
  examples: KanjiExample[];
};

export type Lesson = {
  id: number;
  level: Level;
  title: string;
  theme: string;
  sourceTitle?: string;
  kanji: KanjiEntry[];
};

export type QuizQuestionType =
  | "reading"
  | "meaning"
  | "kanji-from-reading"
  | "sentence-kanji";

export type QuizQuestion = {
  id: string;
  type: QuizQuestionType;
  kanjiId: string;
  prompt: string;
  choices: string[];
  correctAnswer: string;
  explanation: string;
};
