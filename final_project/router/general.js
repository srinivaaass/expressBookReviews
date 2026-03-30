const express = require('express');
const axios = require('axios');
let books = require("./booksdb.js");

const public_users = express.Router();

//  Get all books using Promise
public_users.get('/', function (req, res) {
  return new Promise((resolve, reject) => {
    resolve(books);
  })
    .then((data) => res.status(200).json(data))
    .catch(() => res.status(500).json({ message: "Error fetching books" }));
});

// Get book by ISBN using async/await
public_users.get('/isbn/:isbn', async function (req, res) {
  const isbn = req.params.isbn;

  try {
    const book = books[isbn];
    if (book) {
      return res.status(200).json(book);
    } else {
      return res.status(404).json({ message: "Book not found" });
    }
  } catch {
    return res.status(500).json({ message: "Error retrieving book" });
  }
});

// Get books by author using async/await
public_users.get('/author/:author', async function (req, res) {
  const author = req.params.author;
  let result = {};

  try {
    Object.keys(books).forEach((key) => {
      if (books[key].author === author) {
        result[key] = books[key];
      }
    });

    if (Object.keys(result).length > 0) {
      return res.status(200).json(result);
    } else {
      return res.status(404).json({ message: "No books found for this author" });
    }
  } catch {
    return res.status(500).json({ message: "Error fetching books" });
  }
});

// Get books by title using async/await
public_users.get('/title/:title', async function (req, res) {
  const title = req.params.title;
  let result = {};

  try {
    Object.keys(books).forEach((key) => {
      if (books[key].title === title) {
        result[key] = books[key];
      }
    });

    if (Object.keys(result).length > 0) {
      return res.status(200).json(result);
    } else {
      return res.status(404).json({ message: "No books found with this title" });
    }
  } catch {
    return res.status(500).json({ message: "Error fetching books" });
  }
});

//  Get reviews
public_users.get('/review/:isbn', function (req, res) {
  const isbn = req.params.isbn;

  if (books[isbn]) {
    return res.status(200).json(books[isbn].reviews);
  } else {
    return res.status(404).json({ message: "Book not found" });
  }
});

module.exports.general = public_users;
