let questionNumber = 1;

function addQuestion() {
    questionNumber++;
    const questionsDiv = document.getElementById('questions');
    const div = document.createElement('div');
    div.classList.add('question');
    div.innerHTML = `
        <label>Question ${questionNumber}:</label>
        <input type="text" name="question[]" required>
        <select name="type[]" required onchange="showOptions(this)">
            <option value="textInput">Text Input</option>
            <option value="numberInput">Number Input</option>
            <option value="multipleChoice">Multiple Choice</option>
        </select>
        <label for="required">Required:</label>
        <input type="checkbox" name="required[]" value="true">
        <button type="button" onclick="removeQuestion(this)">Remove Question</button>
        <div class="options" style="display: none;">
            <div class="option-item">
                <input type="text" name="options[]" placeholder="Option 1">
            </div>
            <button type="button" onclick="addOption(this)">Add Option</button>
        </div>
    `;
    questionsDiv.appendChild(div);
}

function removeQuestion(element) {
    element.closest('.question').remove();
    questionNumber--;
    updateQuestionNumbers();
}

function addOption(element) {
    const questionDiv = element.closest('.question');
    const optionsDiv = questionDiv.querySelector('.options');
    if (optionsDiv) {
        const optionContainer = document.createElement('div');
        optionContainer.classList.add('option-item');

        const options = optionsDiv.querySelectorAll('.option-item input[type="text"]');
        const nextOptionNumber = options.length + 1;

        const input = document.createElement('input');
        input.type = 'text';
        input.name = 'options[]';
        input.placeholder = `Option ${nextOptionNumber}`;

        const removeOptionBtn = document.createElement('button');
        removeOptionBtn.type = 'button';
        removeOptionBtn.textContent = 'Remove';
        removeOptionBtn.onclick = function() {
            removeOption(this);
            renumberOptions(optionsDiv); // Update numbering after removing an option
        };

        optionContainer.appendChild(input);
        optionContainer.appendChild(removeOptionBtn);

        optionsDiv.insertBefore(optionContainer, element); // Insert before the Add Option button
        renumberOptions(optionsDiv); // Update numbering after adding an option
    }
}

function removeOption(element) {
    const optionContainer = element.parentNode;
    if (optionContainer) {
        const optionsDiv = optionContainer.parentNode;
        optionContainer.remove();
        renumberOptions(optionsDiv);
    }
}

function renumberOptions(optionsDiv) {
    const options = optionsDiv.querySelectorAll('.option-item input[type="text"]');
    options.forEach((option, index) => {
        option.placeholder = `Option ${index + 1}`;
    });
}

function showOptions(selectElement) {
    const optionsDiv = selectElement.parentElement.querySelector('.options');
    if (selectElement.value === 'multipleChoice') {
        optionsDiv.style.display = 'block';
    } else {
        optionsDiv.style.display = 'none';
    }
}

function updateQuestionNumbers() {
    const questionDivs = document.querySelectorAll('.question');
    questionNumber = 0;
    questionDivs.forEach((questionDiv, index) => {
        questionDiv.querySelector('label').textContent = `Question ${index + 1}:`;
        questionNumber++;
    });
}
