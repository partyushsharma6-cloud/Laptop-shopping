// ✅ SAFE SUPABASE INIT (NO DUPLICATE ERROR)
if (!window.supabaseClient) {
  window.supabaseClient = window.supabase.createClient(
    "https://xopxvrmmzanowgpyvolv.supabase.co",
    "sb_publishable_iODXIxkPjoMOMXel01oFDg_5Q7IvoQP"
  );
}

const supabase = window.supabaseClient;

// ================= PRODUCTS =================
let products = [];

async function loadProducts() {
  const container = document.getElementById("products");
  if (!container) return;

  const { data, error } = await supabase
    .from("products")
    .select("*");

  if (error) {
    console.error(error);
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
          <img src="${p.image}" alt="${p.name}">
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

// ================= PRODUCT NAV =================
window.openProduct = function(id){
  localStorage.setItem("selectedProduct", id);
  window.location.href = "product.html";
};

// ================= CART =================
window.addToCart = function(id){
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  let item = cart.find(i => i.id === id);

  if(item) item.qty++;
  else cart.push({ id, qty:1 });

  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Added to cart");
};

// ================= AUTH =================

// REGISTER
window.register = async function(e){
  e.preventDefault();

  const name = document.getElementById("name")?.value;
  const email = document.getElementById("email")?.value;
  const password = document.getElementById("password")?.value;

  if (!email || !password) {
    alert("Please fill all fields");
    return;
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { name }
    }
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

  const email = document.getElementById("email")?.value;
  const password = document.getElementById("password")?.value;

  if (!email || !password) {
    alert("Enter email & password");
    return;
  }

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

// ================= INIT =================
document.addEventListener("DOMContentLoaded", () => {
  loadProducts();
});
