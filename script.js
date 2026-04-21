let keranjang = [];

function tambahKeranjang(nama, harga) {
  let item = keranjang.find(i => i.nama === nama);

  if (item) {
    item.qty += 1;
  } else {
    keranjang.push({ nama, harga, qty: 1 });
  }

  tampilKeranjang();
}

function tampilKeranjang() {
  let list = document.getElementById("list-keranjang");
  list.innerHTML = "";

  let total = 0;

  keranjang.forEach((item, index) => {
    total += item.harga * item.qty;

    let li = document.createElement("li");
    li.innerHTML = `
      ${item.nama} - Rp${item.harga} x ${item.qty}
      <button onclick="hapusItem(${index})">❌</button>
    `;
    list.appendChild(li);
  });

  document.getElementById("total").innerText = total;
}

function hapusItem(index) {
  keranjang.splice(index, 1);
  tampilKeranjang();
}

function checkout() {
  let nama = document.getElementById("nama").value;
  let alamat = document.getElementById("alamat").value;

  if (keranjang.length === 0) {
    alert("Keranjang kosong!");
    return;
  }

  let detail = keranjang.map(item =>
    `${item.nama} - Rp${item.harga} x ${item.qty}`
  ).join("%0A");

  let total = keranjang.reduce((sum, item) => sum + item.harga * item.qty, 0);

  let pesan = `Halo, saya ingin membeli:%0A
${detail}%0A
Total: Rp${total}%0A
Nama: ${nama}%0AAlamat: ${alamat}`;

  let nomor = "6281267798478";
  let url = `https://wa.me/${nomor}?text=${pesan}`;

  window.open(url, "_blank");
}