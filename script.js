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
      <div class="produk-card">
        <img src="${p.img}">
        <h3>${p.nama}</h3>
        <p class="harga">Rp ${p.harga.toLocaleString("id-ID")}</p>
        <button onclick="tambahKeranjang('${p.nama}',${p.harga})">+ Keranjang</button>
      </div>
    `;
  });
}

// FILTER
function filterProduk(kat){
  if(kat=="all"){
    tampilProduk(produk);
  }else{
    tampilProduk(produk.filter(p=>p.kategori==kat));
  }
}

// SEARCH
function cariProduk(){
  let key = document.getElementById("search").value.toLowerCase();
  tampilProduk(produk.filter(p=>p.nama.toLowerCase().includes(key)));
}

// KERANJANG
function tambahKeranjang(nama,harga){
  let item = keranjang.find(i=>i.nama===nama);
  if(item){
    item.qty++;
  }else{
    keranjang.push({nama,harga,qty:1});
  }
  updateCart();

  document.getElementById("notif").style.display="block";
  setTimeout(()=>document.getElementById("notif").style.display="none",1000);
}

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

// TOGGLE CART
function toggleCart(){
  document.getElementById("cart").classList.toggle("active");
}

// CHECKOUT WA
function checkout(){
  let nama = document.getElementById("nama").value;
  let alamat = document.getElementById("alamat").value;

  let text = keranjang.map(i=>`${i.nama} x${i.qty}`).join("%0A");
  let total = keranjang.reduce((a,b)=>a+b.harga*b.qty,0);

  let url = `https://wa.me/6281267798478?text=Order:%0A${text}%0ATotal: Rp${total}%0ANama:${nama}%0AAlamat:${alamat}`;
  window.open(url);
}

// INIT
tampilProduk(produk);