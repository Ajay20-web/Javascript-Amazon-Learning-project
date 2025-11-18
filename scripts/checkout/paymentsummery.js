import { cart , afterOrderPlaced} from "../../data/cart.js"
import { getProduct } from "../../data/products.js";
import { deliveryOption } from "../../data/delivery-options.js";
import { forPrice } from '../utlity/utility.js';
import { renderPage } from "./ordersummery.js";

// Calculate payment business logic
function paymentCalculation() {
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

  return{ productPrice , deliveryPrice , totalBeforeTex , totalAndTex , totalPrice };// this method called object shorthand.
};
// Render payment summary HTML
export function renderPaymentSummery() {
  const { productPrice , deliveryPrice , totalBeforeTex , totalAndTex , totalPrice } = paymentCalculation(); //This method called object destructuring it's create local variable and assign value based on the object property name matching name.
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
    </button>
  `;

  document.querySelector('.js-payment').innerHTML = paymentSummeryHTML
  placeOrder();         
};
// post order function
function placeOrder() {
 document.querySelector('.js-place-order').addEventListener('click', async () => { 
    const response = await fetch('https://6904bf5b6b8dabde4964f6f1.mockapi.io/Ecommerce-backend/mockapi/order/orders', {
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
    let ordersPlaced = JSON.stringify(orders);
    localStorage.setItem('ordersPlaced', ordersPlaced);
    allOrders();
    console.log(orders);
    afterOrderPlaced();
    localStorage.removeItem('cart');
    renderPaymentSummery();
    renderPage();

    window.location.href = 'orders.html';
 });
};
const orders = JSON.parse(localStorage.getItem('allOrders'))||[];
// Store all orders in local storage for mocking order history
function allOrders() {
  let ordersPlaced = JSON.parse(localStorage.getItem('ordersPlaced'));
 
  if (ordersPlaced) {
    //orders.push(ordersPlaced); // --> add to the end of the array
    orders.unshift(ordersPlaced);//--> add to the beginning of the array
    localStorage.setItem('allOrders', JSON.stringify(orders));
  };
  
};

//console.log(orders);




