function formatRupiah(angka){
  return new Intl.NumberFormat("id-ID").format(angka);
}

let produk=[
  {nama:"Kaos HMTG",harga:50000,kategori:"baju",img:"images.jpg"},
  {nama:"Totebag",harga:75000,kategori:"tas",img:"images.jpg"},
  {nama:"Sticker",harga:20000,kategori:"aksesoris",img:"images.jpg"}
];

let keranjang=[];

function tampilProduk(list){
  let c=document.getElementById("produk-list");
  c.innerHTML="";
  list.forEach(p=>{
    c.innerHTML+=`
      <div class="produk-card">
        <img src="${p.img}">
        <h3>${p.nama}</h3>
        <p class="harga">Rp${formatRupiah(p.harga)}</p>
        <button onclick="tambahKeranjang('${p.nama}',${p.harga})">+ Keranjang</button>
      </div>`;
  });
}

function cariProduk(){
  let k=document.getElementById("search").value.toLowerCase();
  tampilProduk(produk.filter(p=>p.nama.toLowerCase().includes(k)));
}

function filterKategori(k){
  if(k=="all") tampilProduk(produk);
  else tampilProduk(produk.filter(p=>p.kategori==k));
}

function tambahKeranjang(n,h){
  keranjang.push({nama:n,harga:h});
  notif();
}

function bukaCart(){
  document.getElementById("cart").style.right="0";
}
function tutupCart(){
  document.getElementById("cart").style.right="-300px";
}

function notif(){
  let n=document.getElementById("notif");
  n.style.display="block";
  setTimeout(()=>n.style.display="none",1000);
}

tampilProduk(produk);