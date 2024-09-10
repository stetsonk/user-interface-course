// 1A
// function addTwoNumbers(a, b){
//     return a+b; 
// }

let addTwoNumbers = (a, b) => a + b;

// 1B
// function stringLength( myStr ){
//     if(myStr.length < 10)
//         return "short";
//     return "long";
// }

let stringLength = (myStr) => myStr.length < 10 ? "short" : "long";

// 2
// let fn = (a,b) => { a>b ? console.log(a) : console.log(b) }

// If a is greater than b, print a to console else print b to console

// 3
const numbers = [1, 2, 3, 4, 5];

// Using map to create a new array with squared values
const squaredNumbers = numbers.map(function(number) {
  return number * number;
});
