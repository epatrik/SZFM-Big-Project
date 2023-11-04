const queryString = window.location.pathname;
const index = queryString.split('/').pop();

fetch('/forms.json')
    .then(response => response.json())
    .then(data => {
        const specificData = data[index];

        const formContainer = document.getElementById('questionnaireForm');
        const titleElement = document.getElementById('questionnaireTitle');

        titleElement.textContent = specificData.title;

        // Create a form element
        const form = document.createElement('form');

        // Set form attributes
        form.setAttribute('method', 'POST');
        form.setAttribute('action', '/submit'); // Change this to the appropriate submission URL

        // Loop through the questions and create form elements dynamically
        specificData.questions.forEach(question => {
            const div = document.createElement('div');
            const label = document.createElement('label');
            label.textContent = question.question;

            let input;

            // Create different types of inputs based on the question type
            if (question.type === 'multipleChoice') {
                input = document.createElement('select');
                question.answers.forEach(answer => {
                    const option = document.createElement('option');
                    option.value = answer;
                    option.text = answer;
                    input.appendChild(option);
                });
            } else if (question.type === 'numberInput' || question.type === 'textInput') {
                input = document.createElement('input');
                input.type = question.type === 'numberInput' ? 'number' : 'text';
            }

            // Set attributes for the input
            input.name = `question_${question.id}`;
            div.appendChild(label);
            div.appendChild(input);
            form.appendChild(div);
        });

        // Create a submit button
        const submitButton = document.createElement('button');
        submitButton.type = 'submit';
        submitButton.textContent = 'Submit';

        form.appendChild(submitButton);
        formContainer.appendChild(form);
    })
    .catch(error => console.error('Error fetching data:', error));