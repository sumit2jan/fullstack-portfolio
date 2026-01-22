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