import { cart , removeFromCart , saveToStorage , updateDeliveryOption } from '../../data/cart.js';
import { products } from '../../data/products.js';
import { forPrice } from '../utlity/utility.js';
import { deliveryOptions } from '../../data/delivery-options.js';
import dayjs from 'https://cdn.jsdelivr.net/npm/dayjs@1.11.18/+esm';
  
export function renderPage() {

let checkoutHTML = "";
cart.forEach((cartItem)=> {
    const productId = cartItem.productid
    //console.log(productId);

    let matchingItem;
    products.forEach((productids)=> {
       const product = productids.id
       
    if (productId === product) {
        matchingItem = productids
    }
    });
      //  console.log(matchingItem);

      
      let showingDate;
      deliveryOptions.forEach( (deliveryOption) => {
      if (cartItem.deliveryOptionsid === deliveryOption.id) {
         showingDate = deliveryOption
      }
      });
      const today = dayjs();
      const delivery = today.add(showingDate.deliveryDays, 'days');
      const deliveryDate = delivery.format('dddd, MMMM D');   
    
  checkoutHTML +=`
<div class="cart-item-container js-container-${matchingItem.id}">
  <div class="delivery-date">
    Delivery date: ${ deliveryDate }
  </div>

  <div class="cart-item-details-grid">
    <img class="product-image"
      src="${matchingItem.image}">

    <div class="cart-item-details">
      <div class="product-name">
        ${matchingItem.name}
      </div>
      <div class="product-price">
        ${forPrice(matchingItem.priceCents)}
      </div>
      <div class="product-quantity">
        <span>
          Quantity: <span class="quantity-label">${cartItem.quantity}</span>
        </span>
        <span class="update-quantity-link link-primary">
          Update
        </span>
        <span class="delete-quantity-link link-primary js-delete-link" data-id="${matchingItem.id}">
          Delete
        </span>
      </div>
    </div>

    <div class="delivery-options">
      <div class="delivery-options-title">
        Choose a delivery option:
      </div>
       ${deliveryOptionsHTML(matchingItem , cartItem)}
      </div>
     </div>
</div>`  
});

function deliveryOptionsHTML(matchingItem , cartItem , showingDate ) {
   
  let html ="";
  deliveryOptions.forEach( (deliveryOption) => {
   const today = dayjs();
   const delivery = today.add(deliveryOption.deliveryDays, 'days');
   const deliveryDate = delivery.format('dddd, MMMM D');
   let priceOption = deliveryOption.priceCents === 0 ? 'FREE': deliveryOption.priceCents;
   
   let isChecked = cartItem.deliveryOptionsid === deliveryOption.id;
   html +=`
    <div class="delivery-option js-delivery-option" data-prodectid="${matchingItem.id}" data-deliveryid="${deliveryOption.id}">
          <input type="radio" class="delivery-option-input"
            name="${matchingItem.id}" ${isChecked ? 'checked' : ''} >
          <div>
            <div class="delivery-option-date">
              ${deliveryDate}
            </div>
            <div class="delivery-option-price">
              ${forPrice(priceOption)} - Shipping
            </div>
          </div>
    </div>`
  });
  return html;
  
};

document.querySelector('.order-summary').innerHTML = checkoutHTML;

const delBtn = document.querySelectorAll('.js-delete-link');
delBtn.forEach( (link) => {
  link.addEventListener('click', () => {

   const productId = link.dataset.id;

    removeFromCart(productId);  

    document.querySelector(`.js-container-${productId}`).remove();
     
  });

});

const options = document.querySelectorAll('.js-delivery-option')
options.forEach( (element) =>{
  element.addEventListener('click', () =>{
   const productid = element.dataset.prodectid
   const deliveryOptionsid = element.dataset.deliveryid
   
   updateDeliveryOption(productid , deliveryOptionsid);
   saveToStorage();
   renderPage();
  });   
});

};


