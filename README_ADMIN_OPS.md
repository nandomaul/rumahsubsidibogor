# Admin Operations v1

Branch: `admin-ops-v1`

Preview tidak mengubah website publik atau `src/App.tsx`.

## Preview

```bash
npm install
npm run dev
```

Buka `http://localhost:5173/admin-ops.html`.

## Fitur

- Absensi datang/pulang, jam kerja 08:00–17:00.
- Check-in lewat 08:00 otomatis ditandai telat.
- Check-out sebelum 17:00 otomatis ditandai pulang cepat.
- Foto wajib.
- GPS/geolocation browser wajib.
- Absen hanya aktif jika posisi berada dalam radius kantor.
- To-do list dengan priority dan status selesai.
- Social report Instagram/TikTok/Facebook: followers, reach, views, likes, comments, shares, saves dan engagement rate.
- Chat harian: chat masuk, dibalas, follow-up, jadwal survey dan reply rate.
- Output konten: planned, dibuat, diedit, published, notes.

## Setting lokasi

Buat `.env.local`:

```env
VITE_OFFICE_LAT=ISI_LATITUDE_KANTOR
VITE_OFFICE_LNG=ISI_LONGITUDE_KANTOR
VITE_ATTENDANCE_RADIUS_METERS=150
```

Koordinat sengaja tidak ditebak. Jika belum ada koordinat, status jarak menjadi null dan tombol absen tidak aktif.

## Data preview

Versi ini menggunakan `localStorage` supaya flow bisa dites tanpa merusak backend lama. Saat source admin lama/Supabase sudah kembali, komponen `src/admin/operations` bisa diimport ke `AdminDashboard.tsx` dan storage adapter diganti ke Supabase.

Foto absensi sebaiknya disimpan di Supabase Storage bucket private, bukan public URL. Lokasi dan foto juga harus dibatasi berdasarkan role staff/admin.
