const http = require('http');
const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

app.use(express.static(path.join(__dirname, 'src')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'index.html'));
});

app.get('/list', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'list.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'login.html'));
});

// Dynamic route handling
app.get('/form/:index', (req, res) => {
    const index = req.params.index;
    res.sendFile(path.join(__dirname, 'src', 'form.html'));
});

const server = http.createServer(app);

server.listen(80, () => {
    console.log('HTTP Server running on port 80');
});
