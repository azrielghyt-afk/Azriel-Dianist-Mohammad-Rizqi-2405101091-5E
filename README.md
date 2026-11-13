# Azriel-Dianist-Mohammad-Rizqi-2405101091-5E

# Pengumpulan UTS Pemrograman Web Dasar

## Identitas Mahasiswa

- Nama: Azriel Dianist Mohammad Rizqi
- NIM: 2405101091
- Kelas: 5E
- Program Studi: Teknik Informatika
- Mata Kuliah: Pemrograman Web Dasar
- Tahun Akademik: 2026

## Deskripsi

Repository ini berisi source code, dokumentasi hasil pengerjaan Ujian Tengah Semester (UTS)
mata kuliah Pemrograman Web Dasar.

## Deskripsi Pengerjaan UTS

Aplikasi yang dibuat adalah **INCESTICIDE**, sebuah website toko online (e-commerce) yang menjual
pakaian, aksesoris, dan sepatu. Rancangan fitur, halaman, dan data produk mengikuti lembar analisa
UTS (berkas *Tugas Analisa Pemrograman Web Dasar - PROJEK UTS*), yang memuat 34 produk (ditambah 4 produk baru, total 38) beserta
merek, harga, ukuran, dan keterangannya.

Website dibangun hanya dengan **HTML, CSS, dan JavaScript murni** (tanpa framework dan tanpa server).
Karena tidak memakai database server, data produk, akun, keranjang, pesanan, dan pesan kontak
disimpan di `localStorage` browser sebagai pengganti database. Halaman berpindah dengan sistem
*hash routing* (satu `index.html`), sehingga seluruh aplikasi berjalan di sisi browser.

Ada dua jenis pengguna:

- **Pelanggan**: melihat katalog, memilih ukuran, berbelanja, dan memantau pesanan.
- **Admin**: mengelola produk, kategori, dan status pesanan.

## Fitur yang Diimplementasikan

1. **Beranda**: banner, foto landscape kolase 6 gaya (casual, formal, grunge, punk, indie, timeless), daftar kategori, dan produk unggulan.
2. **Katalog produk**: tampilan **slide** (tanpa scroll ke bawah; tombol panah, titik navigasi, panah keyboard, dan geser di HP), bio katalog dan bio singkat tiap produk, pencarian, filter kategori (Pakaian, Aksesoris, Sepatu), dan pengurutan harga termurah atau termahal.
3. **Detail produk**: foto, merek, harga, deskripsi, stok, pilihan ukuran, dan jumlah beli.
4. **Registrasi dan login**: validasi nama, email, nomor HP, dan kata sandi; email tidak boleh ganda; ada pembagian peran pelanggan dan admin.
5. **Keranjang belanja**: tambah, kurangi, dan hapus item; total harga dihitung otomatis; jumlah dibatasi sesuai stok.
6. **Ikon keranjang** pada menu navigasi.
6b. **Checkout dan pembayaran**: form data penerima (nama, HP, alamat, kota, kode pos) dengan validasi, pilihan metode pembayaran **QRIS** atau **transfer rekening** (instruksi bayar tampil otomatis), ringkasan pesanan, dan stok berkurang otomatis setelah pesanan dibuat.
7. **Riwayat pesanan**: daftar pesanan pelanggan beserta metode dan status pembayaran, serta **unggah bukti transaksi** (pilih file gambar lalu "Kirim bukti") serta status pesanan; pesanan berstatus "Menunggu" dapat dibatalkan dan stoknya dikembalikan.
8. **Halaman kontak**: informasi toko dan form pesan dengan validasi.
9. **Dashboard admin**: jumlah pesanan, total penjualan, pesanan menunggu, jumlah produk, daftar stok menipis, dan pesan masuk.
10. **Kelola produk dan kategori (admin)**: tambah, ubah, hapus produk (dengan bio dan **unggah foto produk**); tambah dan hapus kategori.
11. **Kelola pesanan (admin)**: melihat metode dan status pembayaran, **melihat bukti transaksi dari pelanggan**, serta mengubah status pesanan (Menunggu, Diproses, Dikirim, Selesai).
12. **Tampilan responsif**: nyaman dibuka di laptop maupun HP, dengan notifikasi (toast) untuk setiap aksi penting.

## Struktur Folder

- `uts/`: Source code dan file pendukung UTS.
  - `uts/index.html`: halaman utama (titik masuk aplikasi).
  - `uts/css/style.css`: seluruh gaya tampilan.
  - `uts/js/app.js`: logika aplikasi (data, login, katalog, keranjang, checkout, pesanan, kontak, admin).
  - `uts/img/`: 38 foto produk (`1.jpg` sampai `38.jpg`, sesuai nomor produk), `beranda-gaya.jpg` (kolase beranda), `hero-band.jpg` (foto banner hitam beranda), dan `qris.png` (gambar QRIS toko, opsional).
- `uts/screenshots/`: Bukti visual hasil implementasi.
  - `01-beranda.png`
  - `02-katalog.png`
  - `03-detail-produk.png`
  - `04-registrasi.png`
  - `05-login.png`
  - `06-keranjang.png`
  - `07-checkout.png`
  - `08-riwayat-pesanan.png`
  - `09-kontak.png`
  - `10-dashboard-admin.png`
  - `11-kelola-produk.png`
  - `12-kelola-pesanan.png`

## Cara Menjalankan Aplikasi

Aplikasi tidak memerlukan instalasi, server, maupun koneksi internet.

1. Clone atau unduh repository ini, lalu ekstrak jika berbentuk ZIP.
2. Buka folder `uts/`.
3. Klik dua kali `index.html` (atau buka lewat browser seperti Chrome, Edge, atau Firefox).
4. Alternatif: jalankan server lokal dari folder `uts/`, misalnya `python -m http.server 8000`, lalu buka `http://localhost:8000`.

**Akun untuk mencoba:**

| Peran     | Email                   | Kata sandi |
|-----------|-------------------------|------------|
| Admin     | admin@incesticide.com   | admin123   |
| Pelanggan | daftar sendiri lewat menu **Daftar** | (bebas, min. 6 karakter) |

**Catatan:**

- Data tersimpan di `localStorage` browser yang sama. Untuk mengembalikan data ke kondisi awal, hapus data situs lewat pengaturan browser (atau jalankan `localStorage.clear()` di konsol), lalu muat ulang halaman.
- Kata sandi disimpan apa adanya di `localStorage` karena aplikasi ini hanya untuk keperluan pembelajaran dan tidak dimaksudkan untuk penggunaan produksi.

## Referensi

- Lembar analisa UTS *Tugas Analisa Pemrograman Web Dasar - PROJEK UTS* (daftar produk, harga, ukuran, dan kebutuhan fitur).
- MDN Web Docs, dokumentasi HTML, CSS, JavaScript, dan Web Storage API (`localStorage`): https://developer.mozilla.org
- Foto produk bersumber dari gambar yang dikumpulkan penulis untuk keperluan tugas ini; hak cipta foto dan merek dimiliki oleh pemiliknya masing-masing.
