# DETEKTIF KEBAIKAN – Petualangan Belajar Moral Bersama Dodo
### Interactive Moral Learning Game for Early Childhood Education (PGPAUD 5–6 Years)
### Major UI/UX Redesign: Premium 3D Cartoon (Mama Apps – Apps for Kids Inspired)

[![Platform](https://img.shields.io/badge/Platform-Web%20(HTML5%20%7C%20CSS3%20%7C%20Vanilla%20JS)-FF2A85.svg)](#)
[![Visual Style](https://img.shields.io/badge/Style-Premium%203D%20Cartoon%20(Mama%20Apps)-FFD12A.svg)](#)
[![Target](https://img.shields.io/badge/Target-PGPAUD%20%2F%20TK%20Kelompok%20B%20(5--6%20Tahun)-38B6FF.svg)](#)
[![Duration](https://img.shields.io/badge/Duration-Maksimal%203%20Menit%20(180s)-22C55E.svg)](#)

---

## 🌟 1. Ringkasan Redesain Visual (Major 3D Cartoon Overhaul)

Sesuai arahan desain terbaru, **Detektif Kebaikan** telah dirombak secara menyeluruh dari ilustrasi flat 2D / bentuk geometris CSS menjadi **kualitas visual aplikasi game edukasi anak profesional dengan gaya 3D Cartoon Premium** terinspirasi dari **Mama Apps – Apps for Kids**.

### ✨ Karakteristik Visual Baru:
1. **High Quality 3D Character Illustration**: Karakter burung kuning Dodo memiliki tekstur halus seperti mainan *vinyl toy* 3D, mata biru bulat ekspresif bercahaya, topi detektif cokelat, ransel ungu, paruh oranye menggemaskan, dan kaca pembesar emas mengkilap.
2. **Pencahayaan Studio & Soft Shadows**: Setiap aset visual dan karakter dilengkapi bayangan jatuh lembut (*contact drop shadows*), *ambient occlusion*, serta *specular highlights* yang memberikan kedalaman ruang 3D nyata.
3. **Komponen UI Rounded 3D**: Tombol dan kartu berdesain *pill & rounded card* dengan efek tekan taktil 3D (*tactile push depth*), gradasi warna cerah (Magenta, Pink, Kuning Cerah, Oranye, Biru Langit, dan Hijau Pastel), serta tipografi besar Google Fonts (`Fredoka`, `Baloo 2`, `Nunito`).

---

## 🐥 2. Maskot Utama: Detektif Dodo 3D

Karakter Dodo hadir dengan pose 3D berkualitas tinggi yang konsisten di seluruh scene permainan:
- **`dodo_welcome.png`** (1024x1024): Dodo menyapa dan melambaikan sayap dengan senyum ceria, memegang kaca pembesar emas di tangan satunya. Digunakan pada sampul pembuka (Scene 1) dan banner pemandu di Scene 2.
- **`dodo_thinking.png`** (1024x1024): Dodo sedang berpikir dengan sayap menyentuh dagu dan memegang kaca pembesar, membimbing anak saat kuis moral (Scene 3).
- **`dodo_celebrating.png`** (1024x1024): Dodo melompat gembira merayakan kemenangan dengan medali emas, bintang berkilau, dan konfeti perayaan (Scene 4).

---

## 🗺️ 3. Alur Permainan 4 Scene (3D Redesign)

### 🎪 Scene 1 – Opening Cover Game 3D
- **Komposisi Profesional**:
  - Sisi Kiri: Judul besar 3D candy-gloss **"DETEKTIF KEBAIKAN"**, badge tagline *"Ayo Temukan Kebaikan Hari Ini!"*, deskripsi pengantar yang ramah, dan tombol oranye 3D berukuran besar **"MULAI BERMAIN"** dengan animasi denyut (*bounce*).
  - Sisi Kanan: Maskot Dodo 3D berukuran besar (260px) dengan balon dialog sapaan 3D dan tombol dengarkan suara.
  - Latar Belakang: Gradasi pink-magenta lembut dengan matahari 3D, bintang berkilau, dan awan mengambang.

### 🔎 Scene 2 – Hidden Object Taman Bermain 3D
- **Ilustrasi Lingkungan 3D Kaya Detail** (`assets/images/playground_scene_3d.png`):
  - Rumput hijau bertingkat dengan pencahayaan lembut dan bunga aster.
  - Pepohonan 3D volumetrik dan jalan setapak batu bulat.
  - Perosotan anak 3D merah-kuning glossy dan ayunan kayu A-frame 3D.
  - Bangku taman kayu 3D bertekstur hangat dengan bola sepak 3D hitam-putih yang terjebak di bawah kolong bangku.
- **5 Aktivitas Anak Interaktif (Hotspots)**:
  1. *Doni*: Meluncur ceria di perosotan 3D.
  2. *Aisyah*: Mengayun riang di ayunan 3D.
  3. *Siti*: Membaca buku cerita di bawah pohon rindang 3D.
  4. *Rian*: Menggiring bola sepak di lapangan rumput 3D.
  5. **Boni (Target Kebaikan)**: Bersedih di samping bangku taman karena bola sepaknya tersangkut di bawah bangku dan tidak bisa dijangkau.
- **Mekanisme Umpan Balik Positif**:
  - Memilih Boni memicu efek bintang gemerincing, partikel bintang keemasan, penambahan bintang, dan transisi ke Scene 3.
  - Memilih anak lain memicu petunjuk ramah tanpa penalti: *"Hmm, coba cari teman yang terlihat kesulitan, yuk!"*.

### 🧠 Scene 3 – Tantangan Moral 3D
- **Panel Situasi Visual 3D**: Menampilkan gambar *close-up* situasi Boni di bangku taman (`assets/images/boni_bench_closeup.png`).
- **Kartu Pilihan Jawaban 3D**:
  - *Pertanyaan 1 (Meminta Bantuan)*:
    - **Pilihan A (Benar)**: "Tolong bantu aku mengambil bola itu." (Ikon 3D tangan santun meminta tolong & hati bersinar).
    - Pilihan B (Salah): "Merebut bola teman." (Ikon 3D anak marah / cemberut).
    - Pilihan C (Salah): "Diam saja." (Ikon 3D anak diam merajuk).
  - *Pertanyaan 2 (Berterima Kasih)*:
    - **Pilihan A (Benar)**: "Terima kasih!" (Ikon 3D senyum bahagia, jabat tangan & cinta).
    - Pilihan B (Salah): "Pergi begitu saja." (Ikon 3D anak lari tergesa-gesa).

### 🏆 Scene 4 – Closing, Praktik Kata Ajaib & Lencana 3D
- **Ilustrasi Kerjasama 3D** (`assets/images/helping_success_scene.png`): Lina mengembalikan bola kepada Boni dengan senyum bahagia dan persahabatan hangat.
- **Kartu Kata Ajaib Fonik Interaktif**:
  - Kartu 1: **"TOLONG"** `[TO - LONG]` (Ikon 3D tangan santun + audio pelafalan).
  - Kartu 2: **"TERIMA KASIH"** `[TE - RI - MA KA - SIH]` (Ikon 3D hati berkilau + audio pelafalan).
- **Lencana Emas 3D "PAHLAWAN KEBAIKAN"** (`assets/images/gold_medal_3d.png`): Lencana logam emas berkilau dengan pita biru-merah, 3 bintang emas 3D, dan hujan konfeti meriah.
- Tombol **"MAIN LAGI"** 3D dan tombol **"Panduan Guru"**.

---

## 📁 4. Struktur Berkas & Aset 3D

```
IGnite/
├── index.html                   # Semantic HTML5 dengan header 3D pill dan modal Kurikulum Merdeka
├── css/
│   └── style.css                # Desain 3D Cartoon, Mama Apps palette, tactile push buttons, responsivitas
├── js/
│   ├── audio.js                 # Web Audio API Synthesizer (BGM marimba, pop, fanfare) & SpeechSynthesis
│   ├── visuals.js               # Visual engine penyedia aset Dodo 3D, playground 3D, & lencana
│   └── script.js                # Game controller, 180s circular timer, click guard, flow 4 scene
├── assets/
│   └── images/
│       ├── dodo_welcome.png     # Render 3D Dodo menyapa & melambaikan sayap (1024x1024)
│       ├── dodo_thinking.png    # Render 3D Dodo berpikir dengan sayap di dagu (1024x1024)
│       ├── dodo_celebrating.png # Render 3D Dodo melompat gembira merayakan kemenangan (1024x1024)
│       ├── playground_scene_3d.png # Render 3D lanskap taman bermain 5 anak (1400x800)
│       ├── boni_bench_closeup.png  # Render 3D situasi close-up Boni di samping bangku (800x500)
│       ├── helping_success_scene.png # Render 3D Lina & Boni saling membantu (800x500)
│       ├── gold_medal_3d.png    # Render 3D medali emas dengan pita
│       ├── soccer_ball_3d.png   # Render 3D bola sepak
│       ├── sun_3d.png           # Render 3D matahari senyum
│       ├── star_3d.png          # Render 3D bintang berkilau
│       ├── folded_hands_3d.png  # Render 3D tangan santun meminta tolong
│       ├── sparkling_heart_3d.png # Render 3D hati bersinar
│       ├── smiling_hearts_3d.png# Render 3D wajah bersyukur
│       ├── angry_face_3d.png    # Render 3D wajah cemberut/marah
│       └── running_boy_3d.png   # Render 3D anak lari tanpa bicara
└── README.md                    # Dokumentasi lengkap
```

---

## 🚀 5. Cara Menjalankan

1. Buka folder proyek:
   ```bash
   cd "C:\Users\Hype\Documents\IGnite"
   ```
2. Jalankan server lokal:
   ```bash
   python -m http.server 8080
   ```
3. Buka peramban modern di alamat:
   ```
   http://localhost:8080/index.html
   ```
4. Atau langsung klik dua kali file `index.html` untuk memainkannya secara langsung!

---
*Game edukasi anak usia dini profesional dengan kualitas visual 3D Cartoon Premium 🇮🇩.*
