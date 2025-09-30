//This the javaScript class and class also is object one of the oop concept
class Cart {
cartItem = undefined; 
#localStorageKey = undefined; // --> This the 2020es feature of js called private property this helpful secure property out side of the class we can't change the property values in outside of the class if we give #property.

constructor(localStorageKey){ //--> the reference of constructor function name is impotent because class is pre build thing so it's working based on the prototype js not have real oop class.
this.#localStorageKey = localStorageKey;
this.#loadingFormsStorage();
};

#loadingFormsStorage() { //--> This called private method same like a private property we can't call this method outside of class.
  this.cartItem = JSON.parse(localStorage.getItem(this.#localStorageKey)) || [{
  productid:"e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
  quantity: 2,
  deliveryOptionsid:'1'
},{
  productid:"15b6fc6f-327a-4ec4-896f-486349e85a3d",
  quantity: 1,
  deliveryOptionsid:'2'
}]; 
};

saveToStorage() {
  localStorage.setItem( this.#localStorageKey ,JSON.stringify(this.cartItem));
};

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
};

showToTotal(){
 let totalCart = 0;
 this.cartItem.forEach( (toCart) =>{
 totalCart += toCart.quantity
 });
 document.querySelector('.js-cart-quantity').innerHTML = totalCart;
};

removeFromCart(productId) {
  const newCart = [];
 this.cartItem.forEach( (cartItem) => {
 if (productId !== cartItem.productid) {
    newCart.push(cartItem);
 };
 });
 this.cartItem = newCart;
 this.saveToStorage();//-->just save data using by local storage. 
};

updateDeliveryOption(productid , deliveryOptionsid) {
 let matchingItem; 

 this.cartItem.forEach( (item) =>{
 if (productid === item.productid) {
       matchingItem = item;
   };
 });

 matchingItem.deliveryOptionsid = deliveryOptionsid;
};

}//--> This the end of class object.

const cart1 = new Cart('cart-oop');
const cart2 = new Cart('cart-business');

console.log(cart1);
console.log(cart2);



