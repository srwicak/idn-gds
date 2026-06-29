# Glocal Daily Scrum — Cara Deploy ke Netlify

## Isi folder
- `index.html` — halaman utama (yang dibuka anggota tim)
- `netlify/functions/goals.js` — penyimpanan Monthly & Weekly goal (shared)
- `netlify.toml` — config Netlify
- `package.json` — daftar dependency (Netlify Blobs)

---

## Langkah deploy (cara paling gampang: drag & drop)

1. Buka https://app.netlify.com → login.
2. **Sites** → **Add new site** → **Deploy manually**.
3. Drag SELURUH folder ini (bukan isinya saja) ke area upload.
4. Tunggu build selesai. Situs langsung jadi, dapat URL `https://nama-acak.netlify.app`.

> Netlify Blobs (tempat nyimpen goal) otomatis aktif, tidak perlu setup apa pun.

### Atau via GitHub (kalau mau auto-update tiap push)
1. Upload folder ini ke repo GitHub.
2. Netlify → **Add new site** → **Import from Git** → pilih repo.
3. Build command kosongkan, publish directory `.`. Deploy.

---

## Set password admin

Ada 2 cara (pilih salah satu):

**Cara cepat:** buka `netlify/functions/goals.js`, ganti baris
`const FALLBACK_PASSWORD = "ganti-password-ini";` dengan password kamu, lalu deploy.

**Cara aman (disarankan):** di Netlify → **Site settings** → **Environment variables** →
tambah variable `ADMIN_PASSWORD` = password kamu. Tidak perlu sentuh kode.

---

## Cara pakai

**Kamu (admin):**
- Buka situs → klik **"Admin · edit goal"** di bawah.
- Tambah daftar proyek, isi Monthly & Weekly goal (bisa per proyek), masukkan password → **Simpan & publish**.
- Semua anggota langsung lihat versi terbaru, tanpa kamu kirim ulang file.

**Anggota tim:**
- Buka URL situs (cukup bookmark).
- Pilih proyek yang dikerjakan hari itu (boleh satu / beberapa).
- Isi Daily To-Do, Time Plan, Remaining, Issues.
- Klik **"Copy untuk Scrum"** → paste ke Slack.
- Data harian tersimpan otomatis di browser mereka (Senin–Jumat).
- **Jumat:** banner muncul + file rekap otomatis ke-download. Bisa juga klik **Download** kapan saja.
- File hasil download bisa dibuka lagi lewat tombol **"Load file"**.

---

## Catatan
- Monthly/Weekly = tersimpan di server (sama untuk semua).
- Daily = tersimpan lokal di browser tiap orang (privat). Reset tiap minggu baru — makanya didownload tiap Jumat.
