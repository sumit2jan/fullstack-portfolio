/*
=======================================================
1. WHAT IS A REGULAR EXPRESSION?
=======================================================

A Regular Expression (RegEx) is a pattern used to:
- Search text
- Match text
- Replace text
- Validate text (email, phone, password, etc.)

In JavaScript, RegEx is written between / /
Example: /hello/
*/

// Two ways to create a RegEx
let regex1 = /hello/;                 // literal way (most common)
let regex2 = new RegExp("hello");     // constructor way

/*
=======================================================
2. BASIC REGEX METHODS IN JAVASCRIPT
=======================================================
*/

// test() → returns true or false
console.log(/hello/.test("hello world"));  // true
console.log(/hello/.test("hi world"));     // false

// match() → returns matched result or null
console.log("hello world".match(/hello/));

// search() → returns index of match or -1
console.log("hello world".search(/world/)); // 6

// replace() → replaces matched text
console.log("hello world".replace(/world/, "JavaScript"));

/*
=======================================================
3. FLAGS (MODIFIERS)
=======================================================

i → case-insensitive
g → global (all matches)
m → multiline
*/

console.log(/hello/i.test("HELLO"));     // true
console.log("ha ha ha".match(/ha/g));    // ["ha", "ha", "ha"]

/*
=======================================================
4. CHARACTER CLASSES
=======================================================
*/

// [abc] → any one of a, b, or c
console.log(/gr[ae]y/.test("gray")); // true
console.log(/gr[ae]y/.test("grey")); // true

// [a-z] → lowercase letters
console.log(/[a-z]/.test("Hello")); // true

// [A-Z] → uppercase letters
console.log(/[A-Z]/.test("hello")); // false

// [0-9] → digits
console.log(/[0-9]/.test("abc1")); // true

/*
=======================================================
5. PREDEFINED CHARACTER SETS
=======================================================
*/

console.log(/\d/.test("123"));     // digit (same as [0-9])
console.log(/\D/.test("abc"));     // non-digit
console.log(/\w/.test("abc_1"));   // word character (a-z, A-Z, 0-9, _)
console.log(/\W/.test("@#"));      // non-word character
console.log(/\s/.test(" "));       // whitespace
console.log(/\S/.test("a"));       // non-whitespace

/*
=======================================================
6. QUANTIFIERS
=======================================================
*/
console.log("quantifiers");
console.log(/a+/.test("aaa"));     // one or more
console.log(/a*/.test("bbb"));     // zero or more
console.log(/a?/.test("bbb"));     // zero or one

console.log(/a{3}/.test("aaa"));   // exactly 3
console.log(/a{2,4}/.test("aaa")); // 2 to 4 times
console.log(/a{2,}/.test("aaaa")); // 2 or more

/*
=======================================================
7. ANCHORS (POSITION)
=======================================================
*/

console.log(/^hello/.test("hello world")); // starts with
console.log(/world$/.test("hello world")); // ends with

/*
=======================================================
8. GROUPS & ALTERNATION
=======================================================
*/

// () → group
console.log(/(hi|hello)/.test("hello there")); // true

// | → OR
console.log(/cat|dog/.test("I have a dog")); // true

/*
=======================================================
9. ESCAPING SPECIAL CHARACTERS
=======================================================
*/

console.log(/\./.test("file.txt"));  // matches dot
console.log(/\$/.test("Price $100"));// matches dollar sign

/*
=======================================================
10. GREEDY vs LAZY
=======================================================
*/

let text = "<b>Hello</b><b>World</b>";

// Greedy (takes maximum)
console.log(text.match(/<b>.*<\/b>/));

// Lazy (takes minimum)
console.log(text.match(/<b>.*?<\/b>/g));

/*
=======================================================
11. LOOKAHEAD & LOOKBEHIND
=======================================================
*/

// Positive lookahead (?=...)
console.log(/\d(?=px)/.test("10px")); // digit followed by px

// Negative lookahead (?!...)
console.log(/\d(?!px)/.test("10em")); // digit NOT followed by px

/*
=======================================================
12. COMMON VALIDATION EXAMPLES
=======================================================
*/

// Email validation
let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
console.log(emailRegex.test("test@gmail.com")); // true

// Phone number (Indian example)
let phoneRegex = /^[6-9]\d{9}$/;
console.log(phoneRegex.test("9876543210")); // true

// Password: min 8 chars, one letter, one number
let passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
console.log(passwordRegex.test("pass1234")); // true

/*
=======================================================
13. SPLIT USING REGEX
=======================================================
*/

console.log("apple, banana; orange".split(/[,;]\s*/));

/*
=======================================================
14. REAL-WORLD USE CASE
=======================================================
*/

// Remove all extra spaces
let messyText = "Hello     World    JS";
console.log(messyText.replace(/\s+/g, " "));

/*
=======================================================
END OF REGEX GUIDE
=======================================================

If you understand this file, you understand:
✔ 80–90% of JavaScript Regular Expressions
✔ Enough for interviews, validation, and real projects
*/
