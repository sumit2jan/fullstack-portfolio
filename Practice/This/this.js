/**********************************************************
 * JAVASCRIPT "this" KEYWORD – COMPLETE GUIDE
 * One file. Fully commented. Beginner → Advanced
 **********************************************************/

/*
==========================================================
1. GLOBAL CONTEXT
==========================================================

In the global scope:
- In browser → this = window
- In strict mode → this = undefined
*/

console.log("Global this:", this);

/*
==========================================================
2. this INSIDE A NORMAL FUNCTION
==========================================================
*/

function normalFunction() {
  console.log("Normal function this:", this);
}

normalFunction(); // window (or undefined in strict mode)

/*
==========================================================
3. this INSIDE AN OBJECT METHOD
==========================================================
*/

const user = {
  name: "Sumit",
  greet: function () {
    console.log("Hello, my name is", this.name);
  }
};

user.greet(); // this → user

/*
==========================================================
4. WHY "this" IS IMPORTANT
==========================================================

Without this, methods would not know
which object is calling them.
*/

const user2 = {
  name: "Aman",
  greet: user.greet
};

user2.greet(); // this → user2

/*
==========================================================
5. this INSIDE AN ARROW FUNCTION (IMPORTANT)
==========================================================
*/

const arrowExample = {
  name: "Arrow",
  greet: () => {
    console.log("Arrow this:", this.name);
  }
};

arrowExample.greet(); // undefined

/*
Arrow functions DO NOT have their own this.
They take this from their surrounding scope.
*/

/*
==========================================================
6. this INSIDE AN EVENT HANDLER
==========================================================
*/

/*
<button id="btn">Click Me</button>
*/

document.getElementById("btn")?.addEventListener("click", function () {
  console.log("Button clicked, this is:", this);
});

/*
==========================================================
7. this IN CONSTRUCTOR FUNCTION
==========================================================
*/

function Person(name, age) {
  this.name = name;
  this.age = age;
}

const p1 = new Person("Sumit", 22);
const p2 = new Person("Aman", 23);

console.log(p1.name, p2.name);

/*
==========================================================
8. this IN CLASS
==========================================================
*/

class Student {
  constructor(name, course) {
    this.name = name;
    this.course = course;
  }

  introduce() {
    console.log(`I am ${this.name} studying ${this.course}`);
  }
}

const s1 = new Student("Sumit", "MCA");
s1.introduce();

/*
==========================================================
9. MANUALLY SETTING this USING call()
==========================================================
*/

function showDetails(city) {
  console.log(`${this.name} lives in ${city}`);
}

showDetails.call(user, "Delhi");

/*
==========================================================
10. call() FUNCTION BORROWING
==========================================================
*/

const personA = {
  name: "Rohit"
};

showDetails.call(personA, "Mumbai");

/*
==========================================================
11. this IN setTimeout (COMMON CONFUSION)
==========================================================
*/

const timerObj = {
  name: "Timer Object",
  start: function () {
    setTimeout(function () {
      console.log("Timeout this:", this);
    }, 1000);
  }
};

timerObj.start(); // this → window

/*
Fix using arrow function
*/

const timerObjFixed = {
  name: "Timer Fixed",
  start: function () {
    setTimeout(() => {
      console.log("Fixed timeout this:", this.name);
    }, 1000);
  }
};

timerObjFixed.start();

/*
==========================================================
12. STRICT MODE EFFECT
==========================================================
*/

"use strict";

function strictFunction() {
  console.log("Strict mode this:", this);
}

strictFunction(); // undefined

/*
==========================================================
13. SUMMARY
==========================================================

✔ this depends on HOW a function is called
✔ Object method → this = object
✔ Normal function → this = window / undefined
✔ Arrow function → inherits this
✔ Constructor / class → this = new object
✔ call() can manually set this

If you understand this file,
you understand the most confusing JS topic.
==========================================================
*/
