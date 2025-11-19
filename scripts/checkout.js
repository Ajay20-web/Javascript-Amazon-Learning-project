import { renderPage } from "./checkout/ordersummery.js";
import { renderPaymentSummery } from "./checkout/paymentsummery.js";
import {  loadFetch } from "../data/products.js";
import { fetchHandler } from './fetchHandler/fetchHandler.js';
//import '../data/cart-oop.js';
//import '../data/cart-class.js';
//import '../data/backend-practice.js';

//Using fetchHandler for loading fetch and error handling then calling the main function.
fetchHandler( () => {
    renderPage();
    renderPaymentSummery();
}, tryAgainBtn );

//-- Try again button functionality --
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
  window.location.href = 'checkout.html'
 });

};













/*
Promise.all([loadFetch()]).then(()=>{
    renderPage();
    renderPaymentSummery();
   
});*/


/*
new Promise((resolve) => {
    console.log('start');
    
    loadProduct(resolve)
}).then(()=>{
    return new Promise((resolve) => {
        loadingCartEg(resolve)
    }).then(()=>{
        console.log('cart loaded');
    });
}).then(()=>{
    renderPage();
    renderPaymentSummery();
    console.log('all done');
});  */

/*
loadProduct(()=>{
    loadingCartEg(()=>{
        renderPage();
        renderPaymentSummery(); 
    });
});*/



