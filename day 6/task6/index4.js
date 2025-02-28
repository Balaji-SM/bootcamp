const express = require('express');
const fs = require('fs'); 
const path = require('path');

const app = express();
const port = 3000;

app.use(express.json());

const usersFilePath = path.join(__dirname, 'users.json');

const readUsersFromFile = () => {
    if (!fs.existsSync(usersFilePath)) {
        return [];
    }
    const data = fs.readFileSync(usersFilePath, 'utf8');
    return data ? JSON.parse(data) : [];
};

const writeUsersToFile = (users) => {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2), 'utf8');
};

// ✅ **POST - Add a new user with validation**
app.post('/users', (req, res) => {
    const { id, name } = req.body;

    // **Validation checks**
    if (typeof id !== 'number' || id <= 0) {
        return res.status(400).json({ message: 'ID must be a positive number' });
    }
    if (typeof name !== 'string' || name.trim() === '') {
        return res.status(400).json({ message: 'Name must be a non-empty string' });
    }

    const users = readUsersFromFile();

    // **Check if ID already exists**
    if (users.some(user => user.id === id)) {
        return res.status(400).json({ message: 'User ID already exists' });
    }

    users.push({ id, name });
    writeUsersToFile(users);

    res.status(201).json({ message: 'User added successfully', users });
});

// ✅ **GET - Fetch all users**
app.get('/users', (req, res) => {
    const users = readUsersFromFile();
    res.json(users);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
