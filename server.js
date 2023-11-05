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
    const formsFilePath = path.join(__dirname, 'src/forms.json');
    const formId = parseInt(req.body.formId);
    const userId = 0; // Placeholder for user ID

    const existingForms = JSON.parse(fs.readFileSync(formsFilePath));
    const specificForm = existingForms.find(form => form.id === formId);

    if (!specificForm) {
        // Handle case where the form doesn't exist
        return res.status(404).send('Form not found.');
    }

    const formattedAnswers = {
        formId,
        userId,
        answers: specificForm.questions.map(question => {
            const key = `question_${question.id}`;
            const value = req.body[key];
            return question.type === 'numberInput' ? parseInt(value, 10) : value;
        })
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

    res.redirect('/');
});

app.get('/create', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'create.html'));
});

app.post('/createQuestionnaire', (req, res) => {
    const formsFilePath = path.join(__dirname, 'src/forms.json');

    let formsData;
    if (fs.existsSync(formsFilePath)) {
        const existingData = fs.readFileSync(formsFilePath);
        formsData = JSON.parse(existingData);
    } else {
        formsData = [];
    }

    const isPublic = req.body.isPublic === 'on';

    const newQuestionnaire = {
        id: formsData.length > 0 ? formsData[formsData.length - 1].id + 1 : 1,
        userId: 0, // You can update this with the user ID when implemented
        isActive: true,
        isPublic,
        title: req.body.title,
        questions: [],
    };

    const questions = req.body.question || [];
    const types = req.body.type || [];
    const required = req.body.required || [];
    const options = req.body.options || [];

    const booleanRequired = required.map(value => value === 'true');

    questions.forEach((question, index) => {
        const newQuestion = {
            id: index,
            question,
            type: types[index],
            required: booleanRequired[index] === true,
        };

        if (types[index] === 'multipleChoice') {
            const numOptions = options.length / questions.length;
            newQuestion.answers = options.splice(0, numOptions);
        }

        newQuestionnaire.questions.push(newQuestion);
    });

    formsData.push(newQuestionnaire);
    fs.writeFileSync(formsFilePath, JSON.stringify(formsData, null, 2));

    res.redirect('/');
});

const server = http.createServer(app);

server.listen(80, () => {
    console.log('HTTP Server running on port 80');
});
