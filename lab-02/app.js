const express = require("express");
const path = require("path");
const sqlite3 = require("sqlite3");
const { open } = require("sqlite");

const app = express();
app.use(express.json());

const databasePath = path.join(__dirname, "books.db");
let db;

// Open the database first, then start the server.
async function initializeDBAndServer() {
  try {
    db = await open({
      filename: databasePath,
      driver: sqlite3.Database,
    });

    app.listen(3000, () => {
      console.log("Server running at http://localhost:3000/");
    });
  } catch (error) {
    console.error(`Database connection failed: ${error.message}`);
    process.exit(1);
  }
}

// GET all books
app.get("/books/", async (request, response) => {
  try {
    const books = await db.all("SELECT * FROM book ORDER BY id");
    response.status(200).send(books);
  } catch (error) {
    response.status(500).send({ error: "Unable to retrieve books" });
  }
});

// GET one book
app.get("/books/:bookId/", async (request, response) => {
  try {
    const { bookId } = request.params;
    const book = await db.get("SELECT * FROM book WHERE id = ?", [bookId]);
    if (!book) return response.status(404).send({ error: "Book not found" });
    response.status(200).send(book);
  } catch (error) {
    response.status(500).send({ error: "Unable to retrieve book" });
  }
});

// POST a book
app.post("/books/", async (request, response) => {
  try {
    const { title, author, price, pages } = request.body;
    if (!title || !author || price === undefined || pages === undefined) {
      return response.status(400).send({ error: "title, author, price and pages are required" });
    }

    const result = await db.run(
      "INSERT INTO book (title, author, price, pages) VALUES (?, ?, ?, ?)",
      [title, author, price, pages]
    );
    response.status(201).send({ message: "Book added successfully", bookId: result.lastID });
  } catch (error) {
    response.status(500).send({ error: "Unable to add book" });
  }
});

// PUT update a book
app.put("/books/:bookId/", async (request, response) => {
  try {
    const { bookId } = request.params;
    const { title, author, price, pages } = request.body;
    if (!title || !author || price === undefined || pages === undefined) {
      return response.status(400).send({ error: "title, author, price and pages are required" });
    }

    const result = await db.run(
      "UPDATE book SET title = ?, author = ?, price = ?, pages = ? WHERE id = ?",
      [title, author, price, pages, bookId]
    );
    if (result.changes === 0) return response.status(404).send({ error: "Book not found" });
    response.status(200).send({ message: "Book updated successfully" });
  } catch (error) {
    response.status(500).send({ error: "Unable to update book" });
  }
});

// DELETE a book
app.delete("/books/:bookId/", async (request, response) => {
  try {
    const { bookId } = request.params;
    const result = await db.run("DELETE FROM book WHERE id = ?", [bookId]);
    if (result.changes === 0) return response.status(404).send({ error: "Book not found" });
    response.status(200).send({ message: "Book deleted successfully" });
  } catch (error) {
    response.status(500).send({ error: "Unable to delete book" });
  }
});

initializeDBAndServer();
