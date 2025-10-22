import { renderPage } from "./checkout/ordersummery.js";
import { renderPaymentSummery } from "./checkout/paymentsummery.js";
import {  loadFetch } from "../data/products.js";
import { loadingCartEg } from "../data/cart.js";
//import '../data/cart-oop.js';
//import '../data/cart-class.js';
//import '../data/backend-practice.js';


console.log(loadFetch());
Promise.all([loadFetch()]).then(()=>{
    renderPage();
    renderPaymentSummery();
   
});


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



