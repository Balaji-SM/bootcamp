import express from 'express';

const app = express();
const port = 3000;

app.get('/users', (req, res) => {
    const users = [
        { id: 1, name: 'John' },
        { id: 2, name: 'Jane' }
    ];
    res.json(users);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);

});
