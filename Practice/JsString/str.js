// Base string
let str = "Hello World";
let spacedStr = "   Hello World   ";

console.log("Original String:", str);

// at() – get character by index (supports negative index)
console.log("at(1):", str.at(1));        // e
console.log("at(-1):", str.at(-1));      // d

// charAt() – get character at index
console.log("charAt(4):", str.charAt(4)); // o

// charCodeAt() – Unicode (UTF-16)
console.log("charCodeAt(0):", str.charCodeAt(0)); // 72

// codePointAt() – Unicode value
console.log("codePointAt(0):", str.codePointAt(0)); // 72

// concat() – join strings
console.log("concat():", str.concat("!!!")); // Hello World!!!

// constructor – returns constructor function
console.log("constructor:", str.constructor);

// endsWith() – check ending
console.log("endsWith('World'):", str.endsWith("World")); // true

// String.fromCharCode() – Unicode to character
console.log("fromCharCode(72):", String.fromCharCode(72)); // H

// includes() – check substring
console.log("includes('Hello'):", str.includes("Hello")); // true

// indexOf() – first occurrence
console.log("indexOf('o'):", str.indexOf("o")); // 4

// isWellFormed() – valid Unicode check
console.log("isWellFormed():", str.isWellFormed()); // true

// lastIndexOf() – last occurrence
console.log("lastIndexOf('o'):", str.lastIndexOf("o")); // 7

// length – string length
console.log("length:", str.length); // 11

// localeCompare() – compare strings
console.log("'apple'.localeCompare('banana'):", "apple".localeCompare("banana")); // -1

// match() – regex match
console.log("match(/o/g):", str.match(/o/g)); // ['o', 'o']

// matchAll() – returns iterator
console.log("matchAll(/o/g):", [...str.matchAll(/o/g)]);

// padEnd() – pad at end
console.log("padEnd():", str.padEnd(15, "!")); // Hello World!!!!

// padStart() – pad at start
console.log("padStart():", str.padStart(15, "*")); // ****Hello World

// repeat() – repeat string
console.log("repeat(2):", "Hi ".repeat(2)); // Hi Hi 

// replace() – replace first match
console.log("replace():", str.replace("World", "JavaScript")); // Hello JavaScript

// replaceAll() – replace all matches
console.log("replaceAll():", str.replaceAll("o", "0")); // Hell0 W0rld

// search() – search using regex
console.log("search('World'):", str.search("World")); // 6

// slice() – extract part of string
console.log("slice(0,5):", str.slice(0, 5)); // Hello

// split() – split into array
console.log("split(' '):", str.split(" ")); // ['Hello', 'World']

// startsWith() – check start
console.log("startsWith('Hello'):", str.startsWith("Hello")); // true

// substr() – deprecated (do not use in new code)
console.log("substr(0,5):", str.substr(0, 5)); // Hello

// substring() – extract using indices
console.log("substring(0,5):", str.substring(0, 5)); // Hello

// toLocaleLowerCase()
console.log("toLocaleLowerCase():", str.toLocaleLowerCase()); // hello world

// toLocaleUpperCase()
console.log("toLocaleUpperCase():", str.toLocaleUpperCase()); // HELLO WORLD

// toLowerCase()
console.log("toLowerCase():", str.toLowerCase()); // hello world

// toUpperCase()
console.log("toUpperCase():", str.toUpperCase()); // HELLO WORLD

// toString() – convert to string
console.log("toString():", str.toString());

// toWellFormed() – replace invalid Unicode
console.log("toWellFormed():", str.toWellFormed());

// trim() – remove spaces from both sides
console.log("trim():", spacedStr.trim()); // Hello World

// trimStart() – remove spaces from start
console.log("trimStart():", spacedStr.trimStart()); // Hello World   

// trimEnd() – remove spaces from end
console.log("trimEnd():", spacedStr.trimEnd()); //    Hello World

// valueOf() – primitive value
console.log("valueOf():", str.valueOf());
