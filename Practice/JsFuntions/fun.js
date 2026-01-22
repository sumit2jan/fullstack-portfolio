//A function can be created with the function keyword, a name, and parentheses.
//The code to run is written inside curly brackets.

function sayHello() {
  return "Hello World";
}
console.log(sayHello());

//Calling vs Referencing a Function

console.log(sayHello);
console.log(sayHello());

/*Parameters and Arguments
Parameters allow you to pass (send) values to a function.

Parameters are listed inside the parentheses in the function definition.

Arguments are the real values passed to, and received by the function. */

function fullName(firstName, lastName) {
  return firstName + " " + lastName;
}

let nam = fullName("Sumit","Singh");
console.log(nam);

/*Returning Values from Functions
A function can return a value back to the code that called it.
The return statement is used to send a value out of a function.

When JavaScript reaches a return statement, the function stops executing.

The value after return is sent back to the caller.

If a function does not return a value, it returns undefined.*/

// A function expression is a function stored in a variable.

const multiply = function (a, b) {return a * b};

let z = multiply(4, 3);

//After a function expression has been stored in a variable, the variable can be used as a function:

/*The function above is actually an anonymous function (a function without a name).

Functions stored in variables do not need function names.

The variable name is used to call the function. */

// const sayHello = function() {
//   return "Hello World";
// }; // here we used the semicolon.

// sayHello();

/*Function Expressions Use Semicolons
A function expression normally a statement.

That is why it usually ends with a semicolon.

Hoisting
Function declarations can be called before they are defined.

Function expressions can not be called before they are defined.

Function declarations are "hoisted" to the top of their scope. This means you can call
 a function before it is defined in the code:
*/


// JavaSript Arrow Funtions

//Arrow Functions allow a shorter syntax for function expressions.

//An arrow function is always written as a function expression.


//before the Arrow Funtions(=>) symbol
let add = function(a, b) {return a + b}

// After the arrow functions 
let addd = (a, b) => a + b;
console.log(addd(3,5));

/*Self-Invoking Functions
An IIFE is short for an Immediately Invoked Function Expression.
Everything inside an IIFE is private to that function.
Variables inside an IIFE cannot be accessed from outside.
 */

let text = (function () {
  return "Hello! I called myself.";
})();
 console.log(text)