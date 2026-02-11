// KONFIGURASI API
const API_URL = "api.php";
let productsData = [];

console.log("App started...");

// ============================================
// SISWA 4: FETCH API
// ============================================
async function loadProducts() {
  try {
    const response = await fetch(API_URl);
    const data = await response.json();
    productsData = data;
    renderProducts(data); // Memanggil fungsi Siswa 5
  } catch (error) {
    console.error("Error:", error);
    document.getElementById("product-grid").innerHTML =
      '<p class="text-center col-span-3 text-red-500">❌ Gagal memuat produk. Pastikan api.php berjalan!</p>';
  }
}

// ============================================
// SISWA 5: RENDER UI
// ============================================
function renderProducts(data) {
  const grid = document.getElementById("product-grid");

  // Jika data kosong
  if (data.length === 0) {
    grid.innerHTML =
      '<p class="text-center col-span-3 text-gray-500">Tidak ada produk ditemukan.</p>';
    return;
  }

  grid.innerHTML = "";

  data.forEach((item) => {
    const harga = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(item.price);

    grid.innerHTML += `
            <div class="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition duration-300 border border-gray-100 group">
                <div class="h-48 overflow-hidden">
                    <img src="${item.image}" class="w-full h-full object-cover group-hover:scale-110 transition duration-500" alt="${item.name}">
                </div>
                <div class="p-6">
                    <div class="text-xs font-bold text-indigo-500 mb-2 uppercase">${item.category}</div>
                    <h3 class="text-lg font-bold text-gray-800 mb-2 truncate">${item.name}</h3>
                    <div class="flex justify-between items-end mt-4">
                        <span class="text-xl font-bold text-gray-900">${harga}</span>
                    </div>
                </div>
            </div>`;
  });
}

// ============================================
// SISWA 6: SEARCH FEATURE
// ============================================
const searchInput = document.getElementById("searchInput");

if (searchInput) {
  searchInput.addEventListener("keyup", (e) => {
    const keyword = e.target.value.toLowerCase();
    const filtered = productsData.filter(
      (p) =>
        p.name.toLowerCase().includes(keyword) ||
        p.category.toLowerCase().includes(keyword),
    );
    renderProducts(filtered);
  });
}

// ============================================
// INISIALISASI
// ============================================
// Panggil fungsi load saat halaman siap
loadProducts();
