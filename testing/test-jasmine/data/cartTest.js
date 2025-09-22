import { addToCart , cart ,loadingFormsStorage } from  "../../../data/cart.js";

// The testing with framework is important to find the issues in the code and we can find the bugs before that happens so if you forgot just learn again 
console.log(cart);

// All test is must be this format and indiuial test are must under the it() function
describe('test suite: testing the cart', ()=> {

  it('add new product to cart', ()=> {
    spyOn(localStorage,'getItem').and.callFake( (key) =>{ //--> We just reassign the cart into localstorage.getItem function so instate of takeing our real localstorage the js take our fake or mock localstorage.getItem() function because jasmine just create the function that is have same name as real browser localstorage so our real cade take that fake function instate of taking real one 
    return JSON.stringify([])
 });
  spyOn(localStorage ,'setItem') //--> This just preventing the our real browser localstorage changes because it's create the fake localstorage.setItem() function so go sit into our real code instate of real localstorage so this preventing the changes happing into real localstorage.

  loadingFormsStorage()// --> This call is connecting our real cart file into our testing cart file and giving access to the testing framework.  
  console.log(localStorage.getItem(''));
  addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6')
  addToCart('15b6fc6f-327a-4ec4-896f-486349e85a3d')
  expect(cart.length).toEqual(2)
  expect(localStorage.setItem).toHaveBeenCalledTimes(2)  // --> This shows how many times the fake localstorage.setItem go sit our code before the real localstorage.setItem for verifying the real localstorage not affected.
  expect(cart[0].productid).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6')
  expect(cart[0].quantity).toEqual(1)
  expect(cart[0].deliveryOptionsid).toEqual('1')
});

it('add on existing product into testing mock cart to check the addCart',() =>{

  spyOn(localStorage,'getItem').and.callFake( (key) =>{
    return JSON.stringify([{
      productid:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 1,
      deliveryOptionsid: '1'
    }]);
 });

  spyOn(localStorage ,'setItem')

  loadingFormsStorage()
  console.log(localStorage.getItem(''));
  addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6')
  expect(cart.length).toEqual(1)
  expect(localStorage.setItem).toHaveBeenCalledTimes(1)  
  expect(cart[0].productid).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6')
  expect(cart[0].quantity).toEqual(2)
  expect(cart[0].deliveryOptionsid).toEqual('1')
});
  
});
