
//this method is called factory function method and it's very use full to create multiple objects to create one function eg:another cart system.
function Create(localStorageKey) {
const cart = {
cartItem: undefined,

loadingFormsStorage() {
  this.cartItem = JSON.parse(localStorage.getItem(localStorageKey)) || [{
  productid:"e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
  quantity: 2,
  deliveryOptionsid:'1'
},{
  productid:"15b6fc6f-327a-4ec4-896f-486349e85a3d",
  quantity: 1,
  deliveryOptionsid:'2'
}]; 
},

saveToStorage() {
  localStorage.setItem( localStorageKey ,JSON.stringify(this.cartItem));
},

addToCart(productId,selector) {
    
    let matchingItem;  
    this.cartItem.forEach( (item) =>{
    if (productId === item.productid) {
        matchingItem = item;
    };
    });

    if (matchingItem) {
    matchingItem.quantity+=Number(selector) || 1;
    }else{
    this.cartItem.push({
    productid: productId,
    quantity: Number(selector) || 1,
    deliveryOptionsid: '1'
    });
    this.saveToStorage(); //--> just save data using by local storage.
    };     
    this.saveToStorage();//--> just save data using by local storage.
},

showToTotal(){
 let totalCart = 0;
 this.cartItem.forEach( (toCart) =>{
 totalCart += toCart.quantity
 });
 document.querySelector('.js-cart-quantity').innerHTML = totalCart;
},

removeFromCart(productId) {
  const newCart = [];
 this.cartItem.forEach( (cartItem) => {
 if (productId !== cartItem.productid) {
    newCart.push(cartItem);
 };
 });
 this.cartItem = newCart;
 this.saveToStorage();//-->just save data using by local storage. 
},

updateDeliveryOption(productid , deliveryOptionsid) {
 let matchingItem; 

 this.cartItem.forEach( (item) =>{
 if (productid === item.productid) {
       matchingItem = item;
   };
 });

 matchingItem.deliveryOptionsid = deliveryOptionsid;
}
};//--> the end of the main object.

return cart
};         
// The best way is try to avoid copy paste the code instate of using factory method king of styles is best in real world use.
const cart1 = Create('cart-oop');
const cart2 = Create('cart-business');

cart1.loadingFormsStorage();
cart2.loadingFormsStorage();

console.log(cart1);
console.log(cart2);





     
 

    


