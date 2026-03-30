const express = require('express');
const axios = require('axios');
let books = require("./booksdb.js");

const public_users = express.Router();

const BASE_URL = "http://localhost:5000";

// 📚 Get all books (async)
public_users.get('/', async function (req, res) {
  try {
    const response = await axios.get(BASE_URL);
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching books" });
  }
});

// 🔍 Get book by ISBN (async)
public_users.get('/isbn/:isbn', async function (req, res) {
  const isbn = req.params.isbn;

  try {
    const response = await axios.get(`${BASE_URL}/isbn/${isbn}`);
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(404).json({ message: "Book not found" });
  }
});

// ✍️ Get books by author (async)
public_users.get('/author/:author', async function (req, res) {
  const author = req.params.author;

  try {
    const response = await axios.get(`${BASE_URL}/author/${author}`);
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(404).json({ message: "No books found for this author" });
  }
});

// 🏷️ Get books by title (async)
public_users.get('/title/:title', async function (req, res) {
  const title = req.params.title;

  try {
    const response = await axios.get(`${BASE_URL}/title/${title}`);
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(404).json({ message: "No books found with this title" });
  }
});

// 📝 Get reviews (kept simple)
public_users.get('/review/:isbn', function (req, res) {
  const isbn = req.params.isbn;

  if (books[isbn]) {
    return res.status(200).json(books[isbn].reviews);
  } else {
    return res.status(404).json({ message: "Book not found" });
  }
});

module.exports.general = public_users;
