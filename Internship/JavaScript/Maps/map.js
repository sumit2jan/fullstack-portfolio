// --- 1. CREATION & INITIALIZATION ---

// Create an empty Map
const myMap = new Map();

// Create a Map with initial values (Array of Arrays)
const currencyMap = new Map([
    ["USD", "United States Dollar"],
    ["EUR", "Euro"],
    ["GBP", "British Pound"]
]);

console.log("Initial Map Size:", currencyMap.size); 
// Output: 3


// --- 2. ADDING & RETRIEVING DATA ---

// .set(key, value): Adds a new pair. Returns the Map (chainable).
myMap.set("name", "John Doe");
myMap.set(1, "number one");        // Number as key
myMap.set(true, "Boolean key");    // Boolean as key

// .get(key): Retrieves the value. Returns undefined if not found.
console.log(myMap.get("name")); // "John Doe"
console.log(myMap.get(1));      // "number one"
console.log(myMap.get(99));     // undefined


// --- 3. THE "ANY KEY" SUPERPOWER ---
// In regular Objects, keys are always Strings. In Maps, they can be Objects!

const user1 = { id: 1 };
const user2 = { id: 2 };

// We use the OBJECT ITSELF as the key to store metadata about it
const userRoles = new Map();
userRoles.set(user1, "Admin");
userRoles.set(user2, "Editor");

console.log(userRoles.get(user1)); // "Admin"
console.log(userRoles.get({ id: 1 })); 
// Output: undefined (Because this is a DIFFERENT object in memory!)


// --- 4. CHECKING & DELETING ---

// .has(key): Checks if key exists
console.log("Has USD?", currencyMap.has("USD")); // true

// .delete(key): Removes the pair. Returns true if successful.
currencyMap.delete("GBP");

// .clear(): Removes EVERYTHING
// currencyMap.clear();


// --- 5. ITERATION (Looping) ---

console.log("--- Looping ---");

// Option A: for...of (Loops over [key, value] pairs)
for (const [key, value] of myMap) {
    console.log(`${key} => ${value}`);
}

// Option B: .forEach()
// Note: In Map, forEach gives (value, key) order!
myMap.forEach((value, key) => {
    console.log("forEach:", key, value);
});

// Option C: Specific Iterators
console.log("Keys:", [...myMap.keys()]);   // ['name', 1, true]
console.log("Values:", [...myMap.values()]); // ['John Doe', 'number one', 'Boolean key']


// --- 6. MAP VS OBJECT CONVERSION ---

const obj = { a: 1, b: 2 };

// Object -> Map
const mapFromObj = new Map(Object.entries(obj));
console.log(mapFromObj.get("a")); // 1

// Map -> Object
const objFromMap = Object.fromEntries(myMap);
console.log(objFromMap); // { name: 'John Doe', '1': 'number one', ... }