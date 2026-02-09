/*
==========================================================
1. WHAT IS apply()?
==========================================================

apply() is a function method used to:
✔ invoke (call) a function
✔ explicitly set the value of `this`
✔ pass arguments as an ARRAY

Syntax:
functionName.apply(thisValue, [arg1, arg2, ...])
*/

/*
==========================================================
2. BASIC EXAMPLE
==========================================================
*/

function greet(city, country) {
  console.log("Hello, my name is " + this.name);
  console.log("I live in " + city + ", " + country);
}

const user = { name: "Sumit" };

// arguments passed as array
greet.apply(user, ["Delhi", "India"]);

/*
==========================================================
3. apply() VS NORMAL FUNCTION CALL
==========================================================
*/

greet("Delhi", "India"); // ❌ this.name is undefined

/*
==========================================================
4. FUNCTION BORROWING
==========================================================
*/

const person1 = {
  name: "Aman",
  sayHello: function () {
    console.log("Hi, I am " + this.name);
  }
};

const person2 = {
  name: "Rohit"
};

// borrow sayHello from person1
person1.sayHello.apply(person2);

/*
==========================================================
5. PASSING DYNAMIC DATA
==========================================================
*/

function calculateTotal(price, tax, discount) {
  return price + tax - discount;
}

const values = [100, 10, 5];

// apply() spreads array as arguments
const total = calculateTotal.apply(null, values);
console.log("Total:", total);

/*
==========================================================
6. apply() WITH ARRAYS (VERY COMMON)
==========================================================
*/

const numbers = [10, 30, 50, 20];

// Math.max expects individual numbers
const maxNumber = Math.max.apply(null, numbers);
console.log("Max:", maxNumber);

/*
==========================================================
7. USING apply() WITH arguments OBJECT
==========================================================
*/

function sumAll() {
  // arguments is array-like, not real array
  const args = Array.prototype.slice.apply(arguments);
  console.log("Arguments array:", args);

  return args.reduce((sum, num) => sum + num, 0);
}

console.log("Sum:", sumAll(1, 2, 3, 4));

/*
==========================================================
8. CONSTRUCTOR INHERITANCE USING apply()
==========================================================
*/

function Person(name, age) {
  this.name = name;
  this.age = age;
}

function Student(name, age, course) {
  // inherit properties from Person
  Person.apply(this, [name, age]);
  this.course = course;
}

const s1 = new Student("Sumit", 22, "MCA");
console.log(s1);

/*
==========================================================
9. IMPORTANT RULE (ARROW FUNCTIONS)
==========================================================
*/

// Arrow functions ignore apply()
const arrowFn = () => {
  console.log("Arrow this:", this);
};

arrowFn.apply({ name: "Test" }); // ❌ this NOT changed

/*
==========================================================
10. apply() VS call() VS bind()
==========================================================

call()  → args separated
apply() → args in array
bind()  → returns new function
*/

/*
==========================================================
11. WHEN TO USE apply()
==========================================================

✔ When arguments are in an array
✔ When data is dynamic
✔ When borrowing functions
✔ When working with legacy JS
*/

/*
==========================================================
12. SUMMARY
==========================================================

✔ apply() executes immediately
✔ apply() sets this explicitly
✔ Arguments must be in array
✔ Arrow functions ignore apply()

If you understand this file,
you fully understand apply() in JavaScript.
==========================================================
*/

