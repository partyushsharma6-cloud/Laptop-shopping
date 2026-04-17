// ✅ Supabase Setup
const SUPABASE_URL = "https://xopxvrmmzanowgpyvolv.supabase.co";
const SUPABASE_KEY = "sb_publishable_iODXIxkPjoMOMXel01oFDg_5Q7IvoQP";

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// 🌐 Global products
let products = [];

// 🚀 Load products
async function loadProducts() {
  const { data, error } = await supabase
    .from("products")
    .select("*");

  console.log("DATA:", data);
  console.log("ERROR:", error);

  if (error) {
    document.getElementById("products").innerHTML = "Error loading products";
    return;
  }

  if (!data || data.length === 0) {
    document.getElementById("products").innerHTML = "No products found";
    return;
  }

  products = data;
  renderProducts();
}

// 🖥️ Render products
function renderProducts() {
  const container = document.getElementById("products");
  if (!container) return;

  container.innerHTML = products.map(p => `
    <div class="card" onclick="openProduct(${p.id})" style="cursor:pointer;">
      <img src="${p.image}" alt="${p.name}">
      <div class="card-content">
        <h3>${p.name}</h3>
        <p class="price">$${p.price}</p>
        <button onclick="event.stopPropagation(); addToCart(${p.id})">
          Add to Cart
        </button>
      </div>
    </div>
  `).join("");
}

// 🔗 Open product page
function openProduct(id){
  localStorage.setItem("selectedProduct", id);
  window.location.href = "product.html";
}

// 🛒 Cart
function addToCart(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  let item = cart.find(i => i.id === id);

  if (item) {
    item.qty++;
  } else {
    cart.push({ id: id, qty: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  showToast("Added to cart");
}

// 🔔 Toast notification
function showToast(msg) {
  let toast = document.createElement("div");
  toast.innerText = msg;

  toast.style.position = "fixed";
  toast.style.bottom = "20px";
  toast.style.right = "20px";
  toast.style.background = "#111";
  toast.style.color = "#fff";
  toast.style.padding = "10px 20px";
  toast.style.borderRadius = "8px";
  toast.style.zIndex = "9999";

  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2000);
}

// 🚀 INIT
loadProducts();
