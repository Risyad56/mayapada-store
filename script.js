function formatRupiah(angka){
  return new Intl.NumberFormat("id-ID").format(angka);
}

let produk = [
  {nama:"Kaos HMTG",harga:50000,kategori:"baju",img:"images.jpg"},
  {nama:"Totebag",harga:75000,kategori:"tas",img:"images.jpg"},
  {nama:"Sticker",harga:20000,kategori:"aksesoris",img:"images.jpg"}
];

let keranjang = JSON.parse(localStorage.getItem("keranjang")) || [];

function simpan(){
  localStorage.setItem("keranjang",JSON.stringify(keranjang));
}

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
  let i=keranjang.find(x=>x.nama==n);
  if(i)i.qty++; else keranjang.push({nama:n,harga:h,qty:1});
  simpan(); tampilCart(); notif();
}

function tampilCart(){
  let l=document.getElementById("list-keranjang");
  l.innerHTML="";
  let total=0;

  keranjang.forEach((i,x)=>{
    let sub=i.harga*i.qty;
    total+=sub;
    l.innerHTML+=`
      <li>
        ${i.nama}<br>
        ${i.qty} x Rp${formatRupiah(i.harga)}<br>
        Subtotal: Rp${formatRupiah(sub)}<br>
        <button onclick="hapus(${x})">x</button>
      </li>`;
  });

  document.getElementById("total").innerText=formatRupiah(total);
  document.getElementById("cart-count").innerText=
    keranjang.reduce((s,i)=>s+i.qty,0);
}

function hapus(i){
  keranjang.splice(i,1);
  simpan(); tampilCart();
}

function bukaCart(){document.getElementById("cart").style.right="0";}
function tutupCart(){document.getElementById("cart").style.right="-400px";}

function notif(){
  let n=document.getElementById("notif");
  n.style.display="block";
  setTimeout(()=>n.style.display="none",1000);
}

function checkout(){
  let nama=document.getElementById("nama").value;
  let alamat=document.getElementById("alamat").value;

  if(!nama||!alamat) return alert("Isi data dulu!");

  let text=keranjang.map(i=>`${i.nama} ${i.qty}pcs`).join("%0A");
  let total=keranjang.reduce((s,i)=>s+i.harga*i.qty,0);

  window.open(`https://wa.me/6281267798478?text=Order:%0A${text}%0ATotal:Rp${formatRupiah(total)}%0ANama:${nama}%0AAlamat:${alamat}`);
}

tampilProduk(produk);
tampilCart();