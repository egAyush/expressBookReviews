const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();





const doesExist=(username)=>{
  let userWithSameName=users.filter((user)=>{
    return user.username==username;
  })

  if (userWithSameName.length>0) {
    return true;
  } else {
    return false;
  }
}

public_users.post("/register", (req,res) => {
  //Write your code here

  const username=req.body.username;
  const password=req.body.password;

  if(username && password){
    if(!doesExist(username)){
      users.push({"username" : username, "password":password});
      return res.status(200).json({message:"User Successfully registered."});
    }else{
      return res.status(404).json({message:"User already exist!"});
    }
  }

  return res.status(404).json({message: "Unable to register user."});
});



function fetchbook(){
  return new Promise ((resolve, reject)=>{
      setTimeout(()=>{
          if(books){
            resolve(books);
          }else{
            reject(
              "No book found"
            );
          }
      },1000)
  })
}

// Get the book list available in the shop
public_users.get('/',function (req, res) {

  fetchbook()
  .then((books)=>{
    res.send(JSON.stringify(books,null,4));

  }).catch((err)=>{
    res.status(500).send(err);
  })


  // //Write your code here
  //  res.send(JSON.stringify(books,null,4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const isbn=req.params.isbn;

  // With promiseK
  fetchbook()
  .then((books)=>{
    res.send(books[isbn])
  })
  .catch((err)=>{
    res.status(500).send(err);
  })



  // res.send(books[isbn]);
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {

  const author=req.params.author; 

  // With promise
  fetchbook()
  .then((books)=>{
    for (const key of Object.keys(books) ){
      let obj=books[key];
      if (obj['author']===author) {
        res.send(JSON.stringify(obj,null,4));
        return;
      } 
    }
    return res.status(400).json({message:"Not avilable"});

  })
  .catch((err)=>{
    res.status(500).send(err);
  })


  // With express
  // for (const key of Object.keys(books) ){
  //   let obj=books[key];
  //   if (obj['author']===author) {
  //     res.send(JSON.stringify(obj,null,4));
  //     return;
  //   } 
  // }

  // return res.status(400).json({message:"Not avilable"});
 
  //Write your code here
  
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here

  const title=req.params.title;

  // with promise

  fetchbook()
  .then((books)=>{

    for (const key of Object.keys(books)) {

      let obj=books[key];
      if(obj['title']===title){
        res.send(JSON.stringify(obj,null,4));
        return;
      }
      
    }
    return res.status(300).json({message: "This name book isn't available"});
  }).catch((err)=>{
    res.status(500).send(err);
  })

  // with express
  // for (const key of Object.keys(books)) {

  //   let obj=books[key];
  //   if(obj['title']===title){
  //     res.send(JSON.stringify(obj,null,4));
  //     return;
  //   }
    
  // }
  // return res.status(300).json({message: "This name book isn't available"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here

  const isbn=req.params.isbn;
  let obj=books[isbn];
  res.send(obj["reviews"])
  
});

module.exports.general = public_users;
