/* FORMAT RUPIAH */
function formatRupiah(angka) {
  return angka.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

/* DATA PRODUK */
let produk = [
  {nama:"Kaos HMTG",harga:50000,kategori:"baju",img:"images.jpg"},
  {nama:"Totebag",harga:75000,kategori:"tas",img:"images.jpg"},
  {nama:"Sticker",harga:20000,kategori:"aksesoris",img:"images.jpg"}
];

/* KERANJANG */
let keranjang = JSON.parse(localStorage.getItem("keranjang")) || [];

/* SIMPAN */
function simpan(){
  localStorage.setItem("keranjang", JSON.stringify(keranjang));
}

/* UPDATE JUMLAH CART */
function updateCartCount(){
  let total = keranjang.reduce((sum, item) => sum + item.qty, 0);
  document.getElementById("cart-count").innerText = total;
}

/* TAMPIL PRODUK */
function tampilProduk(list){
  let container = document.getElementById("produk-list");
  container.innerHTML = "";

  list.forEach(p=>{
    container.innerHTML += `
      <div class="produk-card">
        <img src="${p.img}">
        <h3>${p.nama}</h3>
        <p class="harga">Rp${formatRupiah(p.harga)}</p>
        <button onclick="tambahKeranjang('${p.nama}',${p.harga})">+ Keranjang</button>
      </div>
    `;
  });
}

/* SEARCH */
function cariProduk(){
  let keyword = document.getElementById("search").value.toLowerCase();
  let hasil = produk.filter(p => p.nama.toLowerCase().includes(keyword));
  tampilProduk(hasil);
}

/* FILTER */
function filterKategori(kat){
  if(kat === "all") tampilProduk(produk);
  else tampilProduk(produk.filter(p => p.kategori === kat));
}

/* TAMBAH KE CART */
function tambahKeranjang(nama, harga){
  let item = keranjang.find(i => i.nama === nama);

  if(item){
    item.qty++;
  } else {
    keranjang.push({nama, harga, qty:1});
  }

  simpan();
  tampilCart();
  notif();
}

/* TAMPIL CART */
function tampilCart(){
  let list = document.getElementById("list-keranjang");
  list.innerHTML = "";

  let total = 0;

  keranjang.forEach((item, index)=>{
    let subtotal = item.harga * item.qty;
    total += subtotal;

    list.innerHTML += `
      <li>
        <strong>${item.nama}</strong><br>
        ${item.qty} x Rp${formatRupiah(item.harga)}<br>
        Subtotal: Rp${formatRupiah(subtotal)}<br>
        <button onclick="tambahQty(${index})">➕</button>
        <button onclick="kurangQty(${index})">➖</button>
        <button onclick="hapus(${index})">❌</button>
      </li>
    `;
  });

  document.getElementById("total").innerText = formatRupiah(total);
  updateCartCount();
}

/* QTY */
function tambahQty(i){
  keranjang[i].qty++;
  simpan();
  tampilCart();
}

function kurangQty(i){
  if(keranjang[i].qty > 1){
    keranjang[i].qty--;
  } else {
    keranjang.splice(i,1);
  }
  simpan();
  tampilCart();
}

/* HAPUS */
function hapus(i){
  keranjang.splice(i,1);
  simpan();
  tampilCart();
}

/* POPUP CART */
function bukaCart(){
  document.getElementById("cart").style.right = "0";
}
function tutupCart(){
  document.getElementById("cart").style.right = "-400px";
}

/* NOTIF */
function notif(){
  let n = document.getElementById("notif");
  n.style.display = "block";
  setTimeout(()=> n.style.display="none", 1000);
}

/* CHECKOUT */
function checkout(){
  let nama = document.getElementById("nama").value;
  let alamat = document.getElementById("alamat").value;

  if(keranjang.length === 0){
    alert("Keranjang kosong!");
    return;
  }

  if(!nama || !alamat){
    alert("Isi nama dan alamat dulu!");
    return;
  }

  let text = keranjang.map(i =>
    `${i.nama} - ${i.qty} pcs = Rp${formatRupiah(i.harga * i.qty)}`
  ).join("%0A");

  let total = keranjang.reduce((s,i)=> s + i.harga*i.qty, 0);

  let pesan = `Halo, saya ingin membeli:%0A
${text}%0A
----------------%0A
Total: Rp${formatRupiah(total)}%0A
Nama: ${nama}%0AAlamat: ${alamat}`;

  window.open(`https://wa.me/6281267798478?text=${pesan}`, "_blank");
}

/* INIT */
tampilProduk(produk);
tampilCart();
updateCartCount();