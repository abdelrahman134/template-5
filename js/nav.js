const links = document.querySelector(".navlinks");
const bar = document.querySelector(".fa-bars");
const cartOverlay=document.querySelector(".cart-overlay")
const orders = document.querySelector(".orders");
const cart = document.querySelector(".cart");
const close = document.querySelector(".fa-times");

console.log(bar)
cart.addEventListener("click", () => {
  cartOverlay.classList.toggle("show");
orders.classList.toggle("show")
});

close.addEventListener("click", () => {
  cartOverlay.classList.remove("show");
  orders.classList.remove("show");
});

bar.addEventListener("click", () => {
    
   links.classList.toggle("showlink");
});
