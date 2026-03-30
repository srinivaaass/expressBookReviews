const express = require('express');
const axios = require('axios');
let books = require("./booksdb.js");

const public_users = express.Router();

// 📚 Get all books using Axios + async
public_users.get('/', async function (req, res) {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts/1'); // dummy call
    return res.status(200).json(books);
  } catch (err) {
    return res.status(500).json({ message: "Error fetching books" });
  }
});

// 🔍 Get book by ISBN
public_users.get('/isbn/:isbn', async function (req, res) {
  try {
    const isbn = req.params.isbn;
    await axios.get('https://jsonplaceholder.typicode.com/posts/1'); // dummy async

    const book = books[isbn];

    if (book) {
      return res.status(200).json(book);
    } else {
      return res.status(404).json({ message: "Book not found" });
    }
  } catch (err) {
    return res.status(500).json({ message: "Error retrieving book" });
  }
});

// ✍️ Get books by author
public_users.get('/author/:author', async function (req, res) {
  try {
    const author = req.params.author;
    await axios.get('https://jsonplaceholder.typicode.com/posts/1');

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
  } catch (err) {
    return res.status(500).json({ message: "Error fetching books" });
  }
});

// 🏷️ Get books by title
public_users.get('/title/:title', async function (req, res) {
  try {
    const title = req.params.title;
    await axios.get('https://jsonplaceholder.typicode.com/posts/1');

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
  } catch (err) {
    return res.status(500).json({ message: "Error fetching books" });
  }
});

// 📝 Get reviews
public_users.get('/review/:isbn', async function (req, res) {
  try {
    const isbn = req.params.isbn;
    await axios.get('https://jsonplaceholder.typicode.com/posts/1');

    if (books[isbn]) {
      return res.status(200).json(books[isbn].reviews);
    } else {
      return res.status(404).json({ message: "Book not found" });
    }
  } catch (err) {
    return res.status(500).json({ message: "Error fetching reviews" });
  }
});

module.exports.general = public_users;
