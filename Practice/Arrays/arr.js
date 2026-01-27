let arr = [1,2,3,4,45,6];
console.log(arr[1]);

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

// adding the arrays
arr.push(34);
console.log(arr);

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