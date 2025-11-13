// Product data
const products = [
  { id: 1, name: "T-Shirt", price: 499, image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fmerchshop.in%2Fproduct%2Fhalf-sleeve-tshirt-plain%2F%3Fsrsltid%3DAfmBOorJdKHyKpKJhoiIBIzoMkh-dTOONTHD9fYz6hpsRp9zpjAO8jYC&psig=AOvVaw0Bu1QyeGGCUy3sgusrDSp9&ust=1763112256342000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCMDU7Y_n7pADFQAAAAAdAAAAABAE" },
  { id: 2, name: "Hoodie", price: 899, image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww2.hm.com%2Fen_in%2Fmen%2Fshop-by-product%2Fhoodies-sweatshirts.html%3Fsrsltid%3DAfmBOoqZGPNH18JzD5l7USn3lNyfcbsjoBhANRKexZUojgMT_r54vXr3&psig=AOvVaw3c-myDJCcFl37Sz2AbBaQ8&ust=1763112223092000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCLDS2v_m7pADFQAAAAAdAAAAABAE" },
  { id: 3, name: "Jeans", price: 1199, image: "https://www.google.com/imgres?q=jeans&imgurl=https%3A%2F%2Fhips.hearstapps.com%2Fvader-prod.s3.amazonaws.com%2F1736527960-untitled-3-67815035563fa.jpg%3Fcrop%3D0.774xw%3A0.830xh%3B0.111xw%2C0.0871xh%26resize%3D980%3A*&imgrefurl=https%3A%2F%2Fwww.elle.com%2Fuk%2Ffashion%2Ftrends%2Fa32337%2Fbest-denim-jeans-style-trends%2F&docid=X57t-xhafgvVNM&tbnid=k2EuBYX-fGpF8M&vet=12ahUKEwislIjn5u6QAxUvdPUHHXT7CGwQM3oECCYQAA..i&w=980&h=1471&hcb=2&ved=2ahUKEwislIjn5u6QAxUvdPUHHXT7CGwQM3oECCYQAA" },
  { id: 4, name: "Sneakers", price: 1599, image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.mochishoes.com%2Fproduct%2Fmochi-71-257-grey-casual-sneakers&psig=AOvVaw0K2nLpKSZ9lZ2u9j0mOgW1&ust=1763112287312000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCLjS46rn7pADFQAAAAAdAAAAABAK" }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];
const productList = document.getElementById("product-list");
const cartCount = document.getElementById("cartCount");
const cartPopup = document.getElementById("cartPopup");
const cartItems = document.getElementById("cartItems");
const totalPrice = document.getElementById("totalPrice");

// Show username
const userInfo = JSON.parse(localStorage.getItem("user"));
const userName = document.getElementById("userName");
if (userName && userInfo) {
  userName.textContent = `Hello, ${userInfo.username}!`;
}

// Logout
const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("loggedIn");
    alert("Logged out successfully!");
    window.location.href = "index.html";
  });
}

// Show products
if (productList) {
  products.forEach(p => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");
    productDiv.innerHTML = `
      <img src="${p.image}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p>₹${p.price}</p>
      <button onclick="addToCart(${p.id})">Add to Cart</button>
    `;
    productList.appendChild(productDiv);
  });
}

// Add to cart
function addToCart(id) {
  const product = products.find(p => p.id === id);
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  alert(`${product.name} added to cart!`);
}

// Delete from cart
function deleteFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  showCart();
  updateCartCount();
}

// Update cart count
function updateCartCount() {
  if (cartCount) cartCount.textContent = cart.length;
}

// Cart popup logic
const cartBtn = document.getElementById("cartBtn");
if (cartBtn) {
  cartBtn.addEventListener("click", () => {
    showCart();
  });
}

const closeCart = document.getElementById("closeCart");
if (closeCart) {
  closeCart.addEventListener("click", () => {
    cartPopup.style.display = "none";
  });
}

// Show cart
function showCart() {
  cartItems.innerHTML = "";
  let total = 0;
  cart.forEach((item, index) => {
    total += item.price;
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.name} - ₹${item.price}
      <button onclick="deleteFromCart(${index})">Delete</button>
    `;
    cartItems.appendChild(li);
  });
  totalPrice.textContent = total;
  cartPopup.style.display = "block";
}

updateCartCount();



