const http = require('http');
const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt');
const sqlite3 = require('sqlite3').verbose();
const expressSession = require('express-session');
const SQLiteStore = require('connect-sqlite3')(expressSession);

// Create or open the SQLite database file
const db = new sqlite3.Database('src/szfmdb.sqlite', (err) => {
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

        db.run(`
            CREATE TABLE IF NOT EXISTS answers (
                id INTEGER,
                userId INTEGER,
                questionnaireId INTEGER,
                questionId INTEGER,
                answer TEXT,
                PRIMARY KEY (id, questionId),
                FOREIGN KEY (userId) REFERENCES accounts(id),
                FOREIGN KEY (questionId) REFERENCES questions(id),
                FOREIGN KEY (questionnaireId) REFERENCES questionnaires(id)
            )
        `, (createErr) => {
            if (createErr) {
                console.error('Error creating table', createErr.message);
            } else {
                //console.log('Table "answers" created or already exists');
            }
        });

    }
});

const app = express();

app.use(express.static(path.join(__dirname, 'src')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(expressSession({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    store: new SQLiteStore()
}));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'index.html'));
});

app.get('/list', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'list.html'));
});

app.get('/api/questionnaires', (req, res) => {
    const sqlSelectQuestionnaires = 'SELECT * FROM questionnaires WHERE isActive = 1 AND isPublic = 1 ORDER BY id DESC';
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

app.get('/my-questionnaires', (req, res) => {
    if (req.session.userId != -1) {
        res.sendFile(path.join(__dirname, 'src', 'my-questionnaires.html'));
    }
    else {
        res.redirect('/')
    }
});

app.get('/api/my-questionnaires', (req, res) => {
    if (req.session.userId != -1) {
        const sqlSelectQuestionnaires = 'SELECT * FROM questionnaires WHERE userId = ? ORDER BY id DESC';
        db.all(sqlSelectQuestionnaires, [req.session.userId], (err, rows) => {
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
    }
    else {
        res.redirect('/')
    }
});

app.get('/login', (req, res) => {
    if (req.session.userId == undefined) {
        req.session.userId = -1;
    }
    if (req.session.userId == -1 ) {
        res.sendFile(path.join(__dirname, 'src', 'login.html'));
    }
    else {
        res.redirect('/')
    }
});

app.get('/register', (req, res) => {
    if (req.session.userId == -1) {
        res.sendFile(path.join(__dirname, 'src', 'register.html'));
    }
    else {
        res.redirect('/')
    }
});

app.get('/questionnaire/:index', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'questionnaire.html'));
});

app.get('/api/questionnaireData/:id', async (req, res) => {
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

app.get('/api/answers/:id', (req, res) => {
    const questionnaireId = req.params.id;
    const userIdQuery = 'SELECT userId FROM questionnaires WHERE id = ?';

    db.get(userIdQuery, [questionnaireId], (err, userIdOfQuestionnaire) => {
        if (err) {
            console.error(err.message);
            return res.status(500).send('Internal Server Error');
        }

        if (userIdOfQuestionnaire.userId == req.session.userId) {
            // Fetch answers data from the database based on the provided questionnaire ID
            const sqlSelectAnswers = 'SELECT * FROM answers WHERE questionnaireId = ?';
            db.all(sqlSelectAnswers, [questionnaireId], (err, rows) => {
                if (err) {
                    console.error(err.message);
                    return res.status(500).send('Internal Server Error');
                }

                const answersData = rows.map(row => ({
                    id: row.id,
                    userId: row.userId,
                    questionnaireId: row.questionnaireId,
                    questionId: row.questionId,
                    answer: row.answer,
                }));

                res.json(answersData);
            });
        }
        else {
            res.redirect('/')
        }
    })
});

app.get('/results/:index', (req, res) => {
    const userIdQuery = 'SELECT userId FROM questionnaires WHERE id = ?';
    db.get(userIdQuery, [req.params.index], (err, userIdOfQuestionnaire) => {
        if (err) {
            console.error(err.message);
            return res.status(500).send('Internal Server Error');
        }

        if (userIdOfQuestionnaire == undefined || userIdOfQuestionnaire.userId != req.session.userId) {
            res.redirect('/')
        }
        else {
            res.sendFile(path.join(__dirname, 'src', 'results.html'));
        }
    })
});

// Define an endpoint to handle questionnaire updates
app.post('/update-questionnaire', (req, res) => {
    const updatedData = req.body; // Assuming the request body contains the updated data
    const { id, isActive, isPublic } = updatedData;

    // Update the questionnaire in the database
    db.run(
        'UPDATE questionnaires SET isActive = ?, isPublic = ? WHERE id = ?',
        [isActive, isPublic, id],
        (err) => {
            if (err) {
                console.error('Error updating questionnaire:', err.message);
                res.status(500).json({ error: 'Internal Server Error' });
            } else {
                //console.log('Questionnaire updated successfully');
                res.json({ message: 'Update successful' });
            }
        }
    );
});

app.post('/api/submit', async (req, res) => {
    const questionnaireId = parseInt(req.body.questionnaireId);
    const userId = parseInt(req.session.userId) || -1;
    // TODO

    // Check if the user is logged in (userId is not -1)
    if (userId !== -1) {
        // Check if the questionnaire is not public and the user has already submitted answers for it
        const checkExistingSubmissionQuery = 'SELECT * FROM answers AS a ' +
            'JOIN questionnaires AS q ON a.questionnaireId = q.id ' +
            'WHERE a.userId = ? AND a.questionnaireId = ? AND q.isPublic = 0';

        db.get(checkExistingSubmissionQuery, [userId, questionnaireId], (err, existingSubmission) => {
            if (err) {
                console.error('Error checking existing submission:', err.message);
                return res.status(500).send('Internal Server Error');
            }

            if (existingSubmission) {
                return res.status(403).send('Forbidden: User has already submitted answers for this private questionnaire');
            }

            continueWithSubmission();
        });
    } else {
        // If userId is -1, check if the questionnaire is public before proceeding with the submission
        const checkPublicQuestionnaireQuery = 'SELECT * FROM questionnaires WHERE id = ? AND isPublic = 1 AND isActive = 1';
        db.get(checkPublicQuestionnaireQuery, [questionnaireId], async (err, questionnaireRow) => {
            if (err) {
                console.error('Error checking public questionnaire:', err.message);
                return res.status(500).send('Internal Server Error');
            }

            if (!questionnaireRow) {
                return res.status(404).send('Public and Active Questionnaire not found');
            }

            continueWithSubmission();
        });
    }

    function continueWithSubmission() {
        // Get the current highest id in the answers table
        const getCurrentMaxIdQuery = 'SELECT MAX(id) as maxId FROM answers';
        db.get(getCurrentMaxIdQuery, [], async (err, result) => {
            if (err) {
                console.error('Error getting current max id:', err.message);
                return res.status(500).send('Internal Server Error');
            }

            const currentMaxId = result.maxId || 0; // If there are no records yet, start from 0

            // Prepare the answers for insertion
            const answers = req.body;
            delete answers.questionnaireId; // Remove unnecessary property

            // Insert answers into the database with an incremented id
            const insertAnswersQuery = 'INSERT INTO answers (id, userId, questionnaireId, questionId, answer) VALUES (?, ?, ?, ?, ?)';
            const answersArray = Object.entries(answers);

            for (const [key, answer] of answersArray) {
                if (key.startsWith('question_')) {
                    const questionId = parseInt(key.replace('question_', ''), 10);

                    if (!isNaN(questionId)) {
                        await new Promise((resolve) => {
                            const newId = currentMaxId + 1;
                            db.run(insertAnswersQuery, [newId, userId, questionnaireId, questionId, answer], (err) => {
                                if (err) {
                                    console.error('Error inserting answer:', err.message);
                                    return res.status(500).send('Internal Server Error');
                                }
                                resolve();
                            });
                        });
                    } else {
                        console.error('Invalid question key:', key);
                        return res.status(400).send('Bad Request: Invalid question key');
                    }
                }
            }

            res.redirect('/');
        });
    }
});

app.get('/create', (req, res) => {
    if (req.session.userId != -1) {
        res.sendFile(path.join(__dirname, 'src', 'create.html'));
    }
    else {
        res.redirect('/')
    }
});

app.post('/api/createQuestionnaire', (req, res) => {
    //console.log('Request Body:', req.body);
    const isPublic = req.body.isPublic === 'on';

    const newQuestionnaire = {
        userId: req.session.userId || -1,
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

        const booleanRequired = required.map(value => value === 'true');

        // Insert each question into the database
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

                // Extract options directly from the request body based on the HTML structure
                const optionsArray = req.body.options;

                // Insert options for multiple-choice questions
                if (newQuestion.type === 'multipleChoice') {

                    const optionsForQuestion = optionsArray[index]; // Use the index to get options for the current question

                    // Insert options into the database
                    optionsForQuestion.forEach((optionValue, optionIndex) => {
                        db.run('INSERT INTO options (questionnaireId, questionId, id, value) VALUES (?, ?, ?, ?)', [
                            newQuestion.questionnaireId,
                            newQuestion.id,
                            optionIndex,
                            optionValue
                        ], (optionError) => {
                            if (optionError) {
                                console.error(optionError);
                            }
                        });
                    });
                }
            });
        });

        res.redirect('/');
    });
});

app.post('/api/deleteQuestionnaire/:id', (req, res) => {
    const questionnaireId = req.params.id;
  
    const sqlDeleteQuestionnaire = 'DELETE FROM questionnaires WHERE id = ?';
    const sqlDeleteQuestions = 'DELETE FROM questions WHERE questionnaireId = ?';
    const sqlDeleteOptions = 'DELETE FROM options WHERE questionnaireId = ?';
    const sqlDeleteAnswers = 'DELETE FROM answers WHERE questionnaireId = ?';
    db.run(sqlDeleteQuestionnaire, [questionnaireId], (err) => {
        if (err) {
            console.error('Error deleting questionnaire:', err.message);
            return res.status(500).send('Internal Server Error');
        }
  
        db.run(sqlDeleteQuestions, [questionnaireId], (err) => {
            if (err) {
            console.error('Error deleting questions:', err.message);
            return res.status(500).send('Internal Server Error');
            }
    
            db.run(sqlDeleteOptions, [questionnaireId], (err) => {
                if (err) {
                console.error('Error deleting options:', err.message);
                return res.status(500).send('Internal Server Error');
                }
                
                db.run(sqlDeleteAnswers, [questionnaireId], (err) => {
                    if (err) {
                    console.error('Error deleting answers:', err.message);
                    return res.status(500).send('Internal Server Error');
                    }
                });
            });
        });
        return res.sendStatus(200);
    });
});

app.post('/api/createUser', async (req, res) => {
    const username = req.body.username;
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const email = req.body.email;

    const sqlSearch = 'SELECT * FROM accounts WHERE username = ?';
    const sqlInsert = 'INSERT INTO accounts (id, username, password, email) VALUES (NULL,?,?,?)';

    db.get(sqlSearch, [username], async (error, row) => {
        if (error) {
            console.error(error);
            return res.json("Szerver hiba"); // Internal Server Error
        }

        if (username == "" || hashedPassword == "" || email == "") {
            return res.json("Töltsd ki az összes mezőt!")
        }
        else {
            if (row) {
                return res.json("Felhasználónév foglalt!")
            } else {
                db.run(sqlInsert, [username, hashedPassword, email], function (error) {
                    if (error) {
                        console.error(error);
                        return res.json("Szerver hiba"); // Internal Server Error
                    }

                    console.log('Inserted row ID:', this.lastID);
                    return res.json("Created"); // Created
                });
            }
        }
    });
});

app.post("/api/loginUser", (req, res) => {
    const username = req.body.username
    const password = req.body.password

    const sqlSearch = "Select * from accounts where username = ?"

    if (username == "" || password == "") {
        return res.json("Fill in all the fields")
    }
    else {
        db.get(sqlSearch, [username], async (error, row) => {
            if (error) {
                console.error(error);
                return res.sendStatus(500); // Internal Server Error
            }

            if (!row) {
                return res.json("Username or password incorrect!")
            }
            else {
                const hashedPassword = row.password
                if (await bcrypt.compare(password, hashedPassword)) {
                    req.session.userId = row.id; // Store user ID in the session
                    return res.json({ id: row.id, username: row.username, email: row.email })
                }
                else {
                    return res.json("Username or password incorrect!")
                }
            }
        })
    }
})

app.get('/api/logout', (req, res) => {
    req.session.userId = -1;
    res.redirect('/');
});

const server = http.createServer(app);

server.listen(80, () => {
    console.log('HTTP Server running on port 80');
});
