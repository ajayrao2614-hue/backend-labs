const express = require("express");
const db = require("./db");

const app = express();
app.use(express.json());

function sendDbError(res, error) {
  console.error(error.message);
  return res.status(500).json({ message: "Internal server error" });
}

// GET /books/?search_q=...&order_by=title&order=ASC&limit=10&offset=0&min_price=100&max_price=500
app.get("/books/", (req, res) => {
  const {
    search_q = "",
    order_by = "id",
    order = "ASC",
    limit = "10",
    offset = "0",
    min_price,
    max_price
  } = req.query;

  const allowedColumns = ["id", "title", "author", "price"];
  const sortColumn = allowedColumns.includes(order_by) ? order_by : "id";
  const sortOrder = String(order).toUpperCase() === "DESC" ? "DESC" : "ASC";

  const parsedLimit = Number.parseInt(limit, 10);
  const parsedOffset = Number.parseInt(offset, 10);
  if (!Number.isInteger(parsedLimit) || parsedLimit < 1 ||
      !Number.isInteger(parsedOffset) || parsedOffset < 0) {
    return res.status(400).json({ message: "limit must be a positive integer and offset must be a non-negative integer" });
  }

  const conditions = [];
  const params = [];

  if (search_q) {
    conditions.push("title LIKE ?");
    params.push(`%${search_q}%`);
  }
  if (min_price !== undefined) {
    const value = Number(min_price);
    if (!Number.isFinite(value)) return res.status(400).json({ message: "min_price must be numeric" });
    conditions.push("price >= ?");
    params.push(value);
  }
  if (max_price !== undefined) {
    const value = Number(max_price);
    if (!Number.isFinite(value)) return res.status(400).json({ message: "max_price must be numeric" });
    conditions.push("price <= ?");
    params.push(value);
  }
  if (min_price !== undefined && max_price !== undefined &&
      Number(min_price) > Number(max_price)) {
    return res.status(400).json({ message: "min_price cannot be greater than max_price" });
  }

  const whereClause = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";
  const sql = `SELECT * FROM books ${whereClause} ORDER BY ${sortColumn} ${sortOrder} LIMIT ? OFFSET ?`;
  params.push(parsedLimit, parsedOffset);

  db.all(sql, params, (error, rows) => {
    if (error) return sendDbError(res, error);
    return res.status(200).json(rows);
  });
});

// GET /books/:bookId/
app.get("/books/:bookId/", (req, res) => {
  db.get("SELECT * FROM books WHERE id = ?", [req.params.bookId], (error, book) => {
    if (error) return sendDbError(res, error);
    if (!book) return res.status(404).json({ message: "Book not found" });
    return res.status(200).json(book);
  });
});

// POST /books/
app.post("/books/", (req, res) => {
  const { title, author, price } = req.body;
  if (typeof title !== "string" || !title.trim() ||
      typeof author !== "string" || !author.trim() ||
      price === undefined || price === null || price === "" ||
      !Number.isFinite(Number(price))) {
    return res.status(400).json({ message: "title, author and a numeric price are required" });
  }

  db.run(
    "INSERT INTO books (title, author, price) VALUES (?, ?, ?)",
    [title.trim(), author.trim(), Number(price)],
    function (error) {
      if (error) return sendDbError(res, error);
      return res.status(201).json({ message: "Book created successfully", bookId: this.lastID });
    }
  );
});

// PUT /books/:bookId/
app.put("/books/:bookId/", (req, res) => {
  const { title, author, price } = req.body;
  if (typeof title !== "string" || !title.trim() ||
      typeof author !== "string" || !author.trim() ||
      price === undefined || price === null || price === "" ||
      !Number.isFinite(Number(price))) {
    return res.status(400).json({ message: "title, author and a numeric price are required" });
  }

  db.run(
    "UPDATE books SET title = ?, author = ?, price = ? WHERE id = ?",
    [title.trim(), author.trim(), Number(price), req.params.bookId],
    function (error) {
      if (error) return sendDbError(res, error);
      if (this.changes === 0) return res.status(404).json({ message: "Book not found" });
      return res.status(200).json({ message: "Book updated successfully" });
    }
  );
});

// DELETE /books/:bookId/
app.delete("/books/:bookId/", (req, res) => {
  db.run("DELETE FROM books WHERE id = ?", [req.params.bookId], function (error) {
    if (error) return sendDbError(res, error);
    if (this.changes === 0) return res.status(404).json({ message: "Book not found" });
    return res.status(200).json({ message: "Book deleted successfully" });
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
