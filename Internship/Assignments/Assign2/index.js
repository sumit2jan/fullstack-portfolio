$(document).ready(function(){

const users = [
  { name: "Sumit", email: "sumit@gmail.com", age: 22 },
  { name: "Amit", email: "amit@gmail.com", age: 23 },
  { name: "Riya", email: "riya@gmail.com", age: 21 },
  { name: "Neha", email: "neha@gmail.com", age: 25 },
  { name: "Rahul", email: "rahul@gmail.com", age: 24 },
  { name: "Priya", email: "priya@gmail.com", age: 22 },
  { name: "Ankit", email: "ankit@gmail.com", age: 26 },
  { name: "Sneha", email: "sneha@gmail.com", age: 23 },
  { name: "Vikas", email: "vikas@gmail.com", age: 27 },
  { name: "Pooja", email: "pooja@gmail.com", age: 24 },

  { name: "Sumit", email: "sumit.work@gmail.com", age: 24 },
  { name: "Amit", email: "amit.dev@gmail.com", age: 28 },
  { name: "Riya", email: "riya.office@gmail.com", age: 22 },
  { name: "Neha", email: "neha123@gmail.com", age: 26 },
  { name: "Rahul", email: "rahul.k@gmail.com", age: 25 },

  { name: "Karan", email: "karan@gmail.com", age: 23 },
  { name: "Nikhil", email: "nikhil@gmail.com", age: 24 },
  { name: "Shreya", email: "shreya@gmail.com", age: 21 },
  { name: "Manish", email: "manish@gmail.com", age: 29 },
  { name: "Alok", email: "alok@gmail.com", age: 27 },

  { name: "Tanya", email: "tanya@gmail.com", age: 22 },
  { name: "Rohit", email: "rohit@gmail.com", age: 26 },
  { name: "Isha", email: "isha@gmail.com", age: 23 },
  { name: "Sahil", email: "sahil@gmail.com", age: 24 },
  { name: "Mehul", email: "mehul@gmail.com", age: 28 },

  { name: "Deepak", email: "deepak@gmail.com", age: 30 },
  { name: "Aarti", email: "aarti@gmail.com", age: 21 },
  { name: "Varun", email: "varun@gmail.com", age: 25 },
  { name: "Nisha", email: "nisha@gmail.com", age: 24 },
  { name: "Harsh", email: "harsh@gmail.com", age: 27 }
];


const searchInput = $("#Input");
const searchBtn = $("#Btn");
const resultsDiv = $("#Result");

//console.log(searchInput.length);
//console.log(searchBtn.length);
//console.log(resultsDiv.length);

searchBtn.on("click",function(){
    //resultsDiv.text("Hello world!");
    const searchValue = searchInput.val().toLowerCase();

    if (searchValue === "") {
     resultsDiv.html("<p>Please enter something to search!</p>"); 
     return;
    }

    const filteredUsers = users.filter(user => {

    if (!isNaN(searchValue)) {
        return user.age.toString() === searchValue;
        }
     return (
     user.name.toLowerCase().startsWith(searchValue) ||
     user.email.toLowerCase().includes(searchValue)
    );
  });
  displayUsers(filteredUsers);
})

function displayUsers(userList){
  resultsDiv.html("");

  if(userList.length == 0){
    resultsDiv.html("<p>No Result Found</p>");
    return;
} 
   userList.forEach(user => {
    const div = $("<div>");
    div.addClass("card");

    div.html(`
    <p><strong>Name:</strong> ${user.name}</p>
    <p><strong>Email:</strong> ${user.email}</p>
    <p><strong>Age:</strong> ${user.age}</p>
    `);
    resultsDiv.append(div);
    });
}
});