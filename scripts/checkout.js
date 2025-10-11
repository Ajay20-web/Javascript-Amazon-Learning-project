import { renderPage } from "./checkout/ordersummery.js";
import { renderPaymentSummery } from "./checkout/paymentsummery.js";
import { loadProduct } from "../data/products.js";
import '../data/cart-oop.js';
import '../data/cart-class.js';
//import '../data/backend-practice.js';

loadProduct( renderPage , renderPaymentSummery)

//renderPage();
//renderPaymentSummery();
 