# Lab 2: SQLite Database and CRUD Routes

**Name:** B. Ajay  
**Registration Number:** 252U1R9020  
**Section:** CSE GENAI 2A

---

## Objective

To connect an Express.js server with an SQLite database and implement CRUD (Create, Read, Update, Delete) operations for managing book records.

## Technologies Used

- Node.js
- Express.js
- SQLite
- JavaScript
- Postman
- VS Code

## Project Structure

```text
Lab-02-SQLite/
│
├── screenshots/
│   ├── get-all-books.png
│   ├── get-book-by-id.png
│   ├── post-add-book.png
│   ├── put-update-book.png
│   └── delete-book.png
│
├── books.db
├── package.json
├── package-lock.json
├── server.js
└── README.md
```

## How to Install and Run

### Step 1: Install Node.js

Download and install Node.js from:

https://nodejs.org/

### Step 2: Open the Project

Open the project folder in Visual Studio Code.

### Step 3: Install Dependencies

Open the terminal and execute:

```bash
npm install
```

### Step 4: Start the Server

Run the following command:

```bash
npm run dev
```

### Step 5: Open the Server

**Live Server URL:**

https://backend-labs-2-ditn.onrender.com/books

---

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/books/` | Get all books |
| GET | `/books/:bookId/` | Get a book by ID |
| POST | `/books/` | Add a new book |
| PUT | `/books/:bookId/` | Update a book |
| DELETE | `/books/:bookId/` | Delete a book |

## Postman Testing

### 1. GET - Retrieve All Books

**Endpoint:**
```http
GET /books/
```

**Screenshot:**

![GET All Books](screenshots/get-all-books.png)

### 2. GET - Retrieve Book by ID

**Endpoint:**
```http
GET /books/1/
```

**Screenshot:**

![GET Book by ID](screenshots/get-book-by-id.png)

### 3. POST - Add a New Book

**Endpoint:**
```http
POST /books/
```

**Request Body (JSON):**

```json
{
    "title": "The Alchemist",
    "author": "Paulo Coelho",
    "price": 350,
    "pages": 208
}
```

**Screenshot:**

![POST Add Book](screenshots/post-add-book.png)

### 4. PUT - Update an Existing Book

**Endpoint:**
```http
PUT /books/1/
```

**Request Body (JSON):**

```json
{
    "title": "The Alchemist",
    "author": "Paulo Coelho",
    "price": 400,
    "pages": 208
}
```

**Screenshot:**

![PUT Update Book](screenshots/put-update-book.png)

### 5. DELETE - Delete a Book

**Endpoint:**
```http
DELETE /books/1/
```

**Screenshot:**

![DELETE Book](screenshots/delete-book.png)

---

## Database Details

The project uses SQLite as its database.

- Database file: `books.db`
- Table name: `book`
- Sample records: 10 books
- The database is created and opened before the Express server starts.

## Important Notes

1. All user-supplied values are passed using SQL `?` placeholders.
2. The `node_modules` folder should not be committed to GitHub.
3. The `.env` file should not be committed.
4. All five CRUD endpoints should be tested using Postman.
5. Screenshots should be stored in the `screenshots` folder.
6. Use relative image paths to display screenshots in GitHub README.

## Learning Outcomes

- Learned how to connect SQLite with Node.js and Express.js.
- Understood database creation and table management.
- Implemented GET, POST, PUT, and DELETE operations.
- Practiced testing REST API endpoints using Postman.
- Understood parameterized SQL queries for safer database operations.

## Conclusion

Successfully implemented a SQLite database with an Express.js server and developed five CRUD API endpoints to manage book records. Tested the API operations using Postman and documented the project with screenshots.

---

**Project:** Lab 2 - SQLite Database and CRUD Routes  
**Student:** B. Ajay  
**Registration Number:** 252U1R9020  
**Section:** CSE GENAI 2A
