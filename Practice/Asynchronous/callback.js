//Asynchronous JavaScript allows JavaScript to start a task, move on to other work, and come back later when that task is finished.

//CallBacks
/* SCENARIO: 
   We want to download a file from the internet. 
   Since this takes time, we don't want to freeze the program.
   We use a CALLBACK to say: "Run this code only AFTER the download finishes."
*/

// ==========================================
// 1. THE PARENT FUNCTION (The "Higher-Order Function")
// ==========================================
function downloadFile(fileName, callbackFunction) {
    console.log(`[System] Starting download for: ${fileName}...`);

    // We use setTimeout to simulate a 3-second delay (like a slow internet connection)
    setTimeout(() => {
        // This part runs after 3 seconds
        const fakeDownloadedData = "This is the content of " + fileName;
        console.log(`[System] Download complete!`);

        // ➤ THIS IS THE KEY MOMENT:
        // We execute the function that was passed in.
        // We also pass the 'fakeDownloadedData' BACK to that function.
        callbackFunction(fakeDownloadedData);

    }, 3000); // 3000 milliseconds = 3 seconds
}

// ==========================================
// 2. THE CALLBACK FUNCTION (The "Action")
// ==========================================
function processFile(data) {
    console.log("--------------------------------");
    console.log("[Callback] logic started!");
    console.log("[Callback] Processing data: " + data);
    console.log("[Callback] File saved to disk.");
    console.log("--------------------------------");
}

// ==========================================
// 3. EXECUTION
// ==========================================

console.log("1. User clicks download button");

// We pass 'processFile' just by its name. 
// NOTICE: We do NOT use processFile() with parenthesis. 
// We are passing the *concept* of the function, not running it yet.
downloadFile("super-cool-game.exe", processFile);

console.log("2. User continues scrolling (The code didn't freeze!)");