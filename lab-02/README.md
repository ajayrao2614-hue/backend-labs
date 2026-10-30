# Lab 2: SQLite database and CRUD routes

**Name:** B.Ajay
**Registration number:** 252U1R9020  
**Section:** CSE GEN AI (304)

## Objective
Connect an Express server to SQLite and provide CRUD operations for books.

## How to install and run
1. Install Node.js.
2. Open this folder in VS Code.
3. Install packages:
   ```bash
   npm install
   ```
4. Start with automatic restart:
   ```bash
   npm run dev
   ```
5. Server URL: `http://localhost:3000`

No environment variables are required for this lab.

## Endpoints

| Method | Path | Description |
|---|---|---|
| GET | `/books/` | Get all books |
| GET | `/books/:bookId/` | Get one book by ID |
| POST | `/books/` | Add a new book |
| PUT | `/books/:bookId/` | Update a book |
| DELETE | `/books/:bookId/` | Delete a book |

### Example POST/PUT JSON
```json
{
  "title": "The Alchemist",
  "author": "Paulo Coelho",
  "price": 350,
  "pages": 208
}
```

## Database
The `books.db` file contains the `book` table and 10 sample rows. The database is created and opened before the server starts.

## Screenshots
Add Postman screenshots in the `screenshots/` folder and embed them here, for example:
`![GET all books](screenshots/get-all-books.png)`

## Notes
- All user-supplied values are passed through `?` placeholders.
- `node_modules` and `.env` must not be committed.
- Test all five endpoints in Postman.
- Add your own name, registration number, section, live link (if deployed), and screenshots before submission.
