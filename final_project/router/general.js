const express = require('express');
const axios = require('axios');
let books = require("./booksdb.js");

const public_users = express.Router();

// 📚 Get all books
public_users.get('/', function (req, res) {
  axios.get('https://jsonplaceholder.typicode.com/posts/1')
    .then(() => {
      return res.status(200).json(books);
    })
    .catch(() => {
      return res.status(500).json({ message: "Error fetching books" });
    });
});

// 🔍 Get book by ISBN
public_users.get('/isbn/:isbn', function (req, res) {
  const isbn = req.params.isbn;

  axios.get('https://jsonplaceholder.typicode.com/posts/1')
    .then(() => {
      const book = books[isbn];

      if (book) {
        return res.status(200).json(book);
      } else {
        return res.status(404).json({ message: "Book not found" });
      }
    })
    .catch(() => {
      return res.status(500).json({ message: "Error retrieving book" });
    });
});

// ✍️ Get books by author
public_users.get('/author/:author', function (req, res) {
  const author = req.params.author;

  axios.get('https://jsonplaceholder.typicode.com/posts/1')
    .then(() => {
      let result = {};

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
    })
    .catch(() => {
      return res.status(500).json({ message: "Error fetching books" });
    });
});

// 🏷️ Get books by title
public_users.get('/title/:title', function (req, res) {
  const title = req.params.title;

  axios.get('https://jsonplaceholder.typicode.com/posts/1')
    .then(() => {
      let result = {};

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
    })
    .catch(() => {
      return res.status(500).json({ message: "Error fetching books" });
    });
});

// 📝 Get reviews
public_users.get('/review/:isbn', function (req, res) {
  const isbn = req.params.isbn;

  axios.get('https://jsonplaceholder.typicode.com/posts/1')
    .then(() => {
      if (books[isbn]) {
        return res.status(200).json(books[isbn].reviews);
      } else {
        return res.status(404).json({ message: "Book not found" });
      }
    })
    .catch(() => {
      return res.status(500).json({ message: "Error fetching reviews" });
    });
});

module.exports.general = public_users;
