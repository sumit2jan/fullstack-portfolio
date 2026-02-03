/*************************************************
 * JSON IN JAVASCRIPT – COMPLETE ONE-FILE EXAMPLE
 *************************************************/

/*
  STEP 1: A normal JavaScript object
  ---------------------------------
  This is NOT JSON.
  This is a real JS object used for logic.
*/
const userObject = {
  name: "Sumit",
  age: 22,
  isStudent: true,
  skills: ["JavaScript", "React", "Node"],
  address: {
    city: "Pune",
    country: "India"
  }
};

console.log("JavaScript Object:", userObject);

/*
  STEP 2: Convert JavaScript Object → JSON
  ---------------------------------------
  JSON.stringify() converts the object into
  a JSON STRING (used to send data to server).
*/
const jsonString = JSON.stringify(userObject);

console.log("JSON String:", jsonString);
console.log("Type of jsonString:", typeof jsonString); // string

/*
  IMPORTANT:
  - JSON is always a STRING
  - Keys are in double quotes
  - No functions allowed
*/

/*
  STEP 3: Simulating server response
  ----------------------------------
  Imagine this JSON comes from a server/API
*/
const serverResponse = `
{
  "name": "Sumit",
  "age": 22,
  "isStudent": true,
  "skills": ["JavaScript", "React", "Node"],
  "address": {
    "city": "Pune",
    "country": "India"
  }
}
`;

/*
  STEP 4: Convert JSON → JavaScript Object
  ---------------------------------------
  JSON.parse() converts JSON string
  back into a usable JS object
*/
const parsedObject = JSON.parse(serverResponse);

console.log("Parsed Object:", parsedObject);
console.log("User Name:", parsedObject.name);
console.log("City:", parsedObject.address.city);

/*
  STEP 5: Accessing JSON data (after parsing)
  -------------------------------------------
*/
parsedObject.skills.forEach(skill => {
  console.log("Skill:", skill);
});

/*
  STEP 6: Modify the object
  -------------------------
  JSON itself is read-only text.
  We must modify the JS object.
*/
parsedObject.age = 23;
parsedObject.skills.push("MongoDB");

/*
  STEP 7: Convert modified object back to JSON
  --------------------------------------------
*/
const updatedJSON = JSON.stringify(parsedObject, null, 2);

console.log("Updated JSON:", updatedJSON);

/*
  STEP 8: JSON Rules Demonstration
  --------------------------------
  ❌ INVALID JSON (will throw error)
  
  {
    name: "Sumit",       // ❌ keys must be in double quotes
    age: undefined,      // ❌ undefined not allowed
    greet: function(){}  // ❌ functions not allowed
  }

  ✅ VALID JSON
  {
    "name": "Sumit",
    "age": 22,
    "isStudent": true
  }
*/

/*
  FINAL SUMMARY:
  --------------
  - JSON is a STRING format for data exchange
  - JSON.stringify() → Object → JSON
  - JSON.parse() → JSON → Object
  - JSON is used in APIs, AJAX, Fetch, storage
*/
