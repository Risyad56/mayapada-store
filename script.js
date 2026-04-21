let keranjang = [];

/* TAMBAH KE KERANJANG */
function tambahKeranjang(nama, harga) {
  let item = keranjang.find(i => i.nama === nama);

  if (item) {
    item.qty += 1;
  } else {
    keranjang.push({ nama, harga, qty: 1 });
  }

  tampilKeranjang();
}

/* TAMPILKAN KERANJANG */
function tampilKeranjang() {
  let list = document.getElementById("list-keranjang");
  list.innerHTML = "";

  let total = 0;

  keranjang.forEach((item, index) => {
    let subtotal = item.harga * item.qty;
    total += subtotal;

    let li = document.createElement("li");
    li.innerHTML = `
      <strong>${item.nama}</strong>
      <br>
      Harga: Rp${item.harga}
      <br>
      Qty: ${item.qty}
      <br>
      Subtotal: Rp${subtotal}
      <br>
      <button onclick="tambahQty(${index})">➕</button>
      <button onclick="kurangQty(${index})">➖</button>
      <button onclick="hapusItem(${index})">❌ Hapus</button>
    `;
    list.appendChild(li);
  });

  document.getElementById("total").innerText = total;
}

/* TAMBAH QTY */
function tambahQty(index) {
  keranjang[index].qty += 1;
  tampilKeranjang();
}

/* KURANG QTY */
function kurangQty(index) {
  if (keranjang[index].qty > 1) {
    keranjang[index].qty -= 1;
  } else {
    keranjang.splice(index, 1);
  }
  tampilKeranjang();
}

/* HAPUS ITEM */
function hapusItem(index) {
  keranjang.splice(index, 1);
  tampilKeranjang();
}

/* CHECKOUT WHATSAPP */
function checkout() {
  let nama = document.getElementById("nama").value;
  let alamat = document.getElementById("alamat").value;

  if (keranjang.length === 0) {
    alert("Keranjang kosong!");
    return;
  }

  if (!nama || !alamat) {
    alert("Isi nama dan alamat dulu!");
    return;
  }

  let detail = keranjang.map(item =>
    `${item.nama} - Rp${item.harga} x ${item.qty} = Rp${item.harga * item.qty}`
  ).join("%0A");

  let total = keranjang.reduce((sum, item) => sum + item.harga * item.qty, 0);

  let pesan = `Halo, saya ingin membeli:%0A
${detail}%0A
--------------------%0A
Total: Rp${total}%0A
%0ANama: ${nama}%0AAlamat: ${alamat}`;

  let nomor = "6281267798478";
  let url = `https://wa.me/${nomor}?text=${pesan}`;

  window.open(url, "_blank");
}