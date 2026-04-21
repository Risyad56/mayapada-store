let keranjang = JSON.parse(localStorage.getItem("keranjang")) || [];

function simpan() {
  localStorage.setItem("keranjang", JSON.stringify(keranjang));
}

function notif() {
  let n = document.getElementById("notif");
  n.style.display = "block";
  setTimeout(()=>n.style.display="none",1000);
}

function tambahKeranjang(nama,harga){
  let item = keranjang.find(i=>i.nama===nama);

  if(item){item.qty++;}
  else{keranjang.push({nama,harga,qty:1});}

  simpan();
  tampil();
  notif();
}

function tampil(){
  let list=document.getElementById("list-keranjang");
  list.innerHTML="";
  let total=0;

  keranjang.forEach((i,index)=>{
    total+=i.harga*i.qty;

    let li=document.createElement("li");
    li.innerHTML=`
      ${i.nama}<br>
      ${i.qty} x Rp${i.harga}<br>
      <button onclick="tambahQty(${index})">+</button>
      <button onclick="kurangQty(${index})">-</button>
      <button onclick="hapus(${index})">x</button>
    `;
    list.appendChild(li);
  });

  document.getElementById("total").innerText=total;
}

function tambahQty(i){keranjang[i].qty++;simpan();tampil();}
function kurangQty(i){
  if(keranjang[i].qty>1)keranjang[i].qty--;
  else keranjang.splice(i,1);
  simpan();tampil();
}
function hapus(i){keranjang.splice(i,1);simpan();tampil();}

function bukaCart(){document.getElementById("cart").style.right="0";}
function tutupCart(){document.getElementById("cart").style.right="-400px";}

function checkout(){
  let nama=document.getElementById("nama").value;
  let alamat=document.getElementById("alamat").value;

  let text=keranjang.map(i=>`${i.nama} ${i.qty}pcs`).join("%0A");
  let total=keranjang.reduce((s,i)=>s+i.harga*i.qty,0);

  window.open(`https://wa.me/6281267798478?text=Order:%0A${text}%0ATotal:${total}%0ANama:${nama}%0AAlamat:${alamat}`);
}

tampil();