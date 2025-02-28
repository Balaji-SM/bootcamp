const express = require('express');
const fs = require('fs');
const path = require('path');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();
const port = 3000;

app.use(express.json());

const usersFilePath = path.join(__dirname, 'users.json');

// Swagger Configuration
const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "User Management API",
            version: "1.0.0",
            description: "A simple API to manage users stored in a JSON file.",
        },
        servers: [
            {
                url: "http://localhost:3000",
            },
        ],
    },
    apis: ["./index3.js"], // Location of Swagger comments
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     description: Retrieve a list of users stored in the JSON file.
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: John Doe
 */
app.get('/users', (req, res) => {
    const users = readUsersFromFile();
    res.json(users);
});

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Add a new user
 *     description: Add a new user to the JSON file.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 example: 2
 *               name:
 *                 type: string
 *                 example: Jane Doe
 *     responses:
 *       201:
 *         description: User added successfully
 *       400:
 *         description: Invalid input
 */
app.post('/users', (req, res) => {
    const { id, name } = req.body;

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

// Function to read users from the file
function readUsersFromFile() {
    try {
        if (!fs.existsSync(usersFilePath)) return [];
        const data = fs.readFileSync(usersFilePath, 'utf8');
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error('Error reading file:', error.message);
        return [];
    }
}

// Function to write users to the file
function writeUsersToFile(users) {
    try {
        fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2), 'utf8');
    } catch (error) {
        console.error('Error writing file:', error.message);
        throw new Error('Failed to save user data');
    }
}

// Start the server
app.listen(port, () => {
    console.log(`✅ Server running at http://localhost:${port}`);
    console.log(`📄 Swagger API Docs: http://localhost:${port}/api-docs`);
});
