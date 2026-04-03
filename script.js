
const products=[
{id:1,name:"MacBook Pro M3",price:3200,img:"https://source.unsplash.com/400x300/?macbook"},
{id:2,name:"Dell XPS 15",price:2800,img:"https://source.unsplash.com/400x300/?laptop"},
{id:3,name:"HP Spectre x360",price:2500,img:"https://source.unsplash.com/400x300/?ultrabook"}
];

function renderProducts(){
let container=document.getElementById("products");
if(!container) return;
container.innerHTML=products.map(p=>`
<div class="card">
<img src="${p.img}">
<div class="card-content">
<h3>${p.name}</h3>
<p class="price">$${p.price}</p>
<button onclick="addToCart(${p.id})">Add to Cart</button>
</div>
</div>`).join("");
}

function addToCart(id){
let cart=JSON.parse(localStorage.getItem("cart"))||[];
let item=cart.find(i=>i.id===id);
if(item){item.qty++}else{cart.push({id,qty:1})}
localStorage.setItem("cart",JSON.stringify(cart));
showToast("Added to cart");
}

function loadCart(){
let cart=JSON.parse(localStorage.getItem("cart"))||[];
let container=document.getElementById("cart-items");
let total=0;
if(!container) return;
container.innerHTML="";
cart.forEach(c=>{
let product=products.find(p=>p.id===c.id);
total+=product.price*c.qty;
container.innerHTML+=`<div class="cart-item">${product.name} x${c.qty} <span>$${product.price*c.qty}</span></div>`;
});
document.getElementById("total").innerText="Total: $"+total;
}

function showToast(msg){
let toast=document.createElement("div");
toast.innerText=msg;
toast.style.position="fixed";
toast.style.bottom="20px";
toast.style.right="20px";
toast.style.background="#111";
toast.style.color="#fff";
toast.style.padding="10px 20px";
toast.style.borderRadius="8px";
document.body.appendChild(toast);
setTimeout(()=>toast.remove(),2000);
}

function login(e){e.preventDefault();alert("Login successful");}
function register(e){e.preventDefault();alert("Registered successfully");}

renderProducts();loadCart();

// SAME PRODUCTS AS SHOP (MUST MATCH IDs)
const products = [
{id:1,name:"MacBook Pro M3",price:3200,img:"https://source.unsplash.com/300x300/?macbook"},
{id:2,name:"Dell XPS 15",price:2800,img:"https://source.unsplash.com/300x300/?dell,laptop"},
{id:3,name:"HP Spectre x360",price:2500,img:"https://source.unsplash.com/300x300/?hp,laptop"},
{id:4,name:"ASUS ROG Zephyrus",price:2700,img:"https://source.unsplash.com/300x300/?gaming,laptop"},
{id:5,name:"Lenovo ThinkPad X1",price:2600,img:"https://source.unsplash.com/300x300/?lenovo"},
{id:6,name:"Acer Predator",price:2400,img:"https://source.unsplash.com/300x300/?predator,laptop"},
{id:7,name:"MSI Stealth",price:2900,img:"https://source.unsplash.com/300x300/?msi,laptop"},
{id:8,name:"Razer Blade",price:3100,img:"https://source.unsplash.com/300x300/?razer,laptop"},
{id:9,name:"Samsung Book 3",price:2300,img:"https://source.unsplash.com/300x300/?samsung,laptop"},
{id:10,name:"Surface Laptop",price:2200,img:"https://source.unsplash.com/300x300/?surface,laptop"}
];

// LOAD FEATURED (ONLY FIRST 4 OR 6)
function loadFeatured(){
  const container = document.getElementById("products");

  // show only latest 6
  const featured = products.slice(0,6);

  container.innerHTML = `
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:25px;">
      ${featured.map(p => `
        <div class="product-card">
          <img src="${p.img}">
          <h3>${p.name}</h3>
          <p>$${p.price}</p>
          <button onclick="addToCart(${p.id})">Add to Cart</button>
        </div>
      `).join("")}
    </div>
  `;
}



function addToCart(id){
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  let existing = cart.find(item => item.id == id);

  if(existing){
    existing.qty += 1;
  } else {
    cart.push({id:id, qty:1});
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  showToast();
}