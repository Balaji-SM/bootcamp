const express = require('express'); // If using CommonJS
// import express from 'express'; // Uncomment this if using ES Modules

const app = express();
const port = 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

let users = [
    { id: 1, name: 'balaji',email:'balasivam@gmail.com' },
    { id: 2, name: 'san' ,email:'balasivam@gmail.com'}
];

// GET request - Fetch users
app.get('/users', (req, res) => {
    res.json(users);
});

// POST request - Add a new user
app.post('/users', (req, res) => {
    const { id, name } = req.body;

    if (!id || !name) {
        return res.status(400).json({ message: 'ID and name are required' });
    }

    users.push({ id, name });
    res.json({ message: 'User added', users });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
