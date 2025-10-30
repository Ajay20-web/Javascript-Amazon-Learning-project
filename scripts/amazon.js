import { products , loadFetch } from '../data/products.js';
import { addToCart,showToTotal } from '../data/cart.js';

//loadProduct(renderHtmlGrid); //--> we are passing the function name without () because we want to pass the reference of the function not to call it.
/* 
Promise.all([loadFetch()]).then(()=>{
    renderHtmlGrid();
});*/

//function for add to cart button add event listener.
function addToCartBtn() { 
    const addCart = document.querySelectorAll(".js-add-to-cart");
    addCart.forEach(  //--> here how we can loop the element because the queryselectorAll have the ability of creating nodeList that act like array that's the reason we can use forEach.
        (button) => { 
        button.addEventListener("click", () => {

        const productId = button.dataset.productId; 
        console.log(productId);

        const selector = document.querySelector(`.js-quantity-${productId}`).value;
        console.log(selector);

        addToCart(productId,selector);
        
        showToTotal(); //-->this just show the total quantity by using function

        });
    });

};
//function for search bar functionality but i didn't use it if someone want they can use it. 
function searchBar() {
    let filteredProducts = [];
    document.querySelector('.js-search-bar').addEventListener('input', (e) => {
        const searchString = e.target.value.toLowerCase();
        if (searchString.length === 0) {
            htmlRendering(products);
            addToCartBtn(); //--> adding the add to cart button function after rendering the html again
            return;
        };
        filteredProducts = products.filter((filterProduct) => {
         return filterProduct.name.toLowerCase().includes(searchString) || filterProduct.keywords.some((arrayKey)=>{
            return arrayKey.toLowerCase().includes(searchString);
            });
        });
             
         htmlRendering(filteredProducts);
         addToCartBtn(); //--> adding the add to cart button function after rendering the html again
         console.log(filteredProducts);
         
    }); 
   
   
};
//function for search button functionality
function searchBtn() {
   let filteredProducts = [];
   const searchBtnEvent = document.querySelector(".js-search-btn")
 searchBtnEvent.addEventListener("click",()=>{ 
    const inputTest = document.querySelector('.js-search-bar');
    const inputValue = inputTest.value;
    const searchString = inputValue.toLowerCase();
     
    filteredProducts = products.filter((filterProduct) => {
        return filterProduct.name.toLowerCase().includes(searchString) || filterProduct.keywords.some((arrayKey)=>{
            return arrayKey.toLowerCase().includes(searchString);
        });
   });

    console.log(filteredProducts);
    
    if (filteredProducts.length === 0) {
        alert("No products found!");
        htmlRendering(products);
        addToCartBtn();
        inputTest.value = ""; 
        return;
    }
   
    htmlRendering(filteredProducts);
    addToCartBtn(); //--> calling the add to cart button function after rendering the html again
    inputTest.value = ""; 
  });
    
};
//function for rendering the html of products
function htmlRendering(products) {
    let productHTML = ""; 
    products.forEach((value) => {
     productHTML += `
        <div class="product-container">
            <div class="product-image-container">
                <img class="product-image"
                src="${value.image}">
            </div>

            <div class="product-name limit-text-to-2-lines">
            ${value.name}
            </div>

            <div class="product-rating-container">
                <img class="product-rating-stars"
                src="${value.getStaresUrl()}">
                <div class="product-rating-count link-primary">
                ${value.rating.count}
                </div>
            </div>

            <div class="product-price">
            $ ${(value.priceCents / 100).toFixed(2)}
            </div>

            <div class="product-quantity-container">
                <select class ="js-quantity-${value.id}">
                <option selected value="1" >1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                </select>
            </div>
                ${value.sizeChartLinkHtml()}
            <div class="product-spacer"></div>

            <div class="added-to-cart">
                <img src="images/icons/checkmark.png">
                Added
            </div>

            <button class="add-to-cart-button button-primary js-add-to-cart" data-product-Id="${value.id}">
                Add to Cart
            </button>
        </div>`;
    });

    const addHTML = document.querySelector(".js-products-grid");
    addHTML.innerHTML = productHTML;
    
};
//the main function for the dynamic rendering of products

export function renderHtmlGrid(products) {
    
 htmlRendering(products); //--> calling the htmlRendering function fot the products html rendering
   
 showToTotal(); //--> this just show the total quantity by using function
 
 addToCartBtn(); //--> calling the add to cart button function for add event listener

 //searchBar(); //--> calling the search bar function and generate the html based on search input filter value

 searchBtn();
};
//async function to fetch the products data and then run the main rendering function
async function fetchCall() {
    await loadFetch();
    renderHtmlGrid(products);
    console.log(products);
   
};

fetchCall();




