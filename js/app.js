/* INCESTICIDE - Toko Online (HTML, CSS, JS murni). Data disimpan di localStorage sebagai "database". */
const $ = s => document.querySelector(s);
const rp = n => 'Rp ' + Number(n).toLocaleString('id-ID');
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const MEM = {};
const LS = {
  get: (k, d) => { try { const v = JSON.parse(localStorage.getItem(k)); if (v != null) return v } catch { } return k in MEM ? JSON.parse(MEM[k]) : d },
  set: (k, v) => { const j = JSON.stringify(v); MEM[k] = j; try { localStorage.setItem(k, j) } catch { } }
};
const EM = { Pakaian: '👕', Aksesoris: '💍', Sepatu: '👟' };
const STATUS = ['Menunggu', 'Diproses', 'Dikirim', 'Selesai'];
const PHONE = /^(\+62|62|0)8\d{7,12}$/;
const BANK = [{ bank: 'BCA', no: '1234567890', an: 'INCESTICIDE' }, { bank: 'BRI', no: '098765432101', an: 'INCESTICIDE' }]; // ganti dengan rekening asli
const S = { q: '', cat: '', sort: '', page: 0 };

/* ---------- Data awal (dari sheet KETERANGAN PRODUK) ---------- */
const CK = { P: 'Pakaian', A: 'Aksesoris', S: 'Sepatu' };
const RAW = `Kaos Polos Hitam|P|Screamous|200000|S,M,L,XL|Kaos katun lengan pendek.
Kemeja Flanel|P|Uniqlo|399000|S,M,L,XL|Kemeja lengan panjang motif kotak.
Jaket Denim|P|Levi's|1100000|M,L,XL,XXL|Jaket berbahan denim tebal.
Celana Jeans|P|Levi's|1750000|27-34|Celana jeans model loose fit.
Topi Baseball|A|MLB Yankees|900000|All size|Bahan katun dengan pengait belakang.
Jam Tangan|A|Casio & G-Shock|1500000|All size|Terkenal sangat awet dan tangguh.
Anting|A|Pearl Style|55000|All size|Mutiara sintetis (sepasang).
Kalung Berliontin Simpel Titanium|A|La Vienna Infinity|95000|45 cm,50 cm,55 cm,60 cm|Liontin mini berlapis titanium, anti karat.
Gelang Rantai|A|Frankfurt|45000|S,M,L|Gelang rantai anti karat.
Piercing Hoop|A|Hoop Studio|25000|8 mm,10 mm|Bahan stainless steel.
Sepatu Adidas Spezial|S|Adidas|1999000|36-44|Sneakers warna hitam dan putih.
Sepatu Loafers|S|Nappa Milano|800000|39-44|Sepatu formal dan casual berbahan kulit.
Kacamata Hitam Vintage|A|The Gentlement's|100000|Universal|Frame plastik tebal, lensa UV.
Septum Piercing|A|Indo Piercing|65000|Universal|Piercing septum.
Sepatu Converse Chuck Taylor 70's|S|Converse|1289000|36-44|Sneakers hitam.
Sepatu Vans Old School|S|Vans|1000000|35-45|Sneakers hitam.
Sepatu New Balance|S|New Balance|1786000|35-45|Sneakers putih dan silver.
Flat Shoes Charles & Keith|S|Charles & Keith|1099000|35-41|Flat shoes berbahan kulit.
Chrome Hearts Diamond Dagger Ring|A|Chrome Hearts|58000000|3-17|Perak 925 motif belati dengan serpihan berlian. Kontras desain perak yang berat dan maskulin dengan kilau berlian berkualitas.
Chrome Hearts Paper Chain Logo Engraved 925 Silver Necklace|A|Chrome Hearts|50000000|18 inci,20 inci,22 inci,24 inci,26 inci,28 inci,30 inci|Perak sterling 925 berkualitas tinggi.
Chrome Hearts Slush Bussin II Sunglasses|A|Chrome Hearts|26500000|Universal|Kacamata dengan kesan mewah yang khas.
Celana Corduroy|P|Uniqlo|399000|27-34|Bahan cotton, cocok untuk casual.
Celana Pendek|P|Under Armour|240000|26-35|Celana pendek berbahan nilon.
Sepatu Nike P-6000|S|Nike|1744000|36-46|Sneakers gaya hidup (lifestyle sneaker).
Hoodie GAP|P|GAP|700000|XS,S,M,L,XL,XXL,XXXL|Jaket hoodie tebal, 100% cotton.
Overshirt Stone Island|P|Stone Island|7000000|S,M,L,XL|Jaket nilon dengan pewarnaan Garment Dyed, lencana kompas di lengan yang bisa dilepas dan dipasang.
Ear Partner|A|Partner|89000|8 mm,12 mm|Anting tusuk zirkon untuk telinga luar, perak murni 925 dan titanium.
Bandana Slayer|A|Akse.id|40000|53x53 cm|Untuk aktivitas outdoor dan naik gunung, juga gaya fashion.
Tas JanSport SuperBreak Plus|A|Jansport.id|599400|Universal|Tas dengan kompartemen laptop.
Gesper Punk Spike Pyramid|A|No Brand|101000|110 cm|Gesper kulit sintetis, lebar 3,7 cm.
Kristal Rantai Celana Titanium|A|Lanme Jewelry|35000|45 cm,50 cm,55 cm,60 cm|Titanium anti karat dengan aksen kristal.
Carabiner Keychain Pelmerry Black|A|Thankinsomnia|200000|Universal|Gantungan kunci karabiner logam minimalis, kokoh, dengan beberapa cincin kunci dan label logam.
Voyej Karimata IV Black Rise (Short Wallet)|A|Voyej|899750|Universal|Dompet kulit sapi vegetable tanned lokal berkualitas tinggi.
Scarf Burberry|A|Burberry|7100000|Universal|Bahan premium (kasmir, wol, atau sutra), ditenun di Skotlandia dan disikat dengan tanaman teasel agar sangat lembut.
Beanie Rajut Incesticide|A|Incesticide|85000|All size|Kupluk rajut tebal dengan lipatan di tepi, hangat dan pas di kepala.
Tote Bag Kanvas Hancurkan Gaya Biasa|A|Incesticide|75000|Universal|Tas kanvas tebal dengan sablon dua warna, muat buku, laptop, dan belanjaan harian.
Kaos Oversize Washed Noise|P|Incesticide|229000|S,M,L,XL|Kaos oversize katun dengan efek washed abu-abu dan sablon logo heksagon.
Boots Kulit Hitam Combat|S|Incesticide|1350000|38-44|Boots kulit hitam dengan tali krem dan sol karet tebal anti selip.`;
const BIO = {
  1: 'Basic hitam yang tidak pernah salah.', 2: 'Kotak-kotak ala anak indie tongkrongan.', 3: 'Denim klasik yang makin keren dipakai makin lama.', 4: 'Loose fit nyaman untuk seharian jalan.',
  5: 'Topi wajib untuk gaya street yang santai.', 6: 'Tahan banting, cocok untuk petualang.', 7: 'Sentuhan mutiara yang manis dan simpel.', 8: 'Simpel, ringan, anti karat.', 9: 'Rantai tegas untuk pergelangan tangan.',
  10: 'Detail kecil, kesan besar.', 11: 'Hitam putih yang jadi ikon sneakers.', 12: 'Dari kantor sampai nongkrong, tetap rapi.', 13: 'Frame tebal ala vintage, lensa tetap aman.', 14: 'Aksen berani untuk wajahmu.',
  15: 'Si tinggi legendaris untuk gaya grunge.', 16: 'Sneakers skate yang lahir dari jalanan.', 17: 'Retro, nyaman, silver yang mencuri perhatian.', 18: 'Anggun dan ringan dipakai seharian.', 19: 'Statement mewah berlapis perak 925.',
  20: 'Rantai berat, kesan tak terlupakan.', 21: 'Kacamata mewah untuk tampil beda.', 22: 'Corduroy hangat untuk gaya vintage.', 23: 'Ringan, cepat kering, siap bergerak.', 24: 'Gaya hidup modern di setiap langkah.',
  25: 'Hoodie tebal, pelukan paling hangat.', 26: 'Jaket kelas atas dengan lencana khas.', 27: 'Zirkon mungil yang berkilau di telinga.', 28: 'Merah klasik, serbaguna dari gunung ke panggung.', 29: 'Tas sejuta umat yang awet dan lega.',
  30: 'Spike piramida untuk jiwa punk sejati.', 31: 'Rantai celana dengan kilau kristal.', 32: 'Kait kunci kokoh dan minimalis.', 33: 'Kulit asli lokal, makin tua makin cantik.', 34: 'Hangat, mewah, dan abadi sepanjang masa.',
  35: 'Kupluk hangat dengan label biru khas kami.', 36: 'Slogan toko di punggungmu, muat segalanya.', 37: 'Oversize longgar dengan nuansa washed yang kasual.', 38: 'Boots tangguh untuk gaya punk dan grunge.'
};
const FEAT = [11, 24, 3, 26, 25, 15, 6, 19];
const expand = s => s.split(',').flatMap(x => {
  const m = x.match(/^(\d+)-(\d+)$/); if (!m) return [x.trim()];
  const r = []; for (let i = +m[1]; i <= +m[2]; i++) r.push(String(i)); return r;
});
function seed() {
  if (!LS.get('products')) {
    LS.set('cats', Object.values(CK));
    LS.set('products', RAW.split('\n').map((l, i) => {
      const [name, c, brand, price, sz, desc] = l.split('|');
      return { id: i + 1, name, cat: CK[c], brand, price: +price, sizes: expand(sz), desc, stock: (i * 7) % 20 + 2, feat: FEAT.includes(i + 1), bio: BIO[i + 1] };
    }));
  } else { // data lama di browser: tambahkan produk baru dan bio yang belum ada
    const ps = LS.get('products', []), have = new Set(ps.map(p => p.id));
    RAW.split('\n').forEach((l, i) => { if (i + 1 > 34 && !have.has(i + 1)) { const [name, c, brand, price, sz, desc] = l.split('|'); ps.push({ id: i + 1, name, cat: CK[c], brand, price: +price, sizes: expand(sz), desc, stock: (i * 7) % 20 + 2, feat: false, bio: BIO[i + 1] }) } });
    ps.forEach(p => { if (!p.bio) p.bio = BIO[p.id] || '' }); LS.set('products', ps);
  }
  if (!LS.get('users')) LS.set('users', [{ id: 1, name: 'Admin INCESTICIDE', email: 'admin@incesticide.com', phone: '081234567890', pass: 'admin123', role: 'admin' }]);
}
seed();

/* ---------- Helper data ---------- */
const P = () => LS.get('products', []);
const U = () => LS.get('users', []);
const O = () => LS.get('orders', []);
const cur = () => U().find(u => u.id === LS.get('session'));
const cartKey = () => 'cart_' + (cur()?.id ?? 0);
const cart = () => LS.get(cartKey(), []);
const toast = m => { const t = $('#toast'); t.textContent = m; t.classList.add('show'); clearTimeout(toast.t); toast.t = setTimeout(() => t.classList.remove('show'), 2600) };
const go = p => { location.hash = '#/' + p };
const IMG = Array.from({ length: 38 }, (_, i) => i + 1);
const tile = (p, big) => p.img ? `<div class="tile ${big ? 'big' : ''}" style="background:#fff"><img src="${esc(p.img)}" alt="${esc(p.name)}" loading="lazy"></div>` : IMG.includes(p.id) ? `<div class="tile ${big ? 'big' : ''}" style="background:#fff"><img src="img/${p.id}.jpg" alt="${esc(p.name)}" loading="lazy"></div>` : `<div class="tile ${big ? 'big' : ''}" style="background:linear-gradient(135deg,hsl(${p.id * 47 % 360} 35% 22%),#0e0e10)">${EM[p.cat] || '🛍️'}</div>`;
const card = p => `<a class="card" href="#/produk/${p.id}">${tile(p)}<div class="in"><span class="brand">${esc(p.brand)}</span><strong>${esc(p.name)}</strong><span class="bio">${esc(p.bio || p.desc)}</span><span class="price">${rp(p.price)}${p.stock <= 0 ? '<span class="tag">Habis</span>' : ''}</span></div></a>`;

/* ---------- Layout ---------- */
function nav() {
  const u = cur(), n = u ? cart().reduce((a, i) => a + i.qty, 0) : 0;
  return `<nav><a class="logo" href="#/">INCESTICIDE</a>
  <form onsubmit="return srch(event)"><input id="q" type="search" placeholder="Cari produk..." aria-label="Cari produk" value="${esc(S.q)}"></form>
  <div class="links"><a href="#/katalog">Katalog</a><a href="#/kontak">Kontak</a>
  ${u ? (u.role === 'admin' ? '<a href="#/admin">Admin</a>' : '<a href="#/pesanan">Pesanan saya</a>') : ''}
  ${u?.role !== 'admin' ? `<a class="cartlink" href="#/keranjang" aria-label="Keranjang, ${n} barang">${CART_ICON}<span>Keranjang</span><b>${n}</b></a>` : ''}
  ${u ? `<a href="#/" onclick="logout()">Keluar (${esc(u.name.split(' ')[0])})</a>` : '<a href="#/login">Masuk</a><a href="#/daftar">Daftar</a>'}</div></nav>`;
}
const CART_ICON = '<svg class="ico" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="9" cy="20" r="1.6"/><circle cx="18" cy="20" r="1.6"/><path d="M2 3h3l2.6 12.4a1 1 0 0 0 1 .8h9.2a1 1 0 0 0 1-.8L21 7H6"/></svg>';
const FOOT = '<footer>© 2026 INCESTICIDE. Toko online pakaian, aksesoris, dan sepatu. Proyek UTS Pemrograman Web Dasar.</footer>';
function srch(e) { e.preventDefault(); S.q = $('#q').value.trim(); S.cat = ''; S.page = 0; location.hash === '#/katalog' ? route() : go('katalog'); return false }
function logout() { LS.set('session', null); toast('Anda sudah keluar.'); route() }

/* ---------- Halaman ---------- */
const V = {};
V.home = () => {
  const cats = LS.get('cats', []);
  return `<section class="hero"><div class="hero-t"><h1>Hancurkan<br>gaya biasa.</h1><p>Pakaian, aksesoris, dan sepatu pilihan. Lihat harga, ukuran, dan stok langsung dari HP atau laptop, kapan saja.</p><a class="btn" href="#/katalog">Belanja sekarang</a></div><img class="hero-img" src="img/hero-band.jpg" alt="Empat orang duduk bersebelahan di lantai kuning dengan outfit dan sepatu yang berbeda-beda"></section>
  <figure class="gaya"><img src="img/beranda-gaya.jpg" alt="Kolase outfit: casual, formal, grunge, punk, indie, dan timeless"><figcaption><b>6 gaya, 1 toko.</b> Casual, Formal, Grunge, Punk, Indie, dan Timeless.</figcaption></figure>
  <h2>Kategori</h2><div class="cats">${cats.map(c => `<a class="cat" href="#/katalog" onclick="S.cat='${esc(c)}';S.q='';S.page=0"><span>${EM[c] || '🛍️'}</span>${esc(c)}</a>`).join('')}</div>
  <h2>Produk unggulan</h2><div class="grid">${P().filter(p => p.feat).map(card).join('')}</div>`;
};
const perPage = () => innerWidth >= 1000 ? 4 : innerWidth >= 700 ? 3 : innerWidth >= 480 ? 2 : 1;
V.katalog = () => {
  const cats = LS.get('cats', []), q = S.q.toLowerCase();
  let l = P().filter(p => (!S.cat || p.cat === S.cat) && (!q || (p.name + ' ' + p.brand + ' ' + p.desc + ' ' + (p.bio || '')).toLowerCase().includes(q)));
  if (S.sort === 'asc') l.sort((a, b) => a.price - b.price); if (S.sort === 'desc') l.sort((a, b) => b.price - a.price);
  const n = perPage(), pages = []; for (let i = 0; i < l.length; i += n) pages.push(l.slice(i, i + n));
  S.page = Math.min(S.page || 0, Math.max(pages.length - 1, 0));
  return `<section class="kat-bio"><h2>Katalog produk</h2><p><b>INCESTICIDE</b> lahir dari tongkrongan yang bosan dengan gaya seragam. Kami kurasi pakaian, aksesoris, dan sepatu dari casual sampai punk, dari indie sampai timeless, supaya kamu bebas jadi diri sendiri. Geser slide untuk menjelajah koleksi.</p></section>
  <div class="bar">
  <button class="chip ${!S.cat ? 'on' : ''}" onclick="S.cat='';S.page=0;route()">Semua</button>
  ${cats.map(c => `<button class="chip ${S.cat === c ? 'on' : ''}" onclick="S.cat='${esc(c)}';S.page=0;route()">${esc(c)}</button>`).join('')}
  <select aria-label="Urutkan" onchange="S.sort=this.value;S.page=0;route()"><option value="">Urutkan</option><option value="asc" ${S.sort === 'asc' ? 'selected' : ''}>Harga termurah</option><option value="desc" ${S.sort === 'desc' ? 'selected' : ''}>Harga termahal</option></select></div>
  ${S.q ? `<p>Hasil untuk "<b>${esc(S.q)}</b>": ${l.length} produk. <a href="#/katalog" onclick="S.q='';S.page=0">Hapus pencarian</a></p>` : ''}
  ${l.length ? `<div class="slider" id="slider" tabindex="0" aria-roledescription="carousel" aria-label="Katalog produk">
    <button class="arrow prev" onclick="slideBy(-1)" aria-label="Slide sebelumnya">&#8249;</button>
    <div class="viewport"><div class="track" id="track" style="transform:translateX(-${S.page * 100}%)">${pages.map((pg, i) => `<div class="slide" style="--n:${n}" aria-hidden="${i !== S.page}">${pg.map(card).join('')}</div>`).join('')}</div></div>
    <button class="arrow next" onclick="slideBy(1)" aria-label="Slide berikutnya">&#8250;</button></div>
  <div class="dots" id="dots" data-pages="${pages.length}"><span class="count" id="count">Slide ${S.page + 1} dari ${pages.length}</span>${pages.map((_, i) => `<button class="dot ${i === S.page ? 'on' : ''}" onclick="slideTo(${i})" aria-label="Ke slide ${i + 1}"></button>`).join('')}</div>` : '<div class="empty">Produk tidak ditemukan. Coba kata kunci atau kategori lain.</div>'}`;
};
function slideTo(i) {
  const d = $('#dots'); if (!d) return; const max = +d.dataset.pages - 1; S.page = Math.max(0, Math.min(i, max));
  $('#track').style.transform = `translateX(-${S.page * 100}%)`;
  document.querySelectorAll('#track .slide').forEach((el, k) => el.setAttribute('aria-hidden', k !== S.page));
  document.querySelectorAll('#dots .dot').forEach((el, k) => el.classList.toggle('on', k === S.page));
  $('#count').textContent = `Slide ${S.page + 1} dari ${max + 1}`;
}
const slideBy = d => slideTo((S.page || 0) + d);
function initSlider() {
  const sl = $('#slider'); if (!sl) return; let x0 = null;
  sl.addEventListener('keydown', e => { if (e.key === 'ArrowLeft') slideBy(-1); if (e.key === 'ArrowRight') slideBy(1) });
  sl.addEventListener('touchstart', e => { x0 = e.touches[0].clientX }, { passive: true });
  sl.addEventListener('touchend', e => { if (x0 === null) return; const dx = e.changedTouches[0].clientX - x0; if (Math.abs(dx) > 50) slideBy(dx < 0 ? 1 : -1); x0 = null });
}
let rz; addEventListener('resize', () => { clearTimeout(rz); rz = setTimeout(() => { if (location.hash.startsWith('#/katalog') && perPage() !== (+($('.slide')?.style.getPropertyValue('--n')) || perPage())) { S.page = 0; route() } }, 200) });
V.produk = id => {
  const p = P().find(x => x.id == id); if (!p) return '<div class="empty">Produk tidak ditemukan.</div>';
  return `<p><a href="#/katalog">Kembali ke katalog</a></p><div class="two">${tile(p, 1)}<div>
  <span class="brand">${esc(p.brand)} / ${esc(p.cat)}</span><h2>${esc(p.name)}</h2><h3>${rp(p.price)}</h3><p>${esc(p.desc)}</p>
  <p>Stok: <b style="color:${p.stock > 0 ? 'var(--ok)' : 'var(--bad)'}">${p.stock > 0 ? p.stock + ' tersedia' : 'Habis'}</b></p>
  <b>Ukuran</b><div class="sizes">${p.sizes.map((s, i) => `<input type="radio" name="sz" id="s${i}" value="${esc(s)}" ${i === 0 ? 'checked' : ''}><label for="s${i}">${esc(s)}</label>`).join('')}</div>
  <b>Jumlah</b><div style="max-width:100px;margin:6px 0 16px"><input id="qty" type="number" min="1" max="${p.stock}" value="1"></div>
  <button class="btn" ${p.stock <= 0 ? 'disabled' : ''} onclick="addCart(${p.id})">Tambah ke keranjang</button></div></div>`;
};
function addCart(id) {
  const u = cur(); if (!u) { toast('Masuk dulu untuk mulai belanja.'); return go('login') }
  if (u.role === 'admin') return toast('Akun admin tidak bisa berbelanja.');
  const p = P().find(x => x.id == id), size = document.querySelector('input[name=sz]:checked')?.value, qty = parseInt($('#qty').value);
  if (!size) return toast('Pilih ukuran terlebih dahulu.');
  if (!qty || qty < 1) return toast('Jumlah minimal 1.');
  const c = cart(), it = c.find(i => i.pid === id && i.size === size), have = it ? it.qty : 0;
  if (have + qty > p.stock) return toast('Jumlah melebihi stok (' + p.stock + ').');
  it ? it.qty += qty : c.push({ pid: id, size, qty });
  LS.set(cartKey(), c); toast('Ditambahkan ke keranjang.'); route();
}
const total = c => c.reduce((a, i) => a + i.qty * (P().find(p => p.id === i.pid)?.price || 0), 0);
V.keranjang = () => {
  const c = cart(); if (!c.length) return '<h2>Keranjang</h2><div class="empty">Keranjang masih kosong. <a href="#/katalog">Lihat katalog</a></div>';
  return `<h2>Keranjang</h2><div class="wrap"><table><tr><th>Produk</th><th>Ukuran</th><th>Harga</th><th>Jumlah</th><th>Subtotal</th><th></th></tr>
  ${c.map((i, x) => { const p = P().find(p => p.id === i.pid); return `<tr><td>${esc(p.name)}</td><td>${esc(i.size)}</td><td>${rp(p.price)}</td>
  <td><span class="qty"><button aria-label="Kurangi" onclick="chg(${x},-1)">-</button>${i.qty}<button aria-label="Tambah" onclick="chg(${x},1)">+</button></span></td>
  <td>${rp(p.price * i.qty)}</td><td><button class="btn sm bad" onclick="del(${x})">Hapus</button></td></tr>` }).join('')}
  <tr><td colspan="4"><b>Total</b></td><td colspan="2"><b>${rp(total(c))}</b></td></tr></table></div><p><a class="btn" href="#/checkout">Lanjut ke checkout</a></p>`;
};
function chg(x, d) {
  const c = cart(), i = c[x], p = P().find(p => p.id === i.pid);
  if (i.qty + d < 1) return del(x);
  if (i.qty + d > p.stock) return toast('Stok hanya ' + p.stock + '.');
  i.qty += d; LS.set(cartKey(), c); route();
}
function del(x) { const c = cart(); c.splice(x, 1); LS.set(cartKey(), c); route() }

/* ---------- Auth ---------- */
const field = (id, label, type = 'text', val = '') => `<label for="${id}">${label}</label><input id="${id}" type="${type}" value="${esc(val)}"><div class="err" id="e_${id}"></div>`;
const setErr = (id, m) => { $('#e_' + id).textContent = m || ''; return !m };
V.daftar = () => `<div class="box form"><h2>Daftar akun</h2><form onsubmit="return reg(event)" novalidate>${field('n', 'Nama lengkap')}${field('em', 'Email', 'email')}${field('hp', 'Nomor HP', 'tel')}${field('pw', 'Kata sandi (min. 6 karakter)', 'password')}<button class="btn">Daftar</button></form><p>Sudah punya akun? <a href="#/login">Masuk</a></p></div>`;
function reg(e) {
  e.preventDefault(); const n = $('#n').value.trim(), em = $('#em').value.trim().toLowerCase(), hp = $('#hp').value.trim(), pw = $('#pw').value;
  const ok = [setErr('n', n.length < 3 ? 'Nama minimal 3 karakter.' : ''),
  setErr('em', !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(em) ? 'Format email tidak valid.' : U().some(u => u.email === em) ? 'Email sudah terdaftar.' : ''),
  setErr('hp', !PHONE.test(hp) ? 'Nomor HP harus diawali 08 (contoh: 081234567890).' : ''),
  setErr('pw', pw.length < 6 ? 'Kata sandi minimal 6 karakter.' : '')].every(Boolean);
  if (!ok) { toast('Periksa kolom yang diberi tanda merah.'); return false }
  const us = U(); us.push({ id: Date.now(), name: n, email: em, phone: hp, pass: pw, role: 'pelanggan' }); LS.set('users', us);
  const id = us[us.length - 1].id; LS.set('session', id); toast('Akun berhasil dibuat. Selamat datang, ' + n + '.'); go(''); route(); return false;
}
V.login = () => `<div class="box form"><h2>Masuk</h2><form onsubmit="return login(event)" novalidate>${field('em', 'Email', 'email')}${field('pw', 'Kata sandi', 'password')}<button class="btn">Masuk</button></form>
<p>Belum punya akun? <a href="#/daftar">Daftar</a></p><p class="brand">Demo admin: admin@incesticide.com / admin123</p></div>`;
function login(e) {
  e.preventDefault(); const em = $('#em').value.trim().toLowerCase(), pw = $('#pw').value;
  const a = setErr('em', !em ? 'Email wajib diisi.' : ''), b = setErr('pw', !pw ? 'Kata sandi wajib diisi.' : ''); if (!a || !b) { toast('Isi email dan kata sandi.'); return false }
  const u = U().find(u => u.email === em && u.pass === pw);
  if (!u) { setErr('pw', 'Email atau kata sandi salah.'); toast('Email atau kata sandi salah.'); return false }
  LS.set('session', u.id); toast('Selamat datang, ' + u.name + '.'); go(u.role === 'admin' ? 'admin' : ''); return false;
}

/* ---------- Checkout, pesanan ---------- */
const payInfo = m => m === 'QRIS'
  ? `<div class="pay"><b>Scan QRIS</b><img src="img/qris.png" alt="QRIS INCESTICIDE" onerror="this.outerHTML='<div class=qrfake>Taruh gambar QRIS di img/qris.png</div>'"><p>Scan dengan e-wallet atau m-banking, lalu bayar sesuai total pesanan.</p></div>`
  : `<div class="pay"><b>Transfer ke salah satu rekening:</b>${BANK.map(b => `<p>${b.bank}: <b>${b.no}</b><br>a.n. ${b.an}</p>`).join('')}<p>Cantumkan nomor pesanan pada berita transfer.</p></div>`;
const setPay = m => { $('#payinfo').innerHTML = payInfo(m) };
const payTxt = o => `${esc(o.pay || '-')}<br><span class="brand">${o.proof ? 'Bukti transaksi terkirim' : o.paid ? 'Sudah dibayar' : 'Belum dibayar'}</span>`;
const readImg = (file, max = 900) => new Promise((ok, no) => {
  if (!file) return no('Pilih file terlebih dahulu.');
  if (!/^image\//.test(file.type)) return no('File harus berupa gambar (JPG atau PNG).');
  if (file.size > 8 * 1024 * 1024) return no('Ukuran file maksimal 8 MB.');
  const r = new FileReader(); r.onerror = () => no('File gagal dibaca.');
  r.onload = () => { const im = new Image(); im.onerror = () => no('File gambar tidak valid.');
    im.onload = () => { const k = Math.min(1, max / Math.max(im.width, im.height)), c = document.createElement('canvas'); c.width = Math.round(im.width * k); c.height = Math.round(im.height * k);
      const g = c.getContext('2d'); g.fillStyle = '#fff'; g.fillRect(0, 0, c.width, c.height); g.drawImage(im, 0, 0, c.width, c.height); ok(c.toDataURL('image/jpeg', .75)) };
    im.src = r.result }; r.readAsDataURL(file);
});
async function sendProof(id) {
  const f = $('#pf_' + id)?.files[0];
  try { const d = await readImg(f); const os = O(), o = os.find(o => o.id === id); o.proof = d; o.paid = true; o.proofDate = new Date().toLocaleString('id-ID'); LS.set('orders', os); toast('Bukti transaksi terkirim. Menunggu verifikasi admin.'); route() }
  catch (m) { toast(typeof m === 'string' ? m : 'Bukti gagal diunggah (penyimpanan penuh?).') }
}
const prevProof = id => { const f = $('#pf_' + id)?.files[0], b = $('#pv_' + id); if (!b) return; b.textContent = f ? f.name : '' };
function showProof(id) {
  const o = O().find(o => o.id === id); if (!o?.proof) return;
  const m = document.createElement('div'); m.className = 'modal'; m.onclick = () => m.remove();
  m.innerHTML = `<div class="mbox" onclick="event.stopPropagation()"><b>Bukti transaksi ${esc(o.id)}</b><br><span class="brand">Dikirim: ${esc(o.proofDate || '-')}</span><img src="${o.proof}" alt="Bukti transaksi ${esc(o.id)}"><br><button class="btn sm" onclick="this.closest('.modal').remove()">Tutup</button></div>`;
  document.body.appendChild(m);
}
const proofThumb = o => o.proof ? `<br><a href="#/${location.hash.slice(2)}" class="proof" onclick="showProof('${o.id}');return false"><img src="${o.proof}" alt="Bukti transaksi"><span>Lihat bukti</span></a>` : '';
const proofForm = o => `<div class="upl"><label for="pf_${o.id}"><b>${o.proof ? 'Ganti bukti transaksi' : 'Bukti transaksi'}</b></label><input type="file" id="pf_${o.id}" accept="image/*" onchange="prevProof('${o.id}')"><span class="brand" id="pv_${o.id}"></span><button class="btn sm" onclick="sendProof('${o.id}')">Kirim bukti</button></div>`;
V.checkout = () => {
  const c = cart(), u = cur(); if (!c.length) return '<div class="empty">Keranjang kosong. <a href="#/katalog">Lihat katalog</a></div>';
  return `<h2>Checkout</h2><div class="two"><div class="box"><form onsubmit="return order(event)" novalidate>${field('rn', 'Nama penerima', 'text', u.name)}${field('rh', 'Nomor HP', 'tel', u.phone)}
  <label for="ra">Alamat lengkap</label><textarea id="ra" rows="3"></textarea><div class="err" id="e_ra"></div>${field('rk', 'Kota')}${field('rp', 'Kode pos')}
  <b>Metode pembayaran</b><div class="sizes"><input type="radio" name="pay" id="pq" value="QRIS" checked onchange="setPay(this.value)"><label for="pq">QRIS</label><input type="radio" name="pay" id="pt" value="Transfer Bank" onchange="setPay(this.value)"><label for="pt">Transfer rekening</label></div><button class="btn">Buat pesanan</button></form></div>
  <div class="box"><h3>Ringkasan pesanan</h3>${c.map(i => { const p = P().find(p => p.id === i.pid); return `<p>${esc(p.name)} (${esc(i.size)}) x${i.qty}<br><b>${rp(p.price * i.qty)}</b></p>` }).join('')}<h3>Total: ${rp(total(c))}</h3><div id="payinfo">${payInfo('QRIS')}</div></div></div>`;
};
function order(e) {
  e.preventDefault(); const v = id => $('#' + id).value.trim(), c = cart(), ps = P();
  const ok = [setErr('rn', v('rn').length < 3 ? 'Nama penerima minimal 3 karakter.' : ''), setErr('rh', !PHONE.test(v('rh')) ? 'Nomor HP tidak valid.' : ''),
  setErr('ra', v('ra').length < 10 ? 'Alamat minimal 10 karakter.' : ''), setErr('rk', !v('rk') ? 'Kota wajib diisi.' : ''), setErr('rp', !/^\d{5}$/.test(v('rp')) ? 'Kode pos harus 5 digit.' : '')].every(Boolean);
  if (!ok) return false;
  for (const i of c) { const p = ps.find(p => p.id === i.pid); if (p.stock < i.qty) { toast('Stok ' + p.name + ' tidak cukup.'); return false } }
  const items = c.map(i => { const p = ps.find(p => p.id === i.pid); p.stock -= i.qty; return { pid: p.id, name: p.name, size: i.size, qty: i.qty, price: p.price } });
  const os = O(); os.push({ id: 'INC' + Date.now().toString().slice(-8), uid: cur().id, name: v('rn'), phone: v('rh'), addr: `${v('ra')}, ${v('rk')} ${v('rp')}`, items, total: total(c), pay: document.querySelector('input[name=pay]:checked').value, paid: false, status: 'Menunggu', date: new Date().toLocaleString('id-ID') });
  LS.set('orders', os); LS.set('products', ps); LS.set(cartKey(), []); toast('Pesanan dibuat. Silakan lakukan pembayaran.'); go('pesanan'); return false;
}
const itemsTxt = o => o.items.map(i => `${esc(i.name)} (${esc(i.size)}) x${i.qty}`).join('<br>');
V.pesanan = () => {
  const l = O().filter(o => o.uid === cur().id).reverse();
  return `<h2>Riwayat pesanan</h2>${l.length ? `<div class="wrap"><table><tr><th>No. pesanan</th><th>Tanggal</th><th>Barang</th><th>Total</th><th>Pembayaran</th><th>Status</th><th></th></tr>
  ${l.map(o => { const open = o.status === 'Menunggu'; return `<tr><td>${o.id}</td><td>${o.date}</td><td>${itemsTxt(o)}</td><td>${rp(o.total)}</td><td>${payTxt(o)}${proofThumb(o)}${open && !o.paid ? `<details><summary>Cara bayar</summary>${payInfo(o.pay)}</details>` : ''}</td><td><span class="st ${o.status}">${o.status}</span></td>
  <td>${open ? `${proofForm(o)}<button class="btn sm bad" onclick="cancel('${o.id}')">Batalkan</button>` : ''}</td></tr>` }).join('')}</table></div>` : '<div class="empty">Belum ada pesanan. <a href="#/katalog">Mulai belanja</a></div>'}`;
};
function setStatus(id, st) {
  const os = O(), o = os.find(o => o.id === id);
  if (st === 'Dibatalkan') { const ps = P(); o.items.forEach(i => { const p = ps.find(p => p.id === i.pid); if (p) p.stock += i.qty }); LS.set('products', ps) }
  o.status = st; LS.set('orders', os);
}
function cancel(id) { if (!confirm('Batalkan pesanan ini?')) return; setStatus(id, 'Dibatalkan'); toast('Pesanan dibatalkan, stok dikembalikan.'); route() }

/* ---------- Kontak ---------- */
V.kontak = () => `<h2>Kontak</h2><div class="two"><div class="box"><h3>Informasi toko</h3><p>INCESTICIDE<br>Sidoarjo, Jawa Timur<br>Email: halo@incesticide.com<br>Pesanan online dapat dibuat 24 jam.</p></div>
<div class="box"><form onsubmit="return kirim(event)" novalidate>${field('kn', 'Nama')}${field('ke', 'Email', 'email')}<label for="kp">Pesan</label><textarea id="kp" rows="4"></textarea><div class="err" id="e_kp"></div><button class="btn">Kirim pesan</button></form></div></div>`;
function kirim(e) {
  e.preventDefault(); const n = $('#kn').value.trim(), em = $('#ke').value.trim(), m = $('#kp').value.trim();
  const ok = [setErr('kn', !n ? 'Nama wajib diisi.' : ''), setErr('ke', !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(em) ? 'Format email tidak valid.' : ''), setErr('kp', m.length < 10 ? 'Pesan minimal 10 karakter.' : '')].every(Boolean);
  if (!ok) return false; const ms = LS.get('msgs', []); ms.push({ n, em, m, date: new Date().toLocaleString('id-ID') }); LS.set('msgs', ms);
  toast('Pesan terkirim. Terima kasih!'); route(); return false;
}

/* ---------- Admin ---------- */
const subnav = a => `<div class="sub">${[['admin', 'Dashboard'], ['admin-produk', 'Kelola produk'], ['admin-pesanan', 'Kelola pesanan']].map(([h, t]) => `<a class="btn ${a === h ? '' : 'alt'} sm" href="#/${h}">${t}</a>`).join('')}</div>`;
V.admin = () => {
  const os = O(), ok = os.filter(o => o.status !== 'Dibatalkan'), low = P().filter(p => p.stock <= 5), ms = LS.get('msgs', []);
  return `<h2>Dashboard admin</h2>${subnav('admin')}<div class="stats">
  <div class="stat"><b>${os.length}</b>Total pesanan</div><div class="stat"><b>${rp(ok.reduce((a, o) => a + o.total, 0))}</b>Total penjualan</div>
  <div class="stat"><b>${os.filter(o => o.status === 'Menunggu').length}</b>Menunggu diproses</div><div class="stat"><b>${P().length}</b>Jumlah produk</div></div>
  <h3>Stok menipis (5 atau kurang)</h3>${low.length ? `<div class="wrap"><table><tr><th>Produk</th><th>Stok</th></tr>${low.map(p => `<tr><td>${esc(p.name)}</td><td>${p.stock}</td></tr>`).join('')}</table></div>` : '<p>Semua stok aman.</p>'}
  <h3 style="margin-top:24px">Pesan masuk</h3>${ms.length ? `<div class="wrap"><table><tr><th>Tanggal</th><th>Pengirim</th><th>Pesan</th></tr>${ms.slice(-5).reverse().map(m => `<tr><td>${m.date}</td><td>${esc(m.n)}<br>${esc(m.em)}</td><td>${esc(m.m)}</td></tr>`).join('')}</table></div>` : '<p>Belum ada pesan.</p>'}`;
};
V['admin-produk'] = () => {
  const cats = LS.get('cats', []), ps = P();
  return `<h2>Kelola produk dan kategori</h2>${subnav('admin-produk')}
  <div class="box"><h3>Kategori</h3><div class="bar">${cats.map(c => `<span class="chip">${esc(c)} <a href="#/admin-produk" onclick="delCat('${esc(c)}')" aria-label="Hapus kategori ${esc(c)}">x</a></span>`).join('')}
  <input id="nc" placeholder="Kategori baru" style="width:180px"><button class="btn sm" onclick="addCat()">Tambah</button></div></div>
  <div class="box"><h3 id="ft">Tambah produk</h3><form onsubmit="return saveP(event)" novalidate><input type="hidden" id="pid">
  <div class="two"><div>${field('pn', 'Nama produk')}${field('pb', 'Merek')}<label for="pc">Kategori</label><select id="pc">${cats.map(c => `<option>${esc(c)}</option>`).join('')}</select></div>
  <div>${field('pr', 'Harga (Rp)', 'number')}${field('ps', 'Stok', 'number')}${field('pz', 'Ukuran (pisahkan dengan koma)')}</div></div>
  ${field('pbio', 'Bio singkat (tampil di katalog)')}<label for="pd">Deskripsi</label><textarea id="pd" rows="2"></textarea>
  <label for="pimg">Foto produk</label><input type="file" id="pimg" accept="image/*" onchange="prevImg()"><div class="err" id="e_pimg"></div><div id="pprev"></div><br><button class="btn">Simpan produk</button> <button type="button" class="btn alt" onclick="route()">Batal</button></form></div>
  <div class="wrap"><table><tr><th>Produk</th><th>Kategori</th><th>Harga</th><th>Stok</th><th></th></tr>
  ${ps.map(p => `<tr><td>${esc(p.name)}<br><span class="brand">${esc(p.brand)}</span></td><td>${esc(p.cat)}</td><td>${rp(p.price)}</td><td>${p.stock}</td>
  <td><button class="btn sm alt" onclick="editP(${p.id})">Ubah</button> <button class="btn sm bad" onclick="delP(${p.id})">Hapus</button></td></tr>`).join('')}</table></div>`;
};
function addCat() { const v = $('#nc').value.trim(), c = LS.get('cats', []); if (!v) return toast('Nama kategori wajib diisi.'); if (c.some(x => x.toLowerCase() === v.toLowerCase())) return toast('Kategori sudah ada.'); c.push(v); LS.set('cats', c); route() }
function delCat(c) { if (P().some(p => p.cat === c)) { toast('Kategori masih dipakai produk.'); return } LS.set('cats', LS.get('cats', []).filter(x => x !== c)); route() }
function editP(id) {
  const p = P().find(p => p.id === id);
  $('#ft').textContent = 'Ubah produk'; $('#pid').value = id; $('#pn').value = p.name; $('#pb').value = p.brand; $('#pc').value = p.cat; $('#pr').value = p.price; $('#ps').value = p.stock; $('#pz').value = p.sizes.join(','); $('#pd').value = p.desc; $('#pbio').value = p.bio || '';
  $('#pprev').innerHTML = `<span class="brand">Foto saat ini (kosongkan pilihan file jika tidak diganti):</span><br><img class="pimg" src="${p.img || (IMG.includes(p.id) ? 'img/' + p.id + '.jpg' : '')}" alt="">`;
  $('#pn').scrollIntoView({ behavior: 'smooth', block: 'center' });
}
async function prevImg() {
  const f = $('#pimg').files[0]; if (!f) { $('#pprev').innerHTML = ''; return }
  try { const d = await readImg(f, 800); $('#pprev').innerHTML = `<img class="pimg" src="${d}" alt="Pratinjau foto">`; setErr('pimg', '') } catch (m) { $('#pimg').value = ''; setErr('pimg', m) }
}
async function saveP(e) {
  e.preventDefault(); const v = id => $('#' + id).value.trim(), sizes = v('pz').split(',').map(s => s.trim()).filter(Boolean);
  const ok = [setErr('pn', v('pn').length < 3 ? 'Nama minimal 3 karakter.' : ''), setErr('pb', !v('pb') ? 'Merek wajib diisi.' : ''), setErr('pr', !(+v('pr') > 0) ? 'Harga harus lebih dari 0.' : ''),
  setErr('ps', !(v('ps') !== '' && +v('ps') >= 0 && Number.isInteger(+v('ps'))) ? 'Stok harus angka bulat 0 atau lebih.' : ''), setErr('pz', !sizes.length ? 'Isi minimal satu ukuran.' : '')].every(Boolean);
  if (!ok) return false;
  const ps = P(), d = { name: v('pn'), brand: v('pb'), cat: v('pc'), price: +v('pr'), stock: +v('ps'), sizes, desc: v('pd'), bio: v('pbio') || v('pd').slice(0, 70) };
  const f = $('#pimg').files[0]; if (f) { try { d.img = await readImg(f, 800) } catch (m) { setErr('pimg', m); return false } }
  if (v('pid')) Object.assign(ps.find(p => p.id == v('pid')), d); else ps.push({ id: Date.now(), feat: false, ...d });
  LS.set('products', ps); toast('Produk disimpan.'); route(); return false;
}
function delP(id) { if (!confirm('Hapus produk ini?')) return; LS.set('products', P().filter(p => p.id !== id)); toast('Produk dihapus.'); route() }
V['admin-pesanan'] = () => {
  const l = O().slice().reverse();
  return `<h2>Kelola pesanan</h2>${subnav('admin-pesanan')}${l.length ? `<div class="wrap"><table><tr><th>No. pesanan</th><th>Penerima</th><th>Barang</th><th>Total</th><th>Pembayaran</th><th>Status</th></tr>
  ${l.map(o => { const fin = o.status === 'Dibatalkan' || o.status === 'Selesai'; return `<tr><td>${o.id}<br><span class="brand">${o.date}</span></td><td>${esc(o.name)}<br>${esc(o.phone)}<br><span class="brand">${esc(o.addr)}</span></td><td>${itemsTxt(o)}</td><td>${rp(o.total)}</td><td>${payTxt(o)}${proofThumb(o)}</td>
  <td>${fin ? `<span class="st ${o.status}">${o.status}</span>` : `<select aria-label="Status pesanan ${o.id}" onchange="setStatus('${o.id}',this.value);toast('Status diperbarui.');route()">${STATUS.map(s => `<option ${s === o.status ? 'selected' : ''}>${s}</option>`).join('')}</select>`}</td></tr>` }).join('')}</table></div>` : '<div class="empty">Belum ada pesanan masuk.</div>'}`;
};

/* ---------- Router ---------- */
function route() {
  const h = location.hash.slice(2).split('/'), p = h[0] || 'home', u = cur();
  if (['keranjang', 'checkout', 'pesanan'].includes(p) && (!u || u.role === 'admin')) { toast('Masuk sebagai pelanggan untuk membuka halaman ini.'); return go('login') }
  if (p.startsWith('admin') && u?.role !== 'admin') { toast('Halaman ini khusus admin.'); return go('login') }
  const f = V[p] || V.home;
  $('#app').innerHTML = nav() + '<main>' + f(h[1]) + '</main>' + FOOT; scrollTo(0, 0); initSlider();
}
addEventListener('hashchange', route); route();
