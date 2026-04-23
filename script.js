let produk = [
  {nama:"Kaos HMTG", harga:50000, kategori:"baju", img:"images.jpg"},
  {nama:"Tas HMTG", harga:75000, kategori:"tas", img:"images.jpg"},
  {nama:"Stiker HMTG", harga:10000, kategori:"aksesoris", img:"images.jpg"}
];

let keranjang = [];

// TAMPIL PRODUK
function tampilProduk(list){
  let container = document.getElementById("produk-list");
  container.innerHTML = "";

  list.forEach(p=>{
    container.innerHTML += `
      <div class="produk-card" onclick="bukaModal('${p.nama}',${p.harga},'${p.img}')">
        <div class="badge">NEW</div>
        <img src="${p.img}">
        <h3>${p.nama}</h3>
        <p class="harga">Rp ${p.harga.toLocaleString("id-ID")}</p>
      </div>
    `;
  });
}

// FILTER
function filterProduk(kat){
  if(kat==="all") tampilProduk(produk);
  else tampilProduk(produk.filter(p=>p.kategori===kat));
}

// SEARCH
function cariProduk(){
  let key = document.getElementById("search").value.toLowerCase();
  tampilProduk(produk.filter(p=>p.nama.toLowerCase().includes(key)));
}

// MODAL
function bukaModal(nama,harga,img){
  document.getElementById("modal").classList.add("active");
  document.getElementById("modal-img").src = img;
  document.getElementById("modal-nama").innerText = nama;
  document.getElementById("modal-harga").innerText =
    "Rp " + harga.toLocaleString("id-ID");

  document.getElementById("modal-btn").onclick = function(){
    tambahKeranjang(nama,harga);
  };
}

function tutupModal(){
  document.getElementById("modal").classList.remove("active");
}

// KERANJANG
function tambahKeranjang(nama,harga){
  let item = keranjang.find(i=>i.nama===nama);
  if(item) item.qty++;
  else keranjang.push({nama,harga,qty:1});
  updateCart();
}

// UPDATE CART
function updateCart(){
  let list = document.getElementById("list-keranjang");
  list.innerHTML="";
  let total=0;

  keranjang.forEach((item,i)=>{
    let subtotal=item.harga*item.qty;
    total+=subtotal;

    list.innerHTML+=`
      <li>
        ${item.nama} (${item.qty}) - Rp ${subtotal.toLocaleString("id-ID")}
        <button onclick="hapusItem(${i})">❌</button>
      </li>
    `;
  });

  document.getElementById("total").innerText = total.toLocaleString("id-ID");
  document.getElementById("count").innerText = keranjang.length;
}

function hapusItem(i){
  keranjang.splice(i,1);
  updateCart();
}

// CART
function toggleCart(){
  document.getElementById("cart").classList.toggle("active");
}
function tutupCart(){
  document.getElementById("cart").classList.remove("active");
}

// CHECKOUT
function checkout(){
  let nama = document.getElementById("nama").value;
  let alamat = document.getElementById("alamat").value;

  let text = keranjang.map(i=>`${i.nama} x${i.qty}`).join("%0A");
  let total = keranjang.reduce((a,b)=>a+b.harga*b.qty,0);

  let url = `https://wa.me/6281267798478?text=Order:%0A${text}%0ATotal: Rp${total}%0ANama:${nama}%0AAlamat:${alamat}`;
  window.open(url);
}

let produk = [
  {
    nama:"Kaos HMTG",
    harga:50000,
    diskon:70000,
    rating:4.5,
    kategori:"baju",
    img:["images.jpg","images.jpg"]
  },
  {
    nama:"Tas HMTG",
    harga:75000,
    diskon:null,
    rating:4.2,
    kategori:"tas",
    img:["images.jpg"]
  },
  {
    nama:"Stiker HMTG",
    harga:10000,
    diskon:15000,
    rating:4.8,
    kategori:"aksesoris",
    img:["images.jpg"]
  }
];

let keranjang=[];

// PRODUK
function tampilProduk(list){
  let el=document.getElementById("produk-list");
  el.innerHTML="";

  list.forEach(p=>{
    el.innerHTML+=`
      <div class="produk-card" onclick='bukaModal(${JSON.stringify(p)})'>
        <img src="${p.img[0]}">
        <h3>${p.nama}</h3>
        <div class="rating">⭐ ${p.rating}</div>
        <p class="harga">Rp ${p.harga.toLocaleString("id-ID")}</p>
        ${p.diskon?`<p class="harga-coret">Rp ${p.diskon.toLocaleString("id-ID")}</p>`:""}
      </div>
    `;
  });
}

// MODAL
function bukaModal(p){
  let m=document.getElementById("modal");
  m.classList.add("active");

  document.getElementById("modal-img").src=p.img[0];
  document.getElementById("modal-nama").innerText=p.nama;
  document.getElementById("modal-rating").innerText="⭐ "+p.rating;

  document.getElementById("modal-harga").innerHTML=
    "Rp "+p.harga.toLocaleString("id-ID")+
    (p.diskon?` <span style="text-decoration:line-through;color:red">Rp ${p.diskon.toLocaleString("id-ID")}</span>`:"");

  // thumbs
  let thumbs=document.getElementById("thumbs");
  thumbs.innerHTML="";
  p.img.forEach(i=>{
    thumbs.innerHTML+=`<img src="${i}" onclick="gantiGambar('${i}')">`;
  });

  document.getElementById("modal-btn").onclick=()=>tambahKeranjang(p.nama,p.harga);
}

function gantiGambar(src){
  document.getElementById("modal-img").src=src;
}

function tutupModal(){
  document.getElementById("modal").classList.remove("active");
}

// FILTER
function filterProduk(k){
  if(k==="all") tampilProduk(produk);
  else tampilProduk(produk.filter(p=>p.kategori===k));
}

// SEARCH
function cariProduk(){
  let k=document.getElementById("search").value.toLowerCase();
  tampilProduk(produk.filter(p=>p.nama.toLowerCase().includes(k)));
}

// CART
function tambahKeranjang(nama,harga){
  let i=keranjang.find(x=>x.nama===nama);
  if(i)i.qty++; else keranjang.push({nama,harga,qty:1});
  updateCart();
}

function updateCart(){
  let list=document.getElementById("list-keranjang");
  list.innerHTML="";
  let total=0;

  keranjang.forEach((i,x)=>{
    let sub=i.harga*i.qty;
    total+=sub;
    list.innerHTML+=`<li>${i.nama} x${i.qty} - Rp ${sub.toLocaleString("id-ID")}
    <button onclick="hapusItem(${x})">❌</button></li>`;
  });

  document.getElementById("total").innerText=total.toLocaleString("id-ID");
  document.getElementById("count").innerText=keranjang.length;
}

function hapusItem(i){
  keranjang.splice(i,1);
  updateCart();
}

function toggleCart(){
  document.getElementById("cart").classList.toggle("active");
}

function tutupCart(){
  document.getElementById("cart").classList.remove("active");
}

// CHECKOUT
function checkout(){
  let nama=document.getElementById("nama").value;
  let alamat=document.getElementById("alamat").value;

  let text=keranjang.map(i=>`${i.nama} x${i.qty}`).join("%0A");
  let total=keranjang.reduce((a,b)=>a+b.harga*b.qty,0);

  window.open(`https://wa.me/6281267798478?text=Order:%0A${text}%0ATotal: Rp${total}%0ANama:${nama}%0AAlamat:${alamat}`);
}

// INIT
tampilProduk(produk);