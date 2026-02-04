/*
==========================================================
1. WHAT IS A CLOSURE?
==========================================================

A closure is created when:
✔ a function is defined inside another function
✔ the inner function uses variables from the outer function
✔ the inner function is returned or used later

A closure allows the inner function to "remember"
the outer function's variables even after the outer
function has finished execution.
*/

/*
==========================================================
2. BASIC CLOSURE EXAMPLE
==========================================================
*/

function outerFunction() {
  let message = "Hello from outer function";

  function innerFunction() {
    // innerFunction uses variable from outerFunction
    console.log(message);
  }

  return innerFunction; // returning inner function
}

const closureExample = outerFunction();

// outerFunction has finished execution,
// but innerFunction still remembers `message`
closureExample();

/*
==========================================================
3. CLOSURE WITH CHANGING STATE
==========================================================
*/

function counter() {
  let count = 0; // private variable

  return function () {
    count++;
    console.log("Count:", count);
  };
}

const increment = counter();

increment(); // 1
increment(); // 2
increment(); // 3

/*
==========================================================
4. DATA PRIVACY USING CLOSURE
==========================================================
*/

function bankAccount(initialBalance) {
  let balance = initialBalance; // private variable

  return {
    deposit(amount) {
      balance += amount;
      console.log("Balance after deposit:", balance);
    },
    withdraw(amount) {
      if (amount <= balance) {
        balance -= amount;
        console.log("Balance after withdrawal:", balance);
      } else {
        console.log("Insufficient balance");
      }
    }
  };
}

const account = bankAccount(1000);

account.deposit(500);
account.withdraw(300);
// balance cannot be accessed directly

/*
==========================================================
5. CLOSURE IN CALLBACKS
==========================================================
*/

function delayedMessage(msg) {
  setTimeout(function () {
    // callback remembers msg (closure)
    console.log(msg);
  }, 1000);
}

delayedMessage("Hello after 1 second");

/*
==========================================================
6. CLOSURE IN LOOPS (INTERVIEW CLASSIC)
==========================================================
*/

// ❌ Problem with var (shared scope)
for (var i = 1; i <= 3; i++) {
  setTimeout(() => {
    console.log("var loop:", i);
  }, 1500);
}

// ✅ Fix using closure (IIFE)
for (var i = 1; i <= 3; i++) {
  (function (num) {
    setTimeout(() => {
      console.log("closure loop:", num);
    }, 2000);
  })(i);
}

/*
==========================================================
7. MODERN FIX USING let
==========================================================
*/

for (let i = 1; i <= 3; i++) {
  setTimeout(() => {
    console.log("let loop:", i);
  }, 2500);
}

/*
==========================================================
8. MULTIPLE CLOSURES FROM SAME FUNCTION
==========================================================
*/

function multiplier(factor) {
  return function (number) {
    return number * factor;
  };
}

const double = multiplier(2);
const triple = multiplier(3);

console.log(double(5)); // 10
console.log(triple(5)); // 15

/*
==========================================================
9. MEMORY NOTE (IMPORTANT)
==========================================================

Closures keep variables in memory as long as
they are referenced.

Be careful when:
✔ storing large objects
✔ long-living closures
*/

/*
==========================================================
10. SUMMARY
==========================================================

✔ Closure = function + remembered scope
✔ Used for data privacy & state
✔ Common in callbacks & async code
✔ Very important for interviews

If you understand this file,
you understand closures in JavaScript.
==========================================================
*/
