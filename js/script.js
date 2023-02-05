let productData=products
const form=document.querySelector('form')
const companies=document.querySelector('.companies')
const filterProducts=document.querySelector('.filter-product')
const search=document.querySelector('.search')
const sideItem=document.querySelector(".cart-items")
const numItem=document.querySelector(".cart-count")
let basket = JSON.parse(localStorage.getItem("data")) || [];  
const checkout= document.querySelector(".total")


// const price=document.querySelector('#price')

function displayProducts(){
    if(productData.length<1){
filterProducts.innerHTML=`the product is not available`
    }
    else{
        filterProducts.innerHTML=productData.map(product=>{
const{title,image,price,id}=product
return `           <div class="product" data-id="${id}">
                <div class="add">
<img src=${image} alt="">
<span class="addbtn" >add to cart</span>
</div>
<h3 class="product-name">${title}</h3>
<p class="price">${price}</p>
</div>
`;
        }).join('')
    }
}



displayProducts()
const addBtn=document.querySelectorAll(".addbtn")

addBtn.forEach((btn) => {
  
    btn.addEventListener("click", addSide);
  
});
form.addEventListener('keyup',()=>{
const value=search.value
productData=products.filter( product=> product.title.toLowerCase().includes(value))

displayProducts()

})
function addSide(e){
const id = e.target.parentElement.parentElement.dataset.id;
let search = productData.find((x) => x.id === id);
  const inCart=basket.find(item=>item.id==search.id)

if(!inCart){
const item = ` 
 <div class="cart-item" data-id="${search.id}">
  
<img src="${search.image}" alt="">
    <div class="content">
        <p class="order-name">${search.title}</p>
        <p class="order-price">$${search.price}</p>
        <p class="remove">remove</p>

    </div>
<div class="icon">
    <i class="fas fa-chevron-up"></i>
    <p class="order-num">1</p>
    <i class="fas fa-chevron-down"></i>
</div>
  </div>`;
  sideItem.insertAdjacentHTML("afterbegin",item)
//   e.target.innerText="in cart"
//   e.target.disable=true
}
  increment(search.id)
cartCount()
totalCart()
  localStorage.setItem("data", JSON.stringify(basket));
numCart(cartContainerid(search.id));
}
function displayCompany(){
    const buttonData=['all',...new Set(products.map( product=>product.company ))]
    companies.innerHTML=buttonData.map(btn=>{
        return`<button class="btn-company "data-id=${btn}>${btn}</button>
        `
    }).join('')
}
displayCompany()
companies.addEventListener('click',(e)=>{
    const element=e.target

if(element.classList.contains('btn-company')){
    const type=element.dataset.id;
if(type==='all'){
    productData=products
displayProducts()
}else{
    productData=products.filter(product=> product.company==type
    )
    displayProducts()
}    
search.value=''
}
})
function itemsCounter(){
    numItem=cartBasket.map(num)
}

function increment(id) {
  let search = basket.find((x) => x.id === id);
  const newItem = productData.find((x) => x.id === id);

  if (search === undefined) {
    basket.push({
    ...newItem,
    item:1
    });
  } else {
    search.item += 1;
  }

}
let decrement = (id) => {

  let search = basket.find((x) => x.id === id);
   search.item -= 1;
  
  if (search.item === 0) {
basket = basket.filter((x) => x.item !== 0);
  generateSide() 
}  
  localStorage.setItem("data", JSON.stringify(basket));
};

const generateSide= function(){
sideItem.innerHTML=""
basket.map(search => {
 const item=` 
 <div class="cart-item" data-id="${search.id}">
  
<img src="${search.image}" alt="">
    <div class="content">
        <p class="order-name">${search.title}</p>
        <p class="order-price">$${search.price}</p>
        <p class="remove">remove</p>

    </div>
<div class="icon">
    <i class="fas fa-chevron-up"></i>
    <p class="order-num">${search.item}</p>
    <i class="fas fa-chevron-down"></i>
</div>
  </div>`;
  sideItem.insertAdjacentHTML("afterbegin",item)
cartCount();
totalCart(); 
})

}

generateSide()
function cartCount(){
    const total =basket.map(cart=>cart.item).reduce((prev ,next)=>{
        return prev+ next
    },0)
    numItem.innerHTML=total
}

function totalCart(){
    const total =basket.map(cart=>+cart.price*+cart.item).reduce((prev ,next)=>{
        return prev+ next
    },0)
   
    checkout.innerHTML=`Total $${total.toFixed(2)}`

}

const order_num=document.querySelectorAll(".order-num")
const incBtn = document.querySelectorAll(".fa-chevron-up");
const decBtn = document.querySelectorAll(".fa-chevron-down");
function cartContainerid(id){
const cartContainer = sideItem.querySelector(`[data-id="${id}"]`); 
console.log(cartContainer);
return cartContainer
}
incBtn.forEach(btn=>{
    btn.addEventListener("click",(e)=>{

const id = e.target.parentElement.parentElement.dataset.id;
increment(id)
numCart(cartContainerid(id));
totalCart()
})
})
decBtn.forEach(btn => {
  btn.addEventListener("click", (e) => {
    const id = e.target.parentElement.parentElement.dataset.id;
    
    decrement(id);
  numCart(cartContainerid(id));

    
    totalCart();
  });
});
function numCart(ele){
if(!ele)return
   
const num=ele.querySelector(".order-num")

//    const id = e.target.parentElement.parentElement.dataset.id;
   const search = basket.find((item) => item.id == ele.dataset.id);
   

// const num = e.target.closest(".icon").querySelector(".order-num");

num.innerHTML=search.item
}
const removebtn =document.querySelectorAll(".remove")
removebtn.forEach(btn=>{
    btn.addEventListener("click",removeItem)
})
function removeItem(e){
    const id = e.target.parentElement.parentElement.dataset.id;
    console.log(id);
    basket=basket.filter(item=>item.id!==id)
    localStorage.setItem("data", JSON.stringify(basket));
    generateSide()
cartCount();
totalCart();     
}

