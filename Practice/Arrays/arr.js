// iterating into the arrays

//for...of (The Modern Standard)
const dates = ["2023-01-01", "2023-02-14", "2023-12-25"];

for (const date of dates) {
    console.log("Found date:", date);
}
// Output: 
// Found date: 2023-01-01
// Found date: 2023-02-14 ...


//forEach() (The Functional Way)
const datess = ["2023-01-01", "2023-02-14", "2023-12-25"];

datess.forEach((date, index) => {
    console.log(`Date #${index + 1} is ${date}`);
});
// Output:
// Date #1 is 2023-01-01
// Date #2 is 2023-02-14 ...


//map() (For Transforming Data)
const dateStrings = ["2023-01-01", "2023-02-14"];

// Create a NEW array called 'realDates'
const realDates = dateStrings.map(dateStr => {
    return new Date(dateStr); // Convert each item
});

console.log(realDates); 
// Output: [Date Object, Date Object]

//The Classic for Loop (Old School)
const datas = ["2023-01-01", "2023-02-14", "2023-12-25"];

// Start at 0; Keep going while i is less than length; Increase i by 1
for (let i = 0; i < dates.length; i++) {
    if (dates[i] === "2023-02-14") {
        console.log("Found Valentine's Day! Stopping.");
        break; // You can STOP this loop anytime
    }
    console.log(dates[i]);
}


/*The Difference Between Arrays and Objects

In JavaScript, arrays use numbered indexes.  

In JavaScript, objects use named indexes.
*/


//Nested Arrays and Objects
const myObj = {
  name: "John",
  age: 30,
  cars: [
    {name:"Ford", models:["Fiesta", "Focus", "Mustang"]},
    {name:"BMW", models:["320", "X3", "X5"]},
    {name:"Fiat", models:["500", "Panda"]}
  ]
}



//ArrayMethods

let arr1 = [1,2,3,4,5,6,7,8,9];
console.log(arr1.length); // length
console.log(arr1.toString());//.toString();
console.log(arr1.at(3));//.at();
console.log(arr1.join("*"));
console.log(arr1.pop());//pop();
console.log(arr1.push(9));//push();
console.log(arr1.shift()); //The shift() method returns the value that was "shifted out"
console.log(arr1.unshift(1))//The unshift() method adds a new element to an array (at the beginning)
console.log(Array.isArray(arr1));//tells it is a array or not.
// adding the arrays
arr1.push(10);
console.log(arr1);
//Merging Arrays (Concatenating)
let arr = [11,12,13,14,15];
console.log(arr1.concat(arr));// if there is three array we will add the another parameter.
console.log(arr.copyWithin(2,0,2))//The copyWithin() method copies array elements to another position in an array:

//Flattening an array is the process of reducing the dimensionality of an array.
//Flattening is useful when you want to convert a multi-dimensional array into a one-dimensional array.
let myarr = [[1,2],[3,4],[5,6],[7,8]];
console.log(myarr);
let myarr1 = myarr.flat();
console.log(myarr1);//flat(); used for the flattening.

//FlatMap The flatMap() method first maps all elements of an array and then creates a new array by flattening the array.
console.log(myarr1.flatMap(x => [x,x*10]));

//The splice() method can be used to add new items to an array:
myarr1.splice(2,0,10,11,12);
console.log(myarr1)
/*Using delete() leaves undefined holes in the array.
Use pop() or shift() instead. */




//Array Search Methods
// --- THE DATASET ---
// We use an array with duplicates to clearly see the difference
// between "first" (left-to-right) and "last" (right-to-left) searches.
const numbers = [5, 12, 8, 130, 12, 44];
// Indices:      0   1  2    3   4   5

// --- 1. EXACT VALUE SEARCHES 
// indexOf(): Scans from start -> end. Finds the FIRST occurrence of 12.
const index = numbers.indexOf(12);
console.log("indexOf(12):", index); 
// Output: 1

// lastIndexOf(): Scans from end -> start. Finds the LAST occurrence of 12.
const lastIndex = numbers.lastIndexOf(12);
console.log("lastIndexOf(12):", lastIndex); 
// Output: 4

// includes(): Returns true if found, false if not.
const hasValue = numbers.includes(130);
console.log("includes(130):", hasValue); 
// Output: true


// --- 2. CONDITION SEARCHES (Uses a function 'x => ...') ---

// find(): Returns the actual VALUE of the first item matching the rule.
// Rule: "Find the first number greater than 10"
const foundValue = numbers.find(x => x > 10);
console.log("find(x > 10):", foundValue); 
// Output: 12 (Stops at index 1)

// findIndex(): Returns the INDEX of the first item matching the rule.
// Rule: "Find the index of the first number greater than 10"
const foundIdx = numbers.findIndex(x => x > 10);
console.log("findIndex(x > 10):", foundIdx); 
// Output: 1

// findLast(): Returns the VALUE of the last item matching the rule.
// Rule: "Find the last number greater than 10" (Scans backwards)
const foundLastVal = numbers.findLast(x => x > 10);
console.log("findLast(x > 10):", foundLastVal); 
// Output: 44 (Stops at index 5)

// findLastIndex(): Returns the INDEX of the last item matching the rule.
// Rule: "Find the index of the last number greater than 10"
const foundLastIdx = numbers.findLastIndex(x => x > 10);
console.log("findLastIndex(x > 10):", foundLastIdx); 
// Output: 5



// String is a palindrome or not.
// Array Sorting.