const supabase = window.supabase.createClient(
  "https://xopxvrmmzanowgpyvolv.supabase.co",
  "sb_publishable_iODXIxkPjoMOMXel01oFDg_5Q7IvoQP"
);

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// 🌐 Global products (from DB)
let products = [];

// 🚀 Load products from Supabase
async function loadProducts() {
  const { data, error } = await supabase
    .from("products")
    .select("*");

  if (error) {
    console.error("Supabase error:", error);
    return;
  }

  products = data; // store globally
  renderProducts();
}

// 🖥️ Render products
function renderProducts() {
  let container = document.getElementById("products");
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

// 🛒 Add to cart
function addToCart(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let item = cart.find(i => i.id === id);

  if (item) {
    item.qty++;
  } else {
    cart.push({ id, qty: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  showToast("Added to cart");
  loadCart(); // update UI
}

// 🧾 Load cart
function loadCart() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let container = document.getElementById("cart-items");
  let total = 0;

  if (!container) return;

  container.innerHTML = "";

  cart.forEach(c => {
    let product = products.find(p => p.id === c.id);
    if (!product) return;

    total += product.price * c.qty;

    container.innerHTML += `
      <div class="cart-item">
        ${product.name} x${c.qty}
        <span>$${product.price * c.qty}</span>
      </div>
    `;
  });

  let totalEl = document.getElementById("total");
  if (totalEl) totalEl.innerText = "Total: $" + total;
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

// 🔐 Forms
function login(e) {
  e.preventDefault();
  alert("Login successful");
}

function register(e) {
  e.preventDefault();
  alert("Registered successfully");
}

// 🚀 INIT
loadProducts();
setTimeout(loadCart, 500); // wait for products to load
