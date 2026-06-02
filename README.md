# agung-inayatun-wedding-invitation

Website undangan pernikahan statis untuk **Agung Laksana** dan **Inayatun Ma'fuah**. Dibuat dengan HTML, CSS, dan vanilla JavaScript agar ringan, mobile-first, dan siap dipublikasikan melalui GitHub Pages.

## Struktur File

```text
.
├── index.html
├── style.css
├── script.js
├── assets/
│   ├── images/
│   │   ├── bride-placeholder.svg
│   │   ├── groom-placeholder.svg
│   │   ├── gallery-1.svg
│   │   ├── gallery-2.svg
│   │   ├── gallery-3.svg
│   │   └── gallery-4.svg
│   └── music/
│       └── background.mp3  # tambahkan sendiri, tidak disertakan
└── README.md
```

## Cara Mengedit Data Utama

### Nama pasangan

Edit teks nama di `index.html`, terutama pada bagian:

- Opening cover: `The Wedding of Agung & Inayatun`
- Hero: `Agung Laksana` dan `Inayatun Ma'fuah`
- Profil mempelai
- Closing section

### Tanggal pernikahan

Tanggal countdown diatur di `script.js` pada variabel berikut:

```js
const weddingDate = '2027-06-01T08:00:00+07:00';
```

Ganti nilai tersebut saat tanggal dan jam sudah pasti. Gunakan format:

```js
const weddingDate = 'YYYY-MM-DDTHH:mm:ss+07:00';
```

Teks tanggal yang tampil di halaman juga bisa diedit di `index.html`, misalnya pada hero dan kartu acara.

### Lokasi acara

Edit bagian **Akad Nikah** dan **Resepsi** di `index.html`. Ganti:

- Nama tempat
- Alamat lengkap
- Jam acara
- Link Google Maps pada atribut `href`

Contoh link Google Maps placeholder:

```html
https://maps.google.com/?q=Lokasi%20Pernikahan
```

## Cara Menambahkan Musik

1. Siapkan file musik legal/royalty-free milik Anda sendiri.
2. Ubah nama file menjadi `background.mp3`.
3. Letakkan di folder:

```text
assets/music/background.mp3
```

Catatan: website tidak memaksa autoplay. Musik baru diputar setelah tamu menekan tombol **Buka Undangan**, sesuai aturan browser modern.

## Cara Menambahkan Foto

Ganti file placeholder di folder `assets/images/` dengan foto Anda sendiri, atau ubah path gambar di `index.html`.

Rekomendasi:

- Foto profil mempelai: rasio 1:1, minimal 800 × 800 px.
- Foto galeri: rasio portrait 4:5, minimal 1000 px pada sisi panjang.
- Kompres gambar agar website tetap cepat dibuka di ponsel.

Jika memakai nama file baru, update atribut `src` dan `data-image` pada bagian galeri di `index.html`.

## Guest Name Query Parameter

Website mendukung nama tamu melalui parameter URL `to`.

Contoh:

```text
https://username.github.io/agung-inayatun-wedding-invitation/?to=Nama%20Tamu
```

Nama tersebut akan tampil pada opening cover. Jika parameter tidak tersedia, halaman menampilkan sapaan default `Bapak/Ibu/Saudara/i`.

## Fitur RSVP dan Ucapan

Form RSVP bersifat statis tanpa backend. Ucapan disimpan di `localStorage` browser tamu, sehingga:

- Tidak membutuhkan server/database.
- Data hanya tersimpan di perangkat/browser masing-masing tamu.
- Cocok untuk demo atau undangan statis GitHub Pages.

## Deploy ke GitHub Pages

1. Push semua file ke repository GitHub.
2. Buka repository di GitHub.
3. Masuk ke **Settings** → **Pages**.
4. Pada bagian **Build and deployment**, pilih:
   - Source: **Deploy from a branch**
   - Branch: `main` atau branch publikasi Anda
   - Folder: `/ (root)`
5. Klik **Save**.
6. Tunggu hingga GitHub Pages memberi URL publik.

Website ini tidak membutuhkan build step, dependency manager, atau backend.

## Catatan Kustomisasi

- Warna utama ada di `:root` pada `style.css`.
- Animasi scroll ada pada class `.reveal` dan JavaScript `IntersectionObserver`.
- Tombol salin amplop digital memakai Clipboard API dengan fallback sederhana.
- Lightbox galeri dibuat dengan vanilla JavaScript tanpa dependency eksternal.

  .
