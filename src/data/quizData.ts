import type { QuizQuestion } from "./types";

export const quizData: Record<string, QuizQuestion[]> = {
  "n5-1": [
    {
      id: "n5-l1-q1",
      type: "reading",
      kanjiId: "n5-l1-yama",
      prompt: "Pilih bacaan kunyomi untuk 山.",
      choices: ["やま", "かわ", "つき", "きん"],
      correctAnswer: "やま",
      explanation: "山 dibaca やま saat berdiri sebagai kata gunung."
    },
    {
      id: "n5-l1-q2",
      type: "meaning",
      kanjiId: "n5-l1-mizu",
      prompt: "Apa arti dari 水?",
      choices: ["api", "air", "tanah", "bulan"],
      correctAnswer: "air",
      explanation: "水 berarti air dan muncul dalam 水曜日."
    },
    {
      id: "n5-l1-q3",
      type: "kanji-from-reading",
      kanjiId: "n5-l1-hi-fire",
      prompt: "Pilih kanji untuk bacaan ひ.",
      choices: ["火", "木", "金", "土"],
      correctAnswer: "火",
      explanation: "火 memiliki kunyomi ひ dan berarti api."
    },
    {
      id: "n5-l1-q4",
      type: "sentence-kanji",
      kanjiId: "n5-l1-tsuchi",
      prompt: "Pilih kanji yang benar: どようび adalah ___曜日.",
      choices: ["火", "水", "木", "土"],
      correctAnswer: "土",
      explanation: "土曜日 dibaca どようび, yaitu hari Sabtu."
    }
  ],
  "n5-2": [
    {
      id: "n5-l2-q1",
      type: "reading",
      kanjiId: "n5-l2-ichi",
      prompt: "Pilih bacaan untuk 一つ.",
      choices: ["ひとつ", "ふたつ", "みっつ", "よっつ"],
      correctAnswer: "ひとつ",
      explanation: "一つ dibaca ひとつ."
    },
    {
      id: "n5-l2-q2",
      type: "meaning",
      kanjiId: "n5-l2-hachi",
      prompt: "Apa arti dari 八?",
      choices: ["enam", "tujuh", "delapan", "sembilan"],
      correctAnswer: "delapan",
      explanation: "八 berarti delapan."
    },
    {
      id: "n5-l2-q3",
      type: "kanji-from-reading",
      kanjiId: "n5-l2-juu",
      prompt: "Pilih kanji untuk じゅう.",
      choices: ["十", "千", "百", "万"],
      correctAnswer: "十",
      explanation: "十 memiliki onyomi ジュウ."
    },
    {
      id: "n5-l2-q4",
      type: "sentence-kanji",
      kanjiId: "n5-l2-yon",
      prompt: "Pilih kanji yang benar: 四月 berarti bulan ke-__.",
      choices: ["一", "二", "三", "四"],
      correctAnswer: "四",
      explanation: "四月 adalah April, bulan keempat."
    }
  ]
};
