import { renderPage } from '../../../scripts/checkout/ordersummery.js';
import { cart, loadingFormsStorage } from '../../../data/cart.js';
import { products , loadFetch } from '../../../data/products.js';
console.log(products);

// integration testing 
describe('test suite: testing the renderPage function form orderSummery.js', ()=> {

beforeAll((done)=>{
  // loadProduct(done); //--> This loadProduct function is for getting the product data from the backend server and that done() function we give argument to the loadProduct() and we run the done() function after getting the data so that done() run the full test after getting the data from server.
 
  Promise.all([loadFetch()]).then(()=>{
    done(); //-->This done() function run the full test after getting the data from server.
  });

});


  let prodect1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
  let prodect2 = "15b6fc6f-327a-4ec4-896f-486349e85a3d";
  beforeEach( () =>{ //-->This just run the beforeEach() function inside it() block first line that's the reason we put product1,product2 variables outside the beforeEach() function.
    spyOn(localStorage ,'setItem');
    document.querySelector('.js-test-container').innerHTML =`
    <div class="order-summary"></div>
    <div class="js-payment"></div>
    `;
      spyOn(localStorage,'getItem').and.callFake( () =>{
        return JSON.stringify([{
          productid:prodect1,
          quantity: 2,
          deliveryOptionsid:'1'
        },
        {
          productid:prodect2,
          quantity: 1,
          deliveryOptionsid:'2'
        }]);
      });

    loadingFormsStorage();

    renderPage();
  });

  it('display the cart', () =>{
  
    expect( document.querySelectorAll('.js-test-howMany').length).toEqual(2)
    
  });

  it('testing the delete cart link', ()=>{
   
    document.querySelector(`.js-test-delete${prodect1}`).click() //-->This give automatic click this just testing framework function.
    expect( document.querySelectorAll('.js-test-howMany').length).toEqual(1);

    expect( document.querySelector(`.js-container-${prodect1}`) ).toEqual(null);
    expect( document.querySelector(`.js-container-${prodect2}`) ).not.toEqual(null);//-->This told not equal to null so that means some data or something present in the dom.
    expect( localStorage.setItem).toHaveBeenCalledTimes(1)  
  });

  afterEach( ()=>{ //--> This just run after the it() block run this just clean up the html that's all.
    document.querySelector('.js-test-container').innerHTML ='';
  });
}); 
