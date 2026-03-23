const fibonacci = (num) => {
    if (num === 0) {
        return 0;
    }
    if (num === 1) {
        return 1;
    }
    return fibonacci(num - 1) + fibonacci(num - 2);
}

let val = 10;
for (let i = 0; i < val; i++) {
    console.log(fibonacci(i));
}

console.log("Using memo")
const fib = (n, memo = {}) => {
    if (n in memo) return memo[n];
    if (n <= 1) return n;

    memo[n] = fib(n - 1, memo) + fib(n - 2, memo);
    return memo[n];
};

for (let i = 0; i < val; i++) {
     console.log(fib(i));
}

//process.stdout.write