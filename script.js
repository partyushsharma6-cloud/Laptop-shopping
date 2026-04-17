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

  if (error) {
    console.error("Supabase error:", error);
    return;
  }

  console.log("DATA:", data); // 🔍 DEBUG

  products = data;
  renderProducts();
}

// 🖥️ Render
function renderProducts() {
  const container = document.getElementById("products");
  if (!container) return;

  container.innerHTML = products.map(p => `
    <div class="card">
      <img src="${p.image}">
      <div class="card-content">
        <h3>${p.name}</h3>
        <p class="price">$${p.price}</p>
        <button onclick="addToCart(${p.id})">Add to Cart</button>
      </div>
    </div>
  `).join("");
}

// 🛒 Cart
function addToCart(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let item = cart.find(i => i.id === id);

  if (item) item.qty++;
  else cart.push({ id, qty: 1 });

  localStorage.setItem("cart", JSON.stringify(cart));
  showToast("Added to cart");
}

// 🔔 Toast
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
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2000);
}

// 🚀 INIT
loadProducts();
