# Lab 3: REST API, query parameters, validation, debugging

**Name:** B. Ajay  
**Registration number:** 252U1R9020  
**Section:** CSE GENAI 2A

## Objective
Build a REST API using Express and SQLite with search, sorting, filtering, validation, correct HTTP status codes, and debugging practice.

## Install and run
```bash
npm install
npm run dev
```
No environment variables are required. The server uses port `3000` by default and accepts the `PORT` environment variable when deployed. The SQLite database and `books` table are created automatically.

## Live deployment
[https://backend-labs-3-u424.onrender.com](https://backend-labs-3-u424.onrender.com)

## Endpoints

| Method | Path | Description |
|---|---|---|
| GET | `/books/` | List books with search, sorting, pagination and price filters |
| GET | `/books/:bookId/` | Get one book by ID |
| POST | `/books/` | Create a book |
| PUT | `/books/:bookId/` | Update a book |
| DELETE | `/books/:bookId/` | Delete a book |

### GET query parameters
- `search_q`: partial title search
- `order_by`: `id`, `title`, `author`, or `price`
- `order`: `ASC` or `DESC`
- `limit`: number of rows (default `10`)
- `offset`: starting row (default `0`)
- `min_price`, `max_price`: optional price range

Example:
`GET /books/?search_q=java&order_by=price&order=DESC&limit=5&offset=0&min_price=100&max_price=800`

### POST /books/ request body
```json
{
  "title": "Learning Java",
  "author": "James",
  "price": 450
}
```

## Postman test checklist
- [ ] GET `/books/` returns a list (200).
- [ ] GET `/books/?search_q=java` filters titles (200).
- [ ] GET `/books/?order_by=price&order=DESC` sorts results (200).
- [ ] GET `/books/?min_price=100&max_price=500` filters by price (200).
- [ ] GET `/books/:bookId/` returns an existing book (200).
- [ ] GET `/books/99999/` returns 404 for a missing book.
- [ ] POST `/books/` with valid data returns 201.
- [ ] POST `/books/` with missing title/author or non-numeric price returns 400.
- [ ] PUT `/books/:bookId/` updates an existing book (200).
- [ ] DELETE `/books/:bookId/` deletes an existing book (200).
- [ ] PUT or DELETE with a missing ID returns 404.
- [ ] Invalid pagination or price values return 400.

## Debugging notes
- `EADDRINUSE`: stop the process already using the port, or run with another `PORT`.
- Wrong import path: verify the relative path and filename.
- `no such table`: verify the database filename and table name; this project creates `books`.
- Missing `await`: when using promise-based database APIs, wait for the database operation before using its result. This project uses SQLite callbacks.

## Screenshots
The Postman API test screenshots are available below.

![Screenshot 2026-11-06 121714](screenshots/Screenshot%202026-11-06%20121714.png)
![Screenshot 2026-11-06 121615](screenshots/Screenshot%202026-11-06%20121615.png)
![Screenshot 2026-11-06 121549](screenshots/Screenshot%202026-11-06%20121549.png)
![Screenshot 2026-11-06 121528](screenshots/Screenshot%202026-11-06%20121528.png)
![Screenshot 2026-11-06 121449](screenshots/Screenshot%202026-11-06%20121449.png)
![Screenshot 2026-11-06 121426](screenshots/Screenshot%202026-11-06%20121426.png)
![Screenshot 2026-11-06 121405](screenshots/Screenshot%202026-11-06%20121405.png)
![Screenshot 2026-11-06 121343](screenshots/Screenshot%202026-11-06%20121343.png)
![Screenshot 2026-11-06 121323](screenshots/Screenshot%202026-11-06%20121323.png)
![Screenshot 2026-11-06 121247](screenshots/Screenshot%202026-11-06%20121247.png)

## Submission
Commit this folder as `lab-03/` in the course repository. Do not commit `node_modules`, database secrets, or `.env` files.
