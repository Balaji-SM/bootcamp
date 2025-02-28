const express = require('express');
const fs = require('fs'); // File system module
const path = require('path');

const app = express();
const port = 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// Path to the users.json file
const usersFilePath = path.join(__dirname, 'users.json');

// Helper function to read users from the file
const readUsersFromFile = () => {
    if (!fs.existsSync(usersFilePath)) {
        return [];
    }
    const data = fs.readFileSync(usersFilePath, 'utf8');
    return data ? JSON.parse(data) : [];
};

// Helper function to write users to the file
const writeUsersToFile = (users) => {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2), 'utf8');
};

// ✅ **1. GET - Fetch all users**
app.get('/users', (req, res) => {
    const users = readUsersFromFile();
    res.json(users);
});

// ✅ **2. POST - Add a new user**
app.post('/users', (req, res) => {
    const { id, name } = req.body;
    if (!id || !name) {
        return res.status(400).json({ message: 'ID and name are required' });
    }

    const users = readUsersFromFile();
    users.push({ id, name });
    writeUsersToFile(users);

    res.json({ message: 'User added', users });
});

// ✅ **3. PUT - Update an existing user**
app.put('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const { name } = req.body;

    let users = readUsersFromFile();
    const userIndex = users.findIndex(user => user.id === userId);

    if (userIndex === -1) {
        return res.status(404).json({ message: 'User not found' });
    }

    users[userIndex].name = name || users[userIndex].name;
    writeUsersToFile(users);

    res.json({ message: 'User updated', users });
});

// ✅ **4. DELETE - Remove a user**
app.delete('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);

    let users = readUsersFromFile();
    users = users.filter(user => user.id !== userId);
    
    writeUsersToFile(users);

    res.json({ message: 'User deleted', users });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
