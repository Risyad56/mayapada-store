let keranjang = JSON.parse(localStorage.getItem("keranjang")) || [];

/* SIMPAN KE STORAGE */
function simpanKeranjang() {
  localStorage.setItem("keranjang", JSON.stringify(keranjang));
}

/* NOTIFIKASI */
function notif(teks) {
  let n = document.getElementById("notif");
  n.innerText = teks;
  n.style.display = "block";

  setTimeout(() => {
    n.style.display = "none";
  }, 1500);
}

/* TAMBAH KE KERANJANG */
function tambahKeranjang(nama, harga) {
  let item = keranjang.find(i => i.nama === nama);

  if (item) {
    item.qty += 1;
  } else {
    keranjang.push({ nama, harga, qty: 1 });
  }

  simpanKeranjang();
  tampilKeranjang();
  notif("Produk ditambahkan!");
}

/* TAMPILKAN */
function tampilKeranjang() {
  let list = document.getElementById("list-keranjang");
  list.innerHTML = "";

  let total = 0;

  keranjang.forEach((item, index) => {
    let subtotal = item.harga * item.qty;
    total += subtotal;

    let li = document.createElement("li");
    li.innerHTML = `
      <strong>${item.nama}</strong><br>
      Rp${item.harga} x ${item.qty}<br>
      <button onclick="tambahQty(${index})">➕</button>
      <button onclick="kurangQty(${index})">➖</button>
      <button onclick="hapusItem(${index})">❌</button>
    `;
    list.appendChild(li);
  });

  document.getElementById("total").innerText = total;
}

/* QTY */
function tambahQty(i) {
  keranjang[i].qty++;
  simpanKeranjang();
  tampilKeranjang();
}

function kurangQty(i) {
  if (keranjang[i].qty > 1) {
    keranjang[i].qty--;
  } else {
    keranjang.splice(i, 1);
  }
  simpanKeranjang();
  tampilKeranjang();
}

function hapusItem(i) {
  keranjang.splice(i, 1);
  simpanKeranjang();
  tampilKeranjang();
}

/* POPUP CART */
function bukaCart() {
  document.getElementById("cart").style.right = "0";
}

function tutupCart() {
  document.getElementById("cart").style.right = "-400px";
}

/* CHECKOUT */
function checkout() {
  let nama = document.getElementById("nama").value;
  let alamat = document.getElementById("alamat").value;

  if (keranjang.length === 0) {
    alert("Keranjang kosong!");
    return;
  }

  let detail = keranjang.map(item =>
    `${item.nama} - ${item.qty} pcs`
  ).join("%0A");

  let total = keranjang.reduce((s, i) => s + i.harga * i.qty, 0);

  let pesan = `Halo, saya ingin membeli:%0A
${detail}%0A
Total: Rp${total}%0A
Nama: ${nama}%0AAlamat: ${alamat}`;

  window.open(`https://wa.me/6281267798478?text=${pesan}`, "_blank");
}

/* LOAD AWAL */
tampilKeranjang();