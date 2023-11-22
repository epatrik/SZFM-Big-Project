let questionNumber = 1;

function addQuestion() {
    questionNumber++;
    const questionsDiv = document.getElementById('questions');
    const div = document.createElement('div');
    div.classList.add('question');
    div.innerHTML = `
        <label>${questionNumber}. kérdés:</label>
        <input type="text" name="question[]" required autocomplete="off">
        <select name="type[]" required onchange="showOptions(this)">
            <option value="textInput">Szöveges bevitel</option>
            <option value="numberInput">Szám bevitel</option>
            <option value="multipleChoice">Több opció</option>
        </select>
        <label for="required">Kötelező:</label>
        <input type="checkbox" name="required[]" value="true">
        <button type="button" onclick="removeQuestion(this)">Kérdés törlése</button>
        <div class="options" style="display: none;">
            <div class="option-item">
                <input type="text" name="options[] required" placeholder="1. opció">
            </div>
            <button type="button" onclick="addOption(this)">Új opció</button>
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
        input.placeholder = `${nextOptionNumber}. opció`;
        input.autocomplete = 'off';
        input.required = optionsDiv.style.display === 'block'; // Set required based on the display state

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
        option.placeholder = `${index + 1}. opció`;
    });
}

function showOptions(selectElement) {
    const optionsDiv = selectElement.parentElement.querySelector('.options');
    const optionsInputs = optionsDiv.querySelectorAll('.option-item input[type="text"]');

    optionsDiv.style.display = selectElement.value === 'multipleChoice' ? 'block' : 'none';

    // Set the 'required' attribute for options that are displayed
    optionsInputs.forEach((input) => {
        input.required = selectElement.value === 'multipleChoice';
    });
}

function updateQuestionNumbers() {
    const questionDivs = document.querySelectorAll('.question');
    questionNumber = 0;
    questionDivs.forEach((questionDiv, index) => {
        questionDiv.querySelector('label').textContent = `${index + 1}. kérdés:`;
        questionNumber++;
    });
}
