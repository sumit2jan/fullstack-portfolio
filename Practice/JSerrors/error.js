// Errors in JS

// Refference Errors
let x = 5;
try{
    x = s +1;
}catch(err)
{
    let text =  err.name +" "+err.message;
    console.log(text);
}finally{ 
    console.log("This is going to be always executed in the code")
}

/*
=========================================================
1. WHAT IS AN ERROR IN JAVASCRIPT?
=========================================================

An error is a problem that stops JavaScript from running
correctly.

JavaScript errors are mainly of two types:
1️⃣ Syntax Errors   → code is written incorrectly
2️⃣ Runtime Errors  → code is correct, but fails while running
*/

/*
=========================================================
2. SYNTAX ERROR
=========================================================

Happens when JavaScript cannot understand the code.
The program will NOT run at all.
*/

// ❌ Example (DON'T RUN – will crash)
/*
console.log("Hello World);
*/

// ✅ Correct
console.log("Hello World");

/*
Common Syntax Errors:
- Missing quotes
- Missing brackets
- Extra commas
- Wrong keywords
*/

/*
=========================================================
3. REFERENCE ERROR
=========================================================

Happens when you use a variable that does not exist.
*/

try {
    console.log(myName); // ❌ variable not declared
} catch (error) {
    console.log("ReferenceError:", error.message);
}

/*
=========================================================
4. TYPE ERROR
=========================================================

Happens when a value is not of the expected type.
*/

try {
    let num = 10;
    num(); // ❌ number is not a function
} catch (error) {
    console.log("TypeError:", error.message);
}

/*
=========================================================
5. RANGE ERROR
=========================================================

Happens when a value is outside the allowed range.
*/

try {
    let arr = new Array(-1); // ❌ invalid array length
} catch (error) {
    console.log("RangeError:", error.message);
}

/*
=========================================================
6. URI ERROR
=========================================================

Happens when URI functions are used incorrectly.
*/

try {
    decodeURI("%"); // ❌ invalid URI
} catch (error) {
    console.log("URIError:", error.message);
}

/*
=========================================================
7. EVAL ERROR (RARE / OLD)
=========================================================

Related to eval(). Mostly not used in modern JS.
*/

try {
    eval("var a = ;"); // ❌ invalid JS inside eval
} catch (error) {
    console.log("EvalError or SyntaxError:", error.message);
}

/*
=========================================================
8. CUSTOM ERRORS
=========================================================

You can create your own errors using Error().
*/

function withdraw(amount) {
    if (amount <= 0) {
        throw new Error("Amount must be greater than zero");
    }
    console.log("Withdrawal successful:", amount);
}

try {
    withdraw(-100);
} catch (error) {
    console.log("Custom Error:", error.message);
}

/*
=========================================================
9. TRY - CATCH - FINALLY
=========================================================

Used to HANDLE errors so the program doesn't crash.
*/

try {
    let x = y + 10; // ❌ y not defined
} catch (error) {
    console.log("Caught Error:", error.message);
} finally {
    console.log("This always runs (cleanup code)");
}

/*
=========================================================
10. THROWING DIFFERENT ERROR TYPES
=========================================================
*/

function checkAge(age) {
    if (typeof age !== "number") {
        throw new TypeError("Age must be a number");
    }
    if (age < 18) {
        throw new RangeError("Age must be 18 or above");
    }
    return "Access granted";
}

try {
    console.log(checkAge("20"));
} catch (error) {
    console.log(error.name + ":", error.message);
}

/*
=========================================================
11. ERROR OBJECT PROPERTIES
=========================================================
*/

try {
    undefinedFunction();
} catch (error) {
    console.log("Name:", error.name);
    console.log("Message:", error.message);
    console.log("Stack Trace:", error.stack);
}

/*
=========================================================
12. COMMON REAL-WORLD ERRORS
=========================================================
*/

// ❌ Accessing property of undefined
try {
    let user = {};
    console.log(user.name.length);
} catch (error) {
    console.log("Error:", error.message);
}

// ❌ JSON parsing error
try {
    JSON.parse("{name: 'Sumit'}");
} catch (error) {
    console.log("JSON Error:", error.message);
}

/*
=========================================================
13. HOW TO AVOID ERRORS (BEST PRACTICES)
=========================================================

✔ Always validate inputs
✔ Use try-catch for risky code
✔ Use strict mode
✔ Check null / undefined
✔ Read error messages carefully
*/

"use strict";

/*
=========================================================
14. FINAL SUMMARY
=========================================================

JavaScript Error Types:
✔ SyntaxError
✔ ReferenceError
✔ TypeError
✔ RangeError
✔ URIError
✔ EvalError (rare)
✔ Custom Error

Error Handling Tools:
✔ try
✔ catch
✔ finally
✔ throw
✔ Error object

If you understand this file,
you can confidently debug JavaScript code.
=========================================================
*/
