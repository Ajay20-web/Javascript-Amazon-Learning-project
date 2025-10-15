import { renderPage } from "./checkout/ordersummery.js";
import { renderPaymentSummery } from "./checkout/paymentsummery.js";
import { loadProduct } from "../data/products.js";
import { loadingCartEg } from "../data/cart.js";
//import '../data/cart-oop.js';
//import '../data/cart-class.js';
//import '../data/backend-practice.js';



Promise.all([
    new Promise((resolve) => {
    console.log('start');
    
    loadProduct(()=>{
        resolve('value 1');
    })
}),

    new Promise((resolve) => {
        loadingCartEg(()=>{
            resolve('value 2');
        })
    })
]).then((value)=>{
    
    console.log(value);
    renderPage();
    renderPaymentSummery();
  
}).then((value)=>{
    console.log('all done');
})

console.log('all klk');


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



