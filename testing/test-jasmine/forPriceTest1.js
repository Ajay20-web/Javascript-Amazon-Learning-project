import { forPrice } from '../../scripts/utlity/utility.js';

// This we use automatic testing framework to test the forPrice function
console.log(forPrice(2087));

// This the way of grouping the test with testing framework and this the format of the testing with framework
describe('test suite: testing the forPrice function', () =>{ // --> this the name of the test group.
    it('checking the forPrice return values' , () => { // --> this the name of what test we do.
        expect(forPrice(2087)).toEqual('$20.87')}); // --> the testing.

    it('Testing with 0', () => {
        expect(forPrice(0)).toEqual('$0.00')});   
    });
