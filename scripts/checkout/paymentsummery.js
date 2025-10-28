import { cart } from "../../data/cart.js"
import { getProduct } from "../../data/products.js";
import { deliveryOption } from "../../data/delivery-options.js";
import { forPrice } from '../utlity/utility.js';


export function renderPaymentSummery() {
 let productPrice = 0;
 let deliveryPrice = 0; 
    cart.forEach( (cartItem) => {  
     const productId = cartItem.productid
     const matchingItem = getProduct(productId);
    
     productPrice += matchingItem.priceCents * cartItem.quantity
     
     const optionId = cartItem.deliveryOptionsid
     const matchingOption = deliveryOption(optionId);

     deliveryPrice += matchingOption.priceCents
    });
     
    const totalBeforeTex = productPrice + deliveryPrice
    const totalAndTex = totalBeforeTex * 0.1;
    const totalPrice = totalBeforeTex + totalAndTex;
    
    const paymentSummeryHTML = `
         <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (3):</div>
            <div class="payment-summary-money">${forPrice(productPrice)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">${forPrice(deliveryPrice)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">${forPrice(totalBeforeTex)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">${forPrice(totalAndTex)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">${forPrice(totalPrice)}</div>
          </div>

          <button class="place-order-button button-primary js-place-order">
            Place your order
          </button>`
    
       document.querySelector('.js-payment').innerHTML = paymentSummeryHTML
          document.querySelector('.js-place-order').addEventListener('click', async () => { 
           const response = await fetch('https://supersimplebackend.dev/orders', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  cart: cart 
                }),
              });
              const orders = await response.json();
              alert('Order placed successfully!');
              console.log(orders);
              window.location.href = 'amazon.html'
          });
}