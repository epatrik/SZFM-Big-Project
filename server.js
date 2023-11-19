const http = require('http');
const express = require('express');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcrypt');
const sqlite3 = require('sqlite3').verbose();
const dotenv = require('dotenv');

dotenv.config({path: './.env'})

// Create or open the SQLite database file
const db = new sqlite3.Database('szfmdb.sqlite', (err) => {
    if (err) {
        console.error('Error opening database', err.message);
    } else {
        //console.log('Connected to the database');

        // Create 'accounts' table if it doesn't exist
        db.run(`
            CREATE TABLE IF NOT EXISTS accounts (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT NOT NULL,
                password TEXT NOT NULL,
                email TEXT NOT NULL
            )
        `, (createErr) => {
            if (createErr) {
                console.error('Error creating table', createErr.message);
            } else {
                //console.log('Table "accounts" created or already exists');
            }
        });

        // Create 'questionnaires' table if it doesn't exist
        db.run(`
            CREATE TABLE IF NOT EXISTS questionnaires (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                userId INTEGER,
                isActive BOOLEAN,
                isPublic BOOLEAN,
                title TEXT
            )
        `, (createErr) => {
            if (createErr) {
                console.error('Error creating table', createErr.message);
            } else {
                //console.log('Table "questionnaires" created or already exists');
            }
        });

        // Create 'questions' table if it doesn't exist
        db.run(`
            CREATE TABLE IF NOT EXISTS questions (
                questionnaireId INTEGER,
                id INTEGER,
                question TEXT,
                type TEXT,
                required BOOLEAN,
                PRIMARY KEY (id, questionnaireId),
                FOREIGN KEY (questionnaireId) REFERENCES questionnaires(id)
            )
        `, (createErr) => {
            if (createErr) {
                console.error('Error creating table', createErr.message);
            } else {
                //console.log('Table "questions" created or already exists');
            }
        });

        db.run(`
            CREATE TABLE IF NOT EXISTS options (
                questionnaireId INTEGER,
                questionId INTEGER,
                id INTEGER,
                value TEXT,
                PRIMARY KEY (questionnaireId, questionId, id),
                FOREIGN KEY (questionnaireId) REFERENCES questionnaires(id),
                FOREIGN KEY (questionId) REFERENCES questions(id)
            )
        `, (createErr) => {
            if (createErr) {
                console.error('Error creating table', createErr.message);
            } else {
                //console.log('Table "options" created or already exists');
            }
        });
    }
});

const app = express();

app.use(express.static(path.join(__dirname, 'src')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'index.html'));
});

app.get('/list', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'list.html'));
});

app.get('/questionnaires', (req, res) => {
    const sqlSelectQuestionnaires = 'SELECT * FROM questionnaires WHERE isActive = 1 AND isPublic = 1';
    db.all(sqlSelectQuestionnaires, [], (err, rows) => {
        if (err) {
            console.error(err.message);
            return res.status(500).send('Internal Server Error');
        }

        const questionnairesData = rows.map(row => ({
            id: row.id,
            userId: row.userId,
            isActive: row.isActive === 1,
            isPublic: row.isPublic === 1,
            title: row.title,
        }));

        res.json(questionnairesData);
    });
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'login.html'));
});

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'register.html'));
});

app.get('/questionnaire/:index', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'questionnaire.html'));
});

app.get('/questionnaireData/:id', async (req, res) => {
    const questionnaireId = req.params.id;

    const sqlSelectQuestionnaire = 'SELECT * FROM questionnaires WHERE id = ?';
    db.get(sqlSelectQuestionnaire, [questionnaireId], async (err, row) => {
        if (err) {
            console.error('Error fetching questionnaire:', err.message);
            return res.status(500).send('Internal Server Error');
        }

        if (!row) {
            return res.status(404).send('Questionnaire not found');
        }

        const questionnaireData = {
            id: row.id,
            userId: row.userId,
            isActive: row.isActive === 1,
            isPublic: row.isPublic === 1,
            title: row.title,
            questions: [],
        };

        const sqlSelectQuestions = 'SELECT * FROM questions WHERE questionnaireId = ?';
        const questionRows = await new Promise((resolve) => {
            db.all(sqlSelectQuestions, [questionnaireId], (err, rows) => {
                resolve(rows);
            });
        });

        for (const questionRow of questionRows) {
            const question = {
                id: questionRow.id,
                question: questionRow.question,
                type: questionRow.type,
                required: questionRow.required === 1,
                options: [], // Add this line
            };

            // Fetch options for multiple-choice questions using JOIN
            if (question.type === 'multipleChoice') {
                const sqlSelectOptions = 'SELECT value FROM options WHERE questionnaireId = ? AND questionId = ?';
                const optionRows = await new Promise((resolve) => {
                    db.all(sqlSelectOptions, [questionnaireId, question.id], (err, rows) => {
                        resolve(rows);
                    });
                });

                if (optionRows.length > 0) {
                    question.options = optionRows.map(optionRow => optionRow.value);
                    //console.log('Question Options:', question.options);
                }
            }

            questionnaireData.questions.push(question);
        }

        //console.log('Questionnaire Data:', questionnaireData); // Log questionnaire data

        res.json(questionnaireData);
    });
});

app.get('/results/:index', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'results.html'));
});

app.post('/submit', (req, res) => {
    const answersFilePath = path.join(__dirname, 'src/answers.json');
    const questionnairesFilePath = path.join(__dirname, 'src/forms.json');
    const questionnaireId = parseInt(req.body.questionnaireId);
    const userId = 0; // Placeholder for user ID

    const existingQuestionnaires = JSON.parse(fs.readFileSync(questionnairesFilePath));
    const specificQuestionnaire = existingQuestionnaires.find(questionnaire => questionnaire.id === questionnaireId);

    if (!specificQuestionnaire) {
        // Handle case where the questionnaire doesn't exist
        return res.status(404).send('Questionnaire not found.');
    }

    const formattedAnswers = {
        questionnaireId,
        userId,
        answers: specificQuestionnaire.questions.map(question => {
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
    const isPublic = req.body.isPublic === 'on';

    const newQuestionnaire = {
        userId: 0, // You can update this with the user ID when implemented
        isActive: true,
        isPublic,
        title: req.body.title,
        questions: [],
    };

    // Insert the new questionnaire into the database
    const sqlInsertQuestionnaire = 'INSERT INTO questionnaires (userId, isActive, isPublic, title) VALUES (?,?,?,?)';
    db.run(sqlInsertQuestionnaire, [
        newQuestionnaire.userId,
        newQuestionnaire.isActive,
        newQuestionnaire.isPublic,
        newQuestionnaire.title
    ], function (error) {
        if (error) {
            console.error(error);
            return res.sendStatus(500); // Internal Server Error
        }

        newQuestionnaire.id = this.lastID; // Update the ID after insertion

        const questions = req.body.question || [];
        const types = req.body.type || [];
        const required = req.body.required || [];
        const options = req.body.options || [];

        const booleanRequired = required.map(value => value === 'true');

        questions.forEach((question, index) => {
            const newQuestion = {
                id: index,
                questionnaireId: newQuestionnaire.id,
                question,
                type: types[index],
                required: booleanRequired[index] === true,
            };

            // Insert each question into the database
            const sqlInsertQuestion = 'INSERT INTO questions (id, questionnaireId, question, type, required) VALUES (?,?,?,?,?)';
            db.run(sqlInsertQuestion, [
                newQuestion.id,
                newQuestion.questionnaireId,
                newQuestion.question,
                newQuestion.type,
                newQuestion.required
            ], function (error) {
                if (error) {
                    console.error(error);
                    return res.sendStatus(500); // Internal Server Error
                }

                // Insert options for multiple-choice questions
                if (newQuestion.type === 'multipleChoice') {
                    const numOptions = options.length / questions.length;

                    for (let i = 0; i < numOptions; i++) {
                        const optionValue = options[index * numOptions + i];
                        db.run('INSERT INTO options (questionnaireId, questionId, id, value) VALUES (?, ?, ?, ?)', [newQuestion.questionnaireId, index, i, optionValue], (optionError) => {
                            if (optionError) {
                                console.error(optionError);
                            }
                        });
                    }
                }
            });

            newQuestion.id = index + 1; // Update the question ID after insertion
            newQuestionnaire.questions.push(newQuestion);
        });

        res.redirect('/');
    });
});

app.post('/createUser', async (req, res) => {
    const username = req.body.username;
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const email = req.body.email;

    const sqlSearch = 'SELECT * FROM accounts WHERE username = ?';
    const sqlInsert = 'INSERT INTO accounts (id, username, password, email) VALUES (NULL,?,?,?)';

    db.get(sqlSearch, [username], async (error, row) => {
        if (error) {
            console.error(error);
            return res.sendStatus(500); // Internal Server Error
        }

        if (row) {
            console.log('Username already exists!');
            return res.sendStatus(409); // Conflict
        } else {
            db.run(sqlInsert, [username, hashedPassword, email], function (error) {
                if (error) {
                    console.error(error);
                    return res.sendStatus(500); // Internal Server Error
                }

                console.log('--------> Created new User');
                console.log('Inserted row ID:', this.lastID);
                return res.sendStatus(201); // Created
            });
        }
    });
});

app.post("/loginUser", (req, res)=> {
    const username = req.body.username
    const password = req.body.password

    const sqlSearch = "Select * from accounts where username = ?"

    if (username == "" || password == ""){
        console.log("Fill in all the fields")
        return res.json("Fill in all the fields")
    }
    else {
        db.get (sqlSearch, [username], async (error, row) => {
            if (error) {
                console.error(error);
                return res.sendStatus(500); // Internal Server Error
            }

            if (!row) {
                console.log("--------> Username or password incorrect!")
                return res.json("Username or password incorrect!")
            }
            else {
                const hashedPassword = row.password
                if (await bcrypt.compare(password, hashedPassword)) {
                    console.log("---------> Login Successful")
                    return res.json({id: row.id,username: row.username,email: row.email})
                } 
                else {
                    console.log("---------> Username or password incorrect!")
                    return res.json("Username or password incorrect!") 
                }
            }
        })
    }
})

const server = http.createServer(app);

server.listen(80, () => {
    console.log('HTTP Server running on port 80');
});
