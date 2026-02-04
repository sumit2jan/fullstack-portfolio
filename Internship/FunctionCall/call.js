/*
==========================================================
1. WHAT IS call()?
==========================================================

call() is a function method used to:
✔ invoke (call) a function
✔ explicitly set the value of `this`
✔ pass arguments one by one

Syntax:
functionName.call(thisValue, arg1, arg2, ...)
*/

/*
==========================================================
2. PROBLEM WITHOUT call()
==========================================================
*/

function greet() {
  console.log("Hello, my name is " + this.name);
}

greet(); // ❌ this.name is undefined

/*
==========================================================
3. FIX USING call()
==========================================================
*/

const user = {
  name: "Sumit"
};

greet.call(user); // this → user

/*
==========================================================
4. PASSING ARGUMENTS WITH call()
==========================================================
*/

function introduce(city, country) {
  console.log(
    `${this.name} lives in ${city}, ${country}`
  );
}

introduce.call(user, "Delhi", "India");

/*
==========================================================
5. FUNCTION BORROWING
==========================================================
*/

const person1 = {
  name: "Aman",
  sayName: function () {
    console.log("Hi, I am " + this.name);
  }
};

const person2 = {
  name: "Rohit"
};

// Borrow sayName from person1
person1.sayName.call(person2);

/*
==========================================================
6. REUSING LOGIC WITH call()
==========================================================
*/

function calculateTotal(tax) {
  return this.price + this.price * tax;
}

const product1 = { price: 100 };
const product2 = { price: 200 };

console.log(calculateTotal.call(product1, 0.1)); // 110
console.log(calculateTotal.call(product2, 0.2)); // 240

/*
==========================================================
7. call() IN CONSTRUCTOR INHERITANCE
==========================================================
*/

function Person(name, age) {
  this.name = name;
  this.age = age;
}

function Student(name, age, course) {
  // inherit Person properties
  Person.call(this, name, age);
  this.course = course;
}

const s1 = new Student("Sumit", 22, "MCA");
console.log(s1);

/*
==========================================================
8. call() WITH BUILT-IN METHODS
==========================================================
*/

// Convert arguments object to array
function showArgs() {
  const args = Array.prototype.slice.call(arguments);
  console.log(args);
}

showArgs(1, 2, 3);

/*
==========================================================
9. call() VS NORMAL CALL
==========================================================
*/

function showThis() {
  console.log(this);
}

showThis();              // window / undefined
showThis.call(person1);  // person1

/*
==========================================================
10. call() VS apply() VS bind()
==========================================================

call()  → Executes immediately, args separated
apply() → Executes immediately, args in array
bind()  → Returns new function
*/

function add(a, b) {
  return a + b;
}

console.log(add.call(null, 2, 3));
console.log(add.apply(null, [2, 3]));

const boundAdd = add.bind(null, 5);
console.log(boundAdd(10));

/*
==========================================================
11. IMPORTANT RULES
==========================================================

✔ call() works only on normal functions
✔ Arrow functions ignore call()
✔ call() does NOT create a new function
✔ call() executes immediately
*/

/*
==========================================================
12. COMMON MISTAKE
==========================================================
*/

const arrowFn = () => {
  console.log(this);
};

arrowFn.call(user); // ❌ this is NOT changed

/*
==========================================================
13. REAL-WORLD USE CASE
==========================================================
*/

const employee = {
  name: "Sumit",
  role: "Developer"
};

function showEmployee(company) {
  console.log(
    `${this.name} works as ${this.role} at ${company}`
  );
}

showEmployee.call(employee, "Google");

/*
==========================================================
14. SUMMARY
==========================================================

✔ call() lets you control this
✔ Useful for function borrowing
✔ Helps avoid duplicate code
✔ Important for interviews

If you understand this file,
you understand call() completely.
==========================================================
*/
