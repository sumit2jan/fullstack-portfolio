// ==========================================
// 1. THE PROMISE MAKER (The Producer)
// ==========================================
function downloadFilePromise(fileName) {
    // We return a "new Promise" immediately.
    // The Promise takes a function with two special triggers: 'resolve' and 'reject'
    return new Promise((resolve, reject) => {
        
        console.log(`[System] Searching for ${fileName}...`);

        // Simulating a 2-second internet delay
        setTimeout(() => {
            
            // Let's pretend there's a 20% chance the download fails (random error)
            const isNetworkWorking = Math.random() > 0.2; 

            if (isNetworkWorking) {
                // SUCCESS SCENARIO:
                // We call 'resolve' to fulfill the promise. 
                // Whatever we pass here goes to .then()
                const data = "Content of " + fileName;
                resolve(data); 

            } else {
                // FAILURE SCENARIO:
                // We call 'reject' to break the promise.
                // Whatever we pass here goes to .catch()
                reject("Network Error: Could not download file.");
            }

        }, 2000);
    });
}

// ==========================================
// 2. THE PROMISE RECEIVER (The Consumer)
// ==========================================

console.log("1. Clicked Download");

// We call the function, which returns the Promise object.
// We typically chain .then() and .catch() directly to it.
downloadFilePromise("mario-kart.zip")
    .then((downloadedData) => {
        // .then() ONLY runs if resolve() was called
        console.log("[Success] File received!");
        console.log("[Success] Data: " + downloadedData);
    })
    .catch((errorMessage) => {
        // .catch() ONLY runs if reject() was called
        console.log("[Error] Something went wrong.");
        console.log("[Error] Reason: " + errorMessage);
    })
    .finally(() => {
        // .finally() runs at the end, no matter what (Success OR Fail)
        // Great for hiding loading spinners
        console.log("[System] Operation finished. Loading spinner hidden.");
    });

console.log("2. Page continues to be responsive...");