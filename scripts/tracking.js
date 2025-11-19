import { getProduct , loadFetch } from '../data/products.js';
import { deliveryOption } from '../data/delivery-options.js';
import dayjs from 'https://cdn.jsdelivr.net/npm/dayjs@1.11.18/+esm';
import { fetchHandler } from './fetchHandler/fetchHandler.js';

fetchHandler(renderTrackingHtml, tryAgainBtn)
function getMatchingItem() {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('productId');
    const matchingItem = getProduct(productId);
    return matchingItem;
};

function arrivingDate(cartItem) {
 const today = dayjs();
 const delivery = today.add(cartItem.deliveryOptionsid, 'days');
 const deliveryDate = delivery.format('dddd, MMMM D');   
    return deliveryDate;
};

function renderTrackingHtml() {
  const matchingItem = getMatchingItem();
  console.log(matchingItem);
  const orders = JSON.parse(localStorage.getItem('allOrders')) || [];
  const find = orders.find(items => {
    let find = items.cart.find(cartItem => { return cartItem.productid === matchingItem.id});
    return find;
  });
  const findCart = find.cart.find(cartItem => { return cartItem.productid === matchingItem.id});
  const deliveryDate = arrivingDate(findCart);
  console.log(deliveryDate);
  
  const trackingHtml = `
      <div class="order-tracking">
            <a class="back-to-orders-link link-primary" href="orders.html">
            View all orders
            </a>

            <div class="delivery-date">
            Arriving on ${deliveryDate}
            </div>

            <div class="product-info">
                ${matchingItem.name}
            </div>

            <div class="product-info">
            Quantity: ${findCart.quantity}
            </div>

            <img class="product-image" src="${matchingItem.image}">

            <div class="progress-labels-container">
            <div class="progress-label">
                Preparing
            </div>
            <div class="progress-label current-status">
                Shipped
            </div>
            <div class="progress-label">
                Delivered
            </div>
            </div>

            <div class="progress-bar-container">
            <div class="progress-bar"></div>
            </div>
      </div>
    `; 
  
 document.querySelector('.js-tracking-main').innerHTML = trackingHtml;
};

function tryAgainBtn() {
 const selector = document.querySelector('.main');
 selector.innerHTML = `
    <div class="page-title">Something wrong try again</div>
    <button class="buy-again-button button-primary js-try-btn">
        <img class="buy-again-icon" src="images/icons/buy-again.png">
        <span class="buy-again-message">Try again</span>
    </button>
  `;
 const tryBtnEvent = document.querySelector('.js-try-btn')
 tryBtnEvent.addEventListener('click',()=>{
  window.location.href = 'tracking.html'
 });

};





