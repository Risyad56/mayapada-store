let produk = [
  {nama:"Kaos HMTG",harga:50000,kategori:"baju",img:"images.jpg"},
  {nama:"Totebag",harga:75000,kategori:"tas",img:"images.jpg"},
  {nama:"Sticker",harga:20000,kategori:"aksesoris",img:"images.jpg"}
];

let keranjang = JSON.parse(localStorage.getItem("keranjang")) || [];

/* TAMPIL PRODUK */
function tampilProduk(list){
  let container = document.getElementById("produk-list");
  container.innerHTML="";

  list.forEach(p=>{
    container.innerHTML += `
      <div class="produk-card">
        <img src="${p.img}">
        <h3>${p.nama}</h3>
        <p class="harga">Rp${p.harga}</p>
        <button onclick="tambahKeranjang('${p.nama}',${p.harga})">+ Keranjang</button>
      </div>
    `;
  });
}

/* SEARCH */
function cariProduk(){
  let keyword = document.getElementById("search").value.toLowerCase();
  let hasil = produk.filter(p=>p.nama.toLowerCase().includes(keyword));
  tampilProduk(hasil);
}

/* FILTER */
function filterKategori(kat){
  if(kat=="all") tampilProduk(produk);
  else tampilProduk(produk.filter(p=>p.kategori==kat));
}

/* CART */
function simpan(){
  localStorage.setItem("keranjang",JSON.stringify(keranjang));
}

function tambahKeranjang(nama,harga){
  let item = keranjang.find(i=>i.nama==nama);
  if(item) item.qty++;
  else keranjang.push({nama,harga,qty:1});

  simpan(); tampilCart(); notif();
}

function tampilCart(){
  let list=document.getElementById("list-keranjang");
  list.innerHTML="";
  let total=0;

  keranjang.forEach((i,idx)=>{
    total+=i.harga*i.qty;
    list.innerHTML += `
      <li>${i.nama} (${i.qty})
      <button onclick="hapus(${idx})">x</button></li>
    `;
  });

  document.getElementById("total").innerText=total;
}

function hapus(i){
  keranjang.splice(i,1);
  simpan(); tampilCart();
}

/* POPUP */
function bukaCart(){document.getElementById("cart").style.right="0";}
function tutupCart(){document.getElementById("cart").style.right="-400px";}

/* NOTIF */
function notif(){
  let n=document.getElementById("notif");
  n.style.display="block";
  setTimeout(()=>n.style.display="none",1000);
}

/* CHECKOUT */
function checkout(){
  let nama=document.getElementById("nama").value;
  let alamat=document.getElementById("alamat").value;

  let text=keranjang.map(i=>`${i.nama} ${i.qty}pcs`).join("%0A");
  let total=keranjang.reduce((s,i)=>s+i.harga*i.qty,0);

  window.open(`https://wa.me/6281267798478?text=Order:%0A${text}%0ATotal:${total}%0ANama:${nama}%0AAlamat:${alamat}`);
}

/* INIT */
tampilProduk(produk);
tampilCart();