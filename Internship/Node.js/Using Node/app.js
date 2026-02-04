// const http = require("http");

// const server = http.createServer((req, res) => {
//   res.write("Hello Server from Node.js");
//   res.end();
// });

// server.listen(3000, () => {
//   console.log("Server running on port 3000");
// });


const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Welcome to Express 🚀");
});

app.get("/about", (req, res) => {
  res.send("My Name Is Sumit Singh And Hello From My Side!");
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
