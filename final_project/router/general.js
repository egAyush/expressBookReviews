const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
   res.send(JSON.stringify(books,null,4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const isbn=req.params.isbn;
  res.send(books[isbn]);
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {

  const author=req.params.author;
  

  for (const key of Object.keys(books) ){
    let obj=books[key];
    if (obj['author']===author) {
      res.send(JSON.stringify(obj,null,4));
      return;
    } 
  }

  return res.status(400).json({message:"Not avilable"});
 
  //Write your code here
  
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here

  const title=req.params.title;

  for (const key of Object.keys(books)) {

    let obj=books[key];
    if(obj['title']===title){
      res.send(JSON.stringify(obj,null,4));
      return;
    }
    
  }
  return res.status(300).json({message: "This name book isn't available"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
