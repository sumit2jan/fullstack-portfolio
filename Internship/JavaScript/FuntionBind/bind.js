/*
==========================================================
1. WHAT IS bind()?
==========================================================

bind() is a function method used to:
✔ create a NEW function
✔ permanently bind `this` to an object
✔ optionally preset arguments

IMPORTANT:
bind() DOES NOT execute the function immediately.
It returns a new function.
*/

/*
==========================================================
2. BASIC EXAMPLE
==========================================================
*/

function greet() {
  console.log("Hello, my name is " + this.name);
}

const user = { name: "Sumit" };

// bind returns a new function
const greetUser = greet.bind(user);

// function executes only when called
greetUser();

/*
==========================================================
3. bind() VS call() / apply()
==========================================================

call()  → executes immediately
apply() → executes immediately
bind()  → returns function for later use
*/

/*
==========================================================
4. PASSING ARGUMENTS WITH bind()
==========================================================
*/

function introduce(city, country) {
  console.log(
    `${this.name} lives in ${city}, ${country}`
  );
}

// preset arguments
const introUser = introduce.bind(user, "Delhi");

introUser("India"); // remaining argument

/*
==========================================================
5. PARTIAL FUNCTION (CURRYING)
==========================================================
*/

function multiply(a, b) {
  return a * b;
}

// preset first value
const double = multiply.bind(null, 2);

console.log(double(5)); // 10

/*
==========================================================
6. bind() IN EVENT HANDLERS
==========================================================
*/

/*
<button id="btn">Click</button>
*/

const obj = {
  name: "ButtonObject",
  handleClick: function () {
    console.log(this.name);
  }
};

// without bind → this = button element
document.getElementById("btn")?.addEventListener(
  "click",
  obj.handleClick.bind(obj)
);

/*
==========================================================
7. bind() TO FIX setTimeout this
==========================================================
*/

const timer = {
  name: "TimerObject",
  start: function () {
    setTimeout(function () {
      console.log(this.name);
    }.bind(this), 1000);
  }
};

timer.start();

/*
==========================================================
8. bind() WITH CONSTRUCTOR FUNCTIONS
==========================================================
*/

function Person(name) {
  this.name = name;
}

const BoundPerson = Person.bind(null);

const p1 = new BoundPerson("Sumit");
console.log(p1.name);

/*
==========================================================
9. IMPORTANT RULES
==========================================================

✔ bind() creates a new function
✔ this is permanently fixed
✔ bind() can preset arguments
✔ bind() works with normal functions
✔ Arrow functions ignore bind()
*/

/*
==========================================================
10. COMMON MISTAKE
==========================================================
*/

const arrowFn = () => {
  console.log(this);
};

arrowFn.bind(user)(); // ❌ this NOT changed

/*
==========================================================
11. REAL-WORLD USE CASE
==========================================================
*/

const employee = {
  name: "Sumit",
  role: "Developer",
  showDetails: function () {
    console.log(`${this.name} is a ${this.role}`);
  }
};

// pass method as callback safely
setTimeout(employee.showDetails.bind(employee), 500);

/*
==========================================================
12. SUMMARY
==========================================================

✔ bind() returns a function
✔ this is fixed permanently
✔ Useful for callbacks & events
✔ Prevents context loss

If you understand this file,
you fully understand bind() in JavaScript.
==========================================================
*/
