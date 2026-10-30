# Lab 1: Node.js and Express Server

## Student Details
- Name: B.Ajay
- Registration Number: 252U1R9020
- Section: CSE GEN AI (304)

## Objective
Create a Node.js web server using the built-in HTTP module and Express, add routes, and return appropriate HTTP status codes.

## Requirements
- Node.js and npm
- Visual Studio Code (or another code editor)

## How to Install and Run
1. Open this folder in the terminal.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm start
   ```
4. Open `http://localhost:3000` in your browser.

## Endpoints

| Method | Path | Description | Expected status |
|---|---|---|---:|
| GET | `/` | Displays a welcome message | 200 |
| GET | `/about` | Returns name and section as JSON | 200 |
| GET | `/time` | Returns current date and time as JSON | 200 |
| GET | `/unknown` | Example of an unknown route | 404 |

Replace `Your Name`, `Your Registration Number`, and `Your Section` with your details in `server.js` and this README.

## Screenshots
Put your own screenshots in the `screenshots/` folder and uncomment/update these lines when the images are added:

- `screenshots/home.png` — home route
- `screenshots/about.png` — about route
- `screenshots/time.png` — time route
- `screenshots/404.png` — lab-01/screenshots/404.png

## Notes
- Do not commit `node_modules/` or `.env`.
- A deployment URL can be added here after deploying the server.
- If deployment is not possible, document the reason and include Postman screenshots.
