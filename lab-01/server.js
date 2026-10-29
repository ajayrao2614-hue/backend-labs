const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

// GET / - Welcome message
app.get('/', (req, res) => {
    res.status(200).send('Welcome to my Node.js and Express server!');
});

// GET /about - Student details as JSON
app.get('/about', (req, res) => {
    res.status(200).json({
        name: 'B.Ajay',
        section: 'CSE_GENAI_2A'
    });
});

// GET /time - Current date and time
app.get('/time', (req, res) => {
    res.status(200).json({
        currentDateTime: new Date()
    });
});

// Handle all unknown routes
app.use((req, res) => {
    res.status(404).send('404 - Page Not Found');
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
