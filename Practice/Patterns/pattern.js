// right angled triangle without the repeat method.
let n = 5;
for (let i = 1; i <= n; i++) {
    let star = ""; 
    for (let j = 1; j <= i; j++) {
        star += "* "; 
    }
    console.log(star); 
}
// with the repeat method
console.log("With repeat method");
for(let i = 1; i<=n; i++){
    console.log("* ".repeat(i));
}

//Inverted
console.log("Inverted Triangle");
for (let i = n; i >=1; i--) {
    let star = ""; 
    for (let j = 1; j <= i; j++) {
        star += "* "; 
    }
    console.log(star); 
}

//Pyramid
console.log("Pyramids");
for(let i = 0; i<n; i++){
    let space = "";
    for(let j = n; j>i; j--){
        space += " ";
    }
    for (let k = 1; k <= 2 * i - 1; k++) {
        space += "*";
    }
    console.log(space);
}

//Inverted Pyramid
console.log("Inverted Pyramid");
for(let i = n; i>0; i--){
    let space = "";
    for(let j = n; j>i; j--){
        space += " ";
    }
    for (let k = 1; k <= 2 * i - 1; k++) {
        space += "*";
    }
    console.log(space);
}

//Rectangle
console.log("Rectangle");

for(let i = 0; i<=n; i++){
    let line = "";
    for(let j = 0; j<=9; j++){
        line += "* ";
    }
    console.log(line);
}

//Hollow Rectangle
console.log("Hollow Rectangle");
for (let i = 1; i <= n; i++) {
    let line = "";
        for (let j = 1; j < 9; j++) {
            if (i==1 || i==n || j==1 ||j==n) {
                    line += "* ";
            }else{
                   line+= "    ";
                }
            }
            console.log(line);
        }

// Numbers Triangle
console.log("Numbers triangle");
for (let i = 1; i <= n; i++) {
    let star = ""; 
    for (let j = 1; j <= i; j++) {
        star += j; 
    }
    console.log(star); 
}