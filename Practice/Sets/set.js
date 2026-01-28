// Create a Set
const letters = new Set(["a","b","c"]);
// --- 1. CREATION & UNIQUENESS ---

// You can create an empty Set...
const emptySet = new Set();

// ...or create one from an existing array.
// Notice: The duplicate '1' and '5' are automatically removed!
const numbers = new Set([1, 2, 3, 1, 5, 5]);

console.log("Initial Set:", numbers); 
// Output: Set(4) { 1, 2, 3, 5 }

console.log("Size:", numbers.size); 
// Output: 4 (Not 6, because duplicates were dropped)


// --- 2. ADDING & CHAINING ---

const mySet = new Set();

// .add() appends a new element
mySet.add("Apple");
mySet.add("Banana");

// .add() returns the Set itself, so you can chain them:
mySet.add("Orange").add("Mango").add("Apple"); // 'Apple' is ignored

console.log("Fruits Set:", mySet);
// Output: Set(4) { 'Apple', 'Banana', 'Orange', 'Mango' }


// --- 3. CHECKING & DELETING ---

// .has(): Returns true if the value exists
console.log("Has Apple?", mySet.has("Apple")); // true
console.log("Has Grape?", mySet.has("Grape")); // false

// .delete(): Removes a value. Returns true if it existed.
const wasDeleted = mySet.delete("Banana");
console.log("Banana deleted?", wasDeleted); // true

// .clear(): Removes EVERYTHING
// mySet.clear(); 


// --- 4. ITERATION (Looping) ---

console.log("--- Looping ---");

// Option A: for...of loop (Most common)
for (const item of mySet) {
    console.log("Item:", item);
}

// Option B: .forEach()
mySet.forEach(value => {
    console.log("forEach:", value);
});


// --- 5. POWER USE: ARRAY CONVERSION ---
// The most common use of Set is to remove duplicates from an Array.

const duplicateArray = ["A", "B", "A", "C", "B"];

// Step 1: Turn Array -> Set (Removes duplicates)
// Step 2: Turn Set -> Array (using Spread syntax ...)
const uniqueArray = [...new Set(duplicateArray)];

console.log("Unique Array:", uniqueArray); 
// Output: ['A', 'B', 'C']


// --- 6. THE "OBJECT" TRAP (Important!) ---
// Sets check for strict equality. Two objects looking the same are NOT the same.

const objSet = new Set();

objSet.add({ id: 1 });
objSet.add({ id: 1 }); // This is allowed! Because they are different references in memory.

const user = { id: 2 };
objSet.add(user);
objSet.add(user); // This is ignored, because it's the EXACT same reference.

console.log("Object Set Size:", objSet.size); 
// Output: 3 (Two distinct objects {id:1}, plus one reference to 'user')