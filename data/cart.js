export let cart = [];

export function addToCart(productId) {
    
      let matchingItem;  
      cart.forEach( (item) =>{
        if (productId === item.productid) {
            matchingItem = item;
        };
      });

      if (matchingItem) {
        matchingItem.quantity+=1;
      }else{
       cart.push({
        productid: productId,
        quantity: 1
      });
      };

      console.log(matchingItem);
      console.log(cart);

      let totalCart = 0;
     cart.forEach( (toCart) =>{
      totalCart += toCart.quantity
     });

     document.querySelector('.js-cart-quantity').innerHTML = totalCart;
};