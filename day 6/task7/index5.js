const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.json());

const usersFilePath = path.join(__dirname, 'users.json');

// Function to read users from the file
const readUsersFromFile = () => {
    try {
        if (!fs.existsSync(usersFilePath)) return [];
        const data = fs.readFileSync(usersFilePath, 'utf8');
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error('Error reading file:', error.message);
        return [];
    }
};

// Function to write users to the file
const writeUsersToFile = (users) => {
    try {
        fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2), 'utf8');
    } catch (error) {
        console.error('Error writing file:', error.message);
        throw new Error('Failed to save user data');
    }
};

// ✅ GET endpoint to fetch users
app.get('/users', (req, res) => {
    const users = readUsersFromFile();
    res.json(users);
});

// ✅ POST endpoint to add a new user
app.post('/users', (req, res) => {
    const { id, name } = req.body;

    // Validation
    if (typeof id !== 'number' || id <= 0) {
        return res.status(400).json({ error: 'ID must be a positive number' });
    }
    if (typeof name !== 'string' || name.trim() === '') {
        return res.status(400).json({ error: 'Name must be a non-empty string' });
    }

    const users = readUsersFromFile();

    if (users.some(user => user.id === id)) {
        return res.status(400).json({ error: 'User ID already exists' });
    }

    users.push({ id, name });
    writeUsersToFile(users);

    res.status(201).json({ message: 'User added successfully', users });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error('Internal Server Error:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
});

// Start the server
app.listen(port, () => {
    console.log(`✅ Server running at http://localhost:${port}`);
});
