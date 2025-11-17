import { getProduct , loadFetch } from '../data/products.js';
import { forPrice } from './utlity/utility.js'
import { addToCart } from '../data/cart.js';
import { fetchHandler } from './fetchHandler/fetchHandler.js';


//--This function is for changing the ISO backend date into a readable format--
function gettingData(itemsDate) {
  let formattedDate;

  const orderIsoDate = itemsDate.createdAt;
  const orderDate = new Date(orderIsoDate);

  const options = {
    month: 'long',
    day: '2-digit'
  };

  formattedDate = orderDate.toLocaleDateString('en-US',options);

  return formattedDate;
    
};

//--Old Method TwoPassLoop using only forEach();--
function createOrdersHtm() {
  
  let orderHTML = ``;

  const orders = JSON.parse(localStorage.getItem('allOrders')) || [];
  orders.forEach(items => {
   let orderDate = gettingData(items);
   let orderTotalCents = 0;
   let itemsHtml = ``;
    items.cart.forEach(cartItem => {
     let getId = cartItem.productid;
     let matchingItem = getProduct(getId);
      
     orderTotalCents += matchingItem.priceCents * cartItem.quantity;
          
    });

    let headerHtml = `
      <div class="order-header">
        <div class="order-header-left-section">
          <div class="order-date">
            <div class="order-header-label">Order Placed:</div>
            <div>${orderDate}</div>
          </div>
          <div class="order-total">
            <div class="order-header-label">Total:</div>
            <div>${forPrice(orderTotalCents)}</div>
          </div>
        </div>

        <div class="order-header-right-section">
          <div class="order-header-label">Order ID:</div>
          <div>${items.id}</div>
        </div>
      </div>
    `;
      
    items.cart.forEach(cartItems => {
     let getId = cartItems.productid;
     let matchingItem = getProduct(getId);
      
      itemsHtml += `
        <div class="product-image-container">
          <img src="${matchingItem.image}">
        </div>

        <div class="product-details">
          <div class="product-name">
            ${matchingItem.name}
          </div>
          <div class="product-delivery-date">
            Arriving on: June 17
          </div>
          <div class="product-quantity">
            Quantity: ${cartItems.quantity}
          </div>
          <button class="buy-again-button button-primary">
            <img class="buy-again-icon" src="images/icons/buy-again.png">
            <span class="buy-again-message">Buy it again</span>
          </button>
        </div>

        <div class="product-actions">
          <a href="tracking.html">
            <button class="track-package-button button-secondary">
              Track package
            </button>
          </a>
        </div>
      `;   

    });
    orderHTML += `
      <div class="order-container">
        ${headerHtml}
        <div class="order-details-grid">
         ${itemsHtml}
        </div>
      </div>
    `;
  });
 
  document.querySelector('.js-orders-grid').innerHTML = orderHTML;
   
};

// --Test--
function createOrdersHtmTest() {
  
  let orderHTML = ``;

  const orders = JSON.parse(localStorage.getItem('allOrders')) || [];
  orders.forEach(items => {
   let orderDate = gettingData(items);
   let orderTotalCents = 0;
   let itemsHtml = ``;
    items.cart.forEach(cartItem => {
     let getId = cartItem.productid;
     let matchingItem = getProduct(getId);
      
     orderTotalCents += matchingItem.priceCents * cartItem.quantity;
          
    });

    let headerHtml = `
      <div class="order-header">
        <div class="order-header-left-section">
          <div class="order-date">
            <div class="order-header-label">Order Placed:</div>
            <div>${orderDate}</div>
          </div>
          <div class="order-total">
            <div class="order-header-label">Total:</div>
            <div>${forPrice(orderTotalCents)}</div>
          </div>
        </div>

        <div class="order-header-right-section">
          <div class="order-header-label">Order ID:</div>
          <div>${items.id}</div>
        </div>
      </div>
    `;
      
    
    
    items.cart.forEach(cartItems => {
     let getId = cartItems.productid;
     let matchingItem = getProduct(getId);
      //console.log(matchingItem);

      itemsHtml += `
       
         
          
            <div class="product-image-container">
              <img src="${matchingItem.image}">
            </div>

            <div class="product-details">
              <div class="product-name">
                ${matchingItem.name}
              </div>
              <div class="product-delivery-date">
                Arriving on: June 17
              </div>
              <div class="product-quantity">
                Quantity: ${cartItems.quantity}
              </div>
              <button class="buy-again-button button-primary">
                <img class="buy-again-icon" src="images/icons/buy-again.png">
                <span class="buy-again-message">Buy it again</span>
              </button>
            </div>

            <div class="product-actions">
              <a href="tracking.html">
                <button class="track-package-button button-secondary">
                  Track package
                </button>
              </a>
            </div>
         
        
      `;   

      

    });
    orderHTML += `
    <div class="order-container">
    ${headerHtml}
    <div class="order-details-grid">
    ${itemsHtml}
    </div>
    </div>
    `;
  });
 
  document.querySelector('.js-orders-grid').innerHTML = orderHTML;
   
};

//-- Async function to load the fetch and  error handling--

/*
async function loadOrders() {
  try {
    let res = await loadFetch();
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    };
    createOrdersHtmNewStructure();
  } catch (error) {
    //console.log(error.message);
    const tryBtn = document.querySelector('.js-orders-grid')
    let show = error.message || 'Something wrong Try again'
    alert(show);
    tryAgainBtn(tryBtn);
    
  };
 
};
loadOrders();
*/




// --New structure building for same order page it's for understanding--

//Using fetchHandler for loading fetch and error handling then calling the main function.
fetchHandler( createOrdersHtmNewStructure , tryAgainBtn);

// helper function for the header html.
function createHeaderHtml(orders) {
  let orderDate = gettingData(orders); 
  let orderTotalCents = orders.cart.reduce((acc,cartItem)=>{
  let getId = cartItem.productid;
  let matchingItem = getProduct(getId);

  return acc += matchingItem.priceCents * cartItem.quantity; 
  },0);
   
  return `
    <div class="order-header">
      <div class="order-header-left-section">
        <div class="order-date">
          <div class="order-header-label">Order Placed:</div>
          <div>${orderDate}</div>
        </div>
        <div class="order-total">
          <div class="order-header-label">Total:</div>
          <div>${forPrice(orderTotalCents)}</div>
        </div>
      </div>

      <div class="order-header-right-section">
        <div class="order-header-label">Order ID:</div>
        <div>${orders.id}</div>
      </div>
    </div>
  `;   

};

// Using array map() method instate of the forEch() and this style hold reduce() method for calculating the total price.;
function createProductsHtml(items) {
  return items.cart.map(cartItem => {
    let getId = cartItem.productid;
    let matchingItem = getProduct(getId);
    return`
      <div class="product-image-container">
        <img src="${matchingItem.image}">
      </div>

      <div class="product-details">
        <div class="product-name">
          ${matchingItem.name}
        </div>
        <div class="product-delivery-date">
          Arriving on: June 17
        </div>
        <div class="product-quantity">
          Quantity: ${cartItem.quantity}
        </div>
        <button class="buy-again-button button-primary js-buy-again-button" data-product-id="${matchingItem.id}">
          <img class="buy-again-icon" src="images/icons/buy-again.png">
          <span class="buy-again-message">Buy it again</span>
        </button>
      </div>

      <div class="product-actions">
        <a href="tracking.html?productId=${matchingItem.id}">
          <button class="track-package-button button-secondary">
            Track package
          </button>
        </a>
      </div>
    `;
  }).join('');
  
};

// Main function for the dynamic rendering of order page.
function createOrdersHtmNewStructure() {
 let orderHTML = ``;
 const orders = JSON.parse(localStorage.getItem('allOrders')) || [];

 orders.forEach(items =>{
    
  let ordersHeaderHtml = createHeaderHtml(items);
  let ordersProductsHtml = createProductsHtml(items);

  orderHTML += `
    <div class="order-container">
      ${ordersHeaderHtml}
      <div class="order-details-grid">
        ${ordersProductsHtml}
      </div>
    </div>
  `;
  
 });
 
 const ordersHtml = document.querySelector('.js-orders-grid')
 ordersHtml.innerHTML = orderHTML;
 buyItAgainButton();
};

//-- Buy it again button functionality --
function buyItAgainButton() {
 const buyItAgainBtn = document.querySelectorAll('.js-buy-again-button');
 
  buyItAgainBtn.forEach(button => {
   const productId = button.dataset.productId; 
    
    button.addEventListener('click', () => {
     addToCart(productId);
     alert('Item added to cart!');
      console.log(productId);
     window.location.href = 'checkout.html';
    });
  });
 
};

//-- Try again button functionality --
function tryAgainBtn() {
 const selector = document.querySelector('.js-orders-grid');
 selector.innerHTML = `<button class="buy-again-button button-primary js-try-btn">
    <img class="buy-again-icon" src="images/icons/buy-again.png">
    <span class="buy-again-message">Try again</span>
    </button>
  `;
 const tryBtnEvent = document.querySelector('.js-try-btn')
 tryBtnEvent.addEventListener('click',()=>{
  window.location.href = 'orders.html'
 });

};

 