const http = require('http');
const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

app.use(express.static(path.join(__dirname, 'src')));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'index.html'));
});

app.get('/list', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'list.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'login.html'));
});

app.get('/form/:index', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'form.html'));
});

app.post('/submit', (req, res) => {
    const answersFilePath = path.join(__dirname, 'src/answers.json');
    const formId = req.body.formId;
    let answers = Object.keys(req.body)
        .filter(key => key.startsWith('question_'))
        .map(key => req.body[key]);

    let formattedAnswers = {
        formId,
        answers
    };

    if (fs.existsSync(answersFilePath)) {
        const existingData = fs.readFileSync(answersFilePath);
        const parsedData = JSON.parse(existingData);
        parsedData.push(formattedAnswers);
        fs.writeFileSync(answersFilePath, JSON.stringify(parsedData, null, 2));
    } else {
        const newAnswers = [formattedAnswers];
        fs.writeFileSync(answersFilePath, JSON.stringify(newAnswers, null, 2));
    }

    res.redirect('/index.html');
});

const server = http.createServer(app);

server.listen(80, () => {
    console.log('HTTP Server running on port 80');
});
