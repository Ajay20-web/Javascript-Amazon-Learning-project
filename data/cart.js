export let cart = JSON.parse(localStorage.getItem('cart')) || [{
  productid:"e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
  quantity: 2,
  deliveryOptionsid:'1'
},{
  productid:"15b6fc6f-327a-4ec4-896f-486349e85a3d",
  quantity: 5,
  deliveryOptionsid:'2'
}]; 

console.log(cart);


export function saveToStorage() {
  localStorage.setItem('cart',JSON.stringify(cart));
  
};

export function addToCart(productId,selector) {
    
      let matchingItem;  
      cart.forEach( (item) =>{
        if (productId === item.productid) {
            matchingItem = item;
        };
      });

      if (matchingItem) {
        matchingItem.quantity+=Number(selector);
      }else{
       cart.push({
        productid: productId,
        quantity: Number(selector),
        deliveryOptionsid: '1'
      });
      saveToStorage(); //--> just save data using by local storage.
      };     

};

export function showToTotal(){
 let totalCart = 0;
     cart.forEach( (toCart) =>{
      totalCart += toCart.quantity
     });

    document.querySelector('.js-cart-quantity').innerHTML = totalCart;
};
     
 

export function removeFromCart(productId) {
  const newCart = [];
 cart.forEach( (cartItem) => {
 if (productId !== cartItem.productid) {
    newCart.push(cartItem);
 };
 });
  cart = newCart;
  saveToStorage();//-->just save data using by local storage. 
};    

export function updateDeliveryOption(productid , deliveryOptionsid) {
let matchingItem; 

  cart.forEach( (item) =>{
 if (productid === item.productid) {
       matchingItem = item;
    };
  });

  matchingItem.deliveryOptionsid = deliveryOptionsid
  
}
