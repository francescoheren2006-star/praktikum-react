# Praktikum React JS – Dasar React dan Daftar Tugas Kuliah

Proyek React (Vite, JavaScript) berisi empat tugas pokok dan dua tugas pengayaan.

## Menjalankan

```bash
npm install
npm run dev
```

Buka URL `Local` yang dicetak terminal (biasanya http://localhost:5173).
Pemeriksaan tambahan: `npm run lint`, `npm run build`, `npm run preview`.

## Isi proyek

Pilih tugas melalui tombol tab di bagian atas halaman.

| Tugas | Berkas | Isi |
| --- | --- | --- |
| 1 | `src/components/ProfilMahasiswa.jsx` | Profil dari variabel, komponen `Judul`, `KartuProfil`, `Footer` |
| 2 | `src/components/DaftarMatkul.jsx` | Empat mata kuliah, komponen `KartuMatkul`, props, `key` stabil |
| 3 | `src/components/PenghitungKehadiran.jsx` | Tambah, kurangi, reset; batas 0 sampai 30 |
| 4 | `src/components/DaftarTugas.jsx` | Tambah, selesai, hapus, filter Semua/Aktif/Selesai |
| Pengayaan 1 | `src/components/DaftarTugas.jsx` | `localStorage` dengan lazy initializer, `try/catch`, dan `useEffect` |
| Pengayaan 2 | `src/components/DaftarTugas.jsx` | Edit judul tugas dengan validasi, `id` tetap |

Identitas (nama, NIM, program studi) diatur di `src/identitas.js`.
