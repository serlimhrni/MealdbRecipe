# TheMealDB Recipe Dashboard - IF ELSE + Clickable Card

Project React untuk modul Integrasi API Backend dengan API resep makanan TheMealDB.

## Fitur

- Menggunakan TheMealDB API.
- Mengambil data dari beberapa endpoint:
  - `/search.php?s=`
  - `/filter.php?c=`
  - `/filter.php?a=`
  - `/categories.php`
  - `/list.php?a=list`
  - `/lookup.php?i=`
- Menggunakan IF ELSE API di `src/App.jsx`.
- Card resep bisa diklik untuk membuka detail resep.
- Card kategori dan area juga bisa diklik untuk mengganti filter resep.
- Search resep.
- Filter kategori.
- Filter area.
- Pagination.
- Loading state.
- Error handling.
- POST dummy ke JSONPlaceholder.
- Responsive.

## Cara Menjalankan

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Deployment Vercel

- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

## Checklist Mahasiswa

- ✅ Bisa menjelaskan apa itu RESTful API
- ✅ Bisa membedakan method GET dan POST
- ✅ Bisa menggunakan useEffect untuk mengambil data
- ✅ Bisa menampilkan loading state dan error handling
- ✅ Bisa mengirim data melalui form ke backend
- ✅ Bisa melakukan deployment aplikasi React

## Ketentuan Tugas

| No | Ketentuan | Status |
|---|---|---|
| 1 | Mengambil data minimal 2 endpoint berbeda | ✅ Ya |
| 2 | Menampilkan data dalam bentuk card/grid | ✅ Ya |
| 3 | Memiliki fitur pencarian/search | ✅ Ya |
| 4 | Memiliki fitur filter berdasarkan kategori | ✅ Ya |
| 5 | Ada loading state dan error handling | ✅ Ya |
| 6 | Responsif/mobile friendly | ✅ Ya |
| 7 | Menggunakan Tailwind CSS atau CSS Module/CSS | ✅ Ya |
