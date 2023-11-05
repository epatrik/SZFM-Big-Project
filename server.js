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
    const formId = parseInt(req.body.formId); // Parse the formId to an integer
    const userId = 0; // Placeholder for user ID

    let formattedAnswers = {
        formId,
        userId,
        answers: []
    };

    if (fs.existsSync(answersFilePath)) {
        const existingData = fs.readFileSync(answersFilePath);
        const parsedData = JSON.parse(existingData);

        // Get the questionnaire details from the forms.json file
        const formsDataPath = path.join(__dirname, 'src/forms.json');
        const formData = JSON.parse(fs.readFileSync(formsDataPath));

        const form = formData.find(form => form.id === formId);

        // Check if the form is public or the user has already submitted for this form
        const isPublic = form ? form.isPublic : false;
        const userSubmitted = parsedData.some(answer => answer.formId === formId && answer.userId === userId);

        if (!isPublic && userSubmitted) {
            res.status(403).send('You have already submitted answers for this form.');
            return;
        }

        formattedAnswers.answers = Object.keys(req.body)
            .filter(key => key.startsWith('question_'))
            .map(key => {
                const value = req.body[key];
                return !isNaN(value) ? parseInt(value, 10) : value;
            });

        parsedData.push(formattedAnswers);
        fs.writeFileSync(answersFilePath, JSON.stringify(parsedData, null, 2));
    } else {
        formattedAnswers.answers = Object.keys(req.body)
            .filter(key => key.startsWith('question_'))
            .map(key => {
                const value = req.body[key];
                return !isNaN(value) ? parseInt(value, 10) : value;
            });

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
