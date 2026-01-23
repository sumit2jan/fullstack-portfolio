/*In JavaScript, an object is a collection of key–value pairs.
Keys → also called properties
Values → can be any data type (string, number, array, function, even another object) */

// creating objects in the javascript
// 1. object literals(most common)
const person = {
  name: "Rahul",
  age: 22,
  isStudent: true
};

// Create a new JavaScript object using new Object():

const human = new Object();
human.name = "Sumit";
human.age = 23;
console.log(human.age)

// by using the constructor method
function Pers(name, age) {
  this.name = name;
  this.age = age;
}

const p1 = new Pers("Rahul", 22);

// accesing the objects value.
console.log(person.name);
console.log(person["age"])
let text = person;
console.log(text);

//Adding, Updating, and Deleting Properties
// adding and updating is somewhere the same 

person.name = "Sumit"; // add and update we do by this

// for deleting we use
delete person.age;

//Objects with Methods (Functions inside Objects)
const user = {
  name: "Sumit",
  greet: function () {
    console.log("Hello, " + this.name);
  }
};
user.greet();


//Nested Objects
const student = {
  name: "Sumit",
  address: {
    city: "Pune",
    state: "Maharashtra"
  }
};

student.address.city;
//Looping Through Objects

for (let key in student) {
  console.log(key, student[key]);
}

//Important Built-in Object Methods

Object.keys(student);
// ["name", "address"]

Object.values(student);

Object.entries(student);


//Real-World Example
const car = {
  brand: "Tesla",
  model: "Model 3",
  start: function () {
    console.log("Car started");
  }
};

car.start();
