# Kanji Challenge N5-N4

Aplikasi belajar kanji N5 dan N4 berbasis React, Vite, TypeScript, Tailwind CSS, dan React Router.

## Fitur

- Lesson N5 lengkap 1-11 dan N4 lengkap 1-20 berdasarkan struktur lesson PDF.
- Setiap kanji memiliki arti Indonesia, onyomi, kunyomi, dan contoh kosakata.
- Quiz pilihan ganda per lesson.
- Progress hafalan dan skor tersimpan di `localStorage`.
- Siap deploy sebagai aplikasi serverless/static di Vercel.

## Menjalankan Lokal

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Deploy Vercel

Import repository ini di Vercel, lalu gunakan konfigurasi default:

- Framework Preset: Vite
- Build Command: `npm run build`
- Output Directory: `dist`

File `vercel.json` sudah mengatur rewrite SPA agar route React Router bekerja saat refresh.
