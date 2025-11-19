export function forPrice(priceCents) {
    let price = ''
    if (priceCents === 'FREE') {
       price = priceCents
    }else{
     price = "$" + ((priceCents)/100).toFixed(2);
    }

    return price
    
};