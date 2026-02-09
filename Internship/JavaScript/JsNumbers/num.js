let x = 234.7;
//The toString() method returns a number as a string.
let y = x.toString() 
console.log(y);
console.log(typeof y);

//The toString() method can take an optional radix argument to convert the number to a different base:
let z = x.toString(2);
console.log(z);

//toExponential() returns a string, with a number rounded and written using exponential notation.
console.log(x.toExponential(8));

//toFixed() returns a string, with the number written with a specified number of decimals:
console.log(x.toFixed(0));
console.log(x.toFixed(5));

//toPrecision() returns a string, with a number written with a specified length:
console.log(x.toPrecision(5));

//valueOf() returns a number as a number.
console.log(x.valueOf());
//The Number() method can be used to convert JavaScript variables to numbers:

/* Number()	Returns a number converted from its argument.
parseFloat()	Parses its argument and returns a floating point number
parseInt()	Parses its argument and returns a whole number */

/*Basic Methods
Basic number methods can be used on any number:

toString()
toExponential()
toFixed()
toPrecision()
valueOf()

Static Methods
Static methods can only be used on Number:

Number.isFinite()
Number.isInteger()
Number.isNan()
Number.isSafeInteger()
Number.parseInt()
Number.parseFloat()
 */


// Bitwise Operators

//AND returns 1 only if both bits are 1:
let d = 5 & 3;
console.log(d);
//Bitwise OR returns 1 if one of the bits is 1:
d = 5|3;
console.log(d);
//Bitwise XOR returns 1 if the bits are different:
d = 5^3;
console.log(d);

//Bitwise NOT (~)
console.log(~5);

/*Types of Bitwise Shift Operators
Operator	Name	Symbol
Left Shift	Shift bits to the left	<<
Right Shift (Signed)	Shift bits to the right (keeps sign)	>>
Right Shift (Unsigned)	Shift bits to the right (fills with 0)	>>> */

let num = 8;   // Binary: 00001000

console.log(num << 1);  // 16 → shift left (multiply by 2)
console.log(num >> 1);  // 4  → shift right (divide by 2)
console.log(num >>> 1); // 4  → same for positive numbers

let neg = -8;
console.log(neg >> 1);   // -4 → sign preserved
console.log(neg >>> 1);  // Large positive number

// conversion decimal to binary and binary to decimal
let decimalNum = 25;

// Decimal → Binary
let binaryNum = decimalNum.toString(2);
console.log("Decimal to Binary:", binaryNum);

// Binary → Decimal
let binaryStr = "11001";
let decimalValue = parseInt(binaryStr, 2);
console.log("Binary to Decimal:", decimalValue);



/*How to Create a BigInt
You can create a BigInt in two ways:

Using an integer literal with an n suffix
Using the BigInt() constructor with a string */

// Using an integer literal with an n suffix:
let e = 999999999999999n;

// Using the BigInt() constructor with a string:
let f = BigInt("999999999999999");


//You cannot mix BigInt and Number directly: To fix that, explicitly convert one: