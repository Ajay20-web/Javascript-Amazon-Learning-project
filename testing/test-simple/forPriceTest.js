import { forPrice } from '../../scripts/utlity/utility.js';


// This the automatic testing we test the important functions with automatic testing like a calculations.
console.log('test suite: testing the forPrice function'); //--> this the name of the test group 

console.log('Checking the forPrice return values');//--> this the name of what test we do 

console.log(forPrice(0));

console.log('Convert cents into dollars');//--> this the name of what test we do 

if (forPrice(2087) === '$'+20.87) {
   console.log('pass');
} else {
   console.log('fail');   
};

// We also test with different numbers and we should test with multiple numbers for avoiding miscalculations 

console.log('Testing with 0');//--> this the name of what test we do 

if (forPrice(0) === '$' + 0.00) {
    console.log('pass');
} else {
   console.log('fail'); 
};


console.log('Testing with another number 2000.8');//--> this the name of what test we do 

if (forPrice(2000.8) === '$' + 20.01) {
    console.log('pass');
} else {
   console.log('fail'); 
};

 
