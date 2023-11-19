const queryString = window.location.pathname;
const id = queryString.split('/').pop();

fetch(`/questionnaireData/${id}`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        const specific = data;

        if (specific && specific.questions) {
            const questionnaireContainer = document.getElementById('questionnaireForm');
            const titleElement = document.getElementById('questionnaireTitle');

            titleElement.textContent = specific.title;
            document.title = specific.title;

            const questionnaire = document.createElement('form');
            questionnaire.setAttribute('method', 'POST');
            questionnaire.setAttribute('action', '/submit');
            questionnaire.addEventListener('submit', validateForm);

            const idInput = document.createElement('input');
            idInput.type = 'hidden';
            idInput.name = 'questionnaireId';
            idInput.value = id;
            questionnaire.appendChild(idInput);

            specific.questions.forEach(question => {
                const div = document.createElement('div');
                const label = document.createElement('label');
                let input;

                if (question.type === 'multipleChoice') {
                    input = document.createElement('select');
                    const blankOption = document.createElement('option');
                    blankOption.text = '';
                    input.appendChild(blankOption);
                    question.options.forEach(optionValue => {
                        const option = document.createElement('option');
                        option.value = optionValue;
                        option.text = optionValue;
                        input.appendChild(option);
                    });
                } else if (question.type === 'numberInput' || question.type === 'textInput') {
                    input = document.createElement('input');
                    input.type = question.type === 'numberInput' ? 'number' : 'text';
                }

                input.name = `question_${question.id}`;
                input.required = question.required; // Set the 'required' attribute

                if (question.required) {
                    label.textContent = question.question;
                    const redStar = document.createElement('span');
                    redStar.style.color = 'red';
                    redStar.textContent = ' *'; // Space added to separate the red star from the text
                    label.appendChild(redStar); // Append red star after the question text for required fields
                    input.classList.add('required-field'); // Add class to style required fields
                } else {
                    label.textContent = question.question; // Display the question text for non-required fields
                }

                div.appendChild(label);
                div.appendChild(input);
                questionnaire.appendChild(div);

                if (question.required) {
                    label.addEventListener('mouseover', () => {
                        if (input.value === '') {
                            label.setAttribute('title', 'Ennek a mezőnek kitöltése kötelező');
                        }
                    });

                    if (question.type === 'multipleChoice') {
                        input.addEventListener('change', () => {
                            if (input.value === '') {
                                label.setAttribute('title', 'Ennek a mezőnek kitöltése kötelező');
                            } else {
                                label.removeAttribute('title');
                            }
                        });
                    }
                }
            });

            const submitButton = document.createElement('button');
            submitButton.type = 'submit';
            submitButton.textContent = 'Beküldés';

            questionnaire.appendChild(submitButton);
            questionnaireContainer.appendChild(questionnaire);

            function validateForm(event) {
                const inputs = questionnaire.querySelectorAll('input, select');
                let isFormValid = true;

                inputs.forEach(input => {
                    if (input.required && input.value === '') {
                        isFormValid = false;
                        // You can provide visual feedback for required fields not filled out (e.g., highlighting the field).
                        // For example: input.style.border = '1px solid red';
                    }
                });

                if (!isFormValid) {
                    event.preventDefault();
                }
            }
        } else {
            console.error('Invalid or missing data in the response');
        }
    })
    .catch(error => console.error('Error fetching data:', error));
