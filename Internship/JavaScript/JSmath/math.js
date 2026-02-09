// --- 1. CONSTANTS ---
// Useful mathematical values stored as properties.

console.log("PI:", Math.PI); // 3.14159...
console.log("Euler's Constant (E):", Math.E); // 2.718...


// --- 2. ROUNDING METHODS (The Big 4) ---
// It is crucial to know the difference, especially with negative numbers.

const num = 5.7;
const negNum = -5.7;

// Math.round(): Standard rounding (0.5 goes up)
console.log("round(5.7):", Math.round(num));   // 6
console.log("round(5.4):", Math.round(5.4));   // 5

// Math.ceil(): "Ceiling" -> Always rounds UP to the top
console.log("ceil(5.1):", Math.ceil(5.1));     // 6
console.log("ceil(-5.7):", Math.ceil(negNum)); // -5 (Upwards towards zero)

// Math.floor(): "Floor" -> Always rounds DOWN to the bottom
console.log("floor(5.9):", Math.floor(5.9));     // 5
console.log("floor(-5.1):", Math.floor(-5.1));   // -6 (Downwards away from zero)

// Math.trunc(): "Truncate" -> Just cuts off the decimal part
console.log("trunc(5.9):", Math.trunc(5.9));     // 5
console.log("trunc(-5.9):", Math.trunc(-5.9));   // -5 (Different from floor!)


// --- 3. BASIC ARITHMETIC ---

// Powers
console.log("pow(2, 3):", Math.pow(2, 3)); // 2^3 = 8
// Modern JS shortcut: 2 ** 3

// Square Root
console.log("sqrt(64):", Math.sqrt(64));   // 8

// Absolute Value (Distance from zero)
console.log("abs(-50):", Math.abs(-50));   // 50

// Sign (Returns 1, -1, or 0)
console.log("sign(-150):", Math.sign(-150)); // -1
console.log("sign(150):", Math.sign(150));   // 1
console.log("sign(0):", Math.sign(0));       // 0


// --- 4. RANDOM NUMBERS ---
// Math.random() returns a decimal between 0 (inclusive) and 1 (exclusive).

const randomVal = Math.random();
console.log("Random (0-1):", randomVal); // e.g., 0.8234...

// PRACTICAL FORMULA: Getting a random integer between min and max
// Example: Random number between 1 and 10
const min = 1;
const max = 10;

// Logic:
// 1. (max - min + 1) -> Gives the range size (10)
// 2. Math.random() * 10 -> Gives 0.0 to 9.99...
// 3. Math.floor(...) -> Gives integer 0 to 9
// 4. + min -> Shifts it to 1 to 10
const randomInt = Math.floor(Math.random() * (max - min + 1)) + min;
console.log("Random Integer (1-10):", randomInt);


// --- 5. MIN & MAX ---
// Finds the lowest or highest value in a list of arguments.

// With arguments:
console.log("Max:", Math.max(10, 50, 5)); // 50

// With an Array (Must use Spread Syntax ...):
const prices = [12.50, 5.00, 99.99, 3.50];
console.log("Max from Array:", Math.max(...prices)); // 99.99
console.log("Min from Array:", Math.min(...prices)); // 3.50