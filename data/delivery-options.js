export const deliveryOptions = [{
id:'1',
deliveryDays:7,
priceCents:0  
},
{
id:'2',
deliveryDays:3,
priceCents:499  
},
{
id:'3',
deliveryDays:1,
priceCents:999
}];


export function deliveryOption(option) {
      let showingOption;

      deliveryOptions.forEach( (deliveryOption) => {
      if (option === deliveryOption.id) {
           showingOption = deliveryOption
      };});

      return showingOption || deliveryOptions[0];
};