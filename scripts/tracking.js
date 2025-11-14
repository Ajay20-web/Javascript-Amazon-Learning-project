import { getProduct , loadFetch } from '../data/products.js';
import { deliveryOption } from '../data/delivery-options.js';
import dayjs from 'https://cdn.jsdelivr.net/npm/dayjs@1.11.18/+esm';


async function loadFetchInTracking() {
   
    await loadFetch();
    renderTrackingHtml();
    
};
loadFetchInTracking();

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





