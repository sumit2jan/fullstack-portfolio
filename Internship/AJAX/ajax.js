/*
  STEP 1: What is AJAX?
  --------------------
  AJAX = Asynchronous JavaScript And XML

  It allows JavaScript to:
  - Send requests to the server
  - Receive data from the server
  - Update the page WITHOUT reloading
*/

/*
  STEP 2: User Action Simulation
  ------------------------------
  Imagine this function runs when
  a button is clicked
*/
function loadUsers() {

  /*
    STEP 3: Create XMLHttpRequest object
    ------------------------------------
    This object is used to communicate
    with the server asynchronously
  */
  const xhr = new XMLHttpRequest();

  /*
    STEP 4: Configure the request
    ------------------------------
    open(method, url, async)
    async = true → non-blocking
  */
  xhr.open("GET", "https://jsonplaceholder.typicode.com/users", true);

  /*
    STEP 5: What happens when response comes?
    -----------------------------------------
    onload fires when request is completed
  */
  xhr.onload = function () {

    /*
      HTTP Status Codes:
      200 → OK
      404 → Not Found
      500 → Server Error
    */
    if (xhr.status === 200) {

      /*
        STEP 6: Response is JSON STRING
        --------------------------------
        Convert JSON → JS Object
      */
      const users = JSON.parse(xhr.responseText);

      console.log("Users received from server:", users);

      /*
        STEP 7: Use the data (DOM update simulation)
        ---------------------------------------------
        No page reload happens here
      */
      users.forEach(user => {
        console.log("User Name:", user.name);
      });

    } else {
      console.log("Error: Request failed");
    }
  };

  /*
    STEP 8: Handle network errors
    -----------------------------
  */
  xhr.onerror = function () {
    console.log("Network Error");
  };

  /*
    STEP 9: Send the request
    ------------------------
    Request is sent to the server
  */
  xhr.send();
}

/*
  STEP 10: Call the function
  --------------------------
*/
loadUsers();

/*
  STEP 11: Why AJAX is asynchronous?
  ----------------------------------
  JavaScript continues execution
  while the request runs in background
*/
console.log("This runs BEFORE server response");

/*
  STEP 12: Modern AJAX (Fetch API)
  --------------------------------
  This is how AJAX is done today
*/

async function loadUsersModern() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");

    /*
      response.json() also works asynchronously
    */
    const data = await response.json();

    console.log("Users using Fetch:", data);

  } catch (error) {
    console.log("Error:", error);
  }
}

loadUsersModern();

/*
  FINAL SUMMARY:
  --------------
  - AJAX allows server communication without reload
  - XMLHttpRequest is classic AJAX
  - Fetch API is modern AJAX
  - AJAX uses JSON for data exchange
  - Asynchronous = non-blocking execution
*/
