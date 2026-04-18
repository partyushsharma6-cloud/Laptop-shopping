// ✅ Supabase Setup (ONLY HERE)
const SUPABASE_URL = "https://xopxvrmmzanowgpyvolv.supabase.co";
const SUPABASE_KEY = "sb_publishable_iODXIxkPjoMOMXel01oFDg_5Q7IvoQP";

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// ================= PRODUCTS =================
let products = [];

async function loadProducts() {
  const container = document.getElementById("products");
  if (!container) return;

  const { data, error } = await supabase.from("products").select("*");

  if (error) {
    container.innerHTML = "Error loading products";
    return;
  }

  if (!data || data.length === 0) {
    container.innerHTML = "No products found";
    return;
  }

  products = data;
  renderProducts();
}

function renderProducts() {
  const container = document.getElementById("products");
  if (!container) return;

  container.innerHTML = `
    <div class="grid">
      ${products.map(p => `
        <div class="card" onclick="openProduct(${p.id})">
          <img src="${p.image}">
          <h3>${p.name}</h3>
          <p class="price">$${p.price}</p>
          <button onclick="event.stopPropagation(); addToCart(${p.id})">
            Add to Cart
          </button>
        </div>
      `).join("")}
    </div>
  `;
}

function openProduct(id){
  localStorage.setItem("selectedProduct", id);
  window.location.href = "product.html";
}

// ================= CART =================
function addToCart(id){
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  let item = cart.find(i => i.id === id);

  if(item) item.qty++;
  else cart.push({ id, qty:1 });

  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Added to cart");
}

// ================= AUTH =================

// REGISTER
window.register = async function(e){
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { name } }
  });

  if(error){
    alert(error.message);
    return;
  }

  alert("Account created. Now login.");
  window.location.href = "login.html";
};

// LOGIN
window.login = async function(e){
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if(error){
    alert(error.message);
    return;
  }

  alert("Login successful");
  window.location.href = "index.html";
};

// INIT
document.addEventListener("DOMContentLoaded", loadProducts);
