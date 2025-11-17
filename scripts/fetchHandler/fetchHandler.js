import { loadFetch } from "../../data/products.js";
export async function fetchHandler( renderingFun , tryAgainBtn) {
  try {
    let res = await loadFetch();
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    };
    renderingFun();
  } catch (error) {
    console.log(error.message);
    let show = error.message || 'Something wrong Try again'
    alert(show);
    tryAgainBtn();
    
  };
 
};