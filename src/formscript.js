const queryString = window.location.pathname;
const id = queryString.split('/').pop();

fetch('/forms.json')
    .then(response => response.json())
    .then(data => {
        const specific = data[id];

        const formContainer = document.getElementById('questionnaireForm');
        const titleElement = document.getElementById('questionnaireTitle');

        titleElement.textContent = specific.title;

        // Create a form element
        const form = document.createElement('form');

        // Set form attributes
        form.setAttribute('method', 'POST');
        form.setAttribute('action', '/submit');

        // Create a hidden input for the id
        const idInput = document.createElement('input');
        idInput.type = 'hidden';
        idInput.name = 'formId';
        idInput.value = id;
        form.appendChild(idInput);

        // Loop through the questions and create form elements dynamically
        specific.questions.forEach(question => {
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