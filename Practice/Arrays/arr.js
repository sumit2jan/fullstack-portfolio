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
console.log()
console.log()
console.log()
/*Using delete() leaves undefined holes in the array.
Use pop() or shift() instead. */



// String is a palindrome or not.
// Array Sorting.