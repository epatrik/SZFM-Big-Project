const queryString = window.location.pathname;
const id = parseInt(queryString.split('/').pop()); // Parse questionnaireId as integer

const fetchQuestionnaireData = fetch(`/api/questionnaireData/${id}`).then(response => response.json());
const fetchAnswersData = fetch(`/api/answers/${id}`).then(response => response.json());

function createBreakdownTable(breakdown) {
  const breakdownTable = document.createElement('table');
  breakdownTable.classList.add('breakdown-table');

  const headerRow = breakdownTable.insertRow();
  const questionHeader = headerRow.insertCell();
  questionHeader.textContent = 'Kérdés';
  const countHeader = headerRow.insertCell();
  countHeader.textContent = 'Összegzés';

  Object.keys(breakdown).forEach(question => {
    const row = breakdownTable.insertRow();
    const cellQuestion = row.insertCell();
    cellQuestion.textContent = question;

    const cellCount = row.insertCell();
    const countTable = document.createElement('table');

    Object.keys(breakdown[question]).forEach(option => {
      const countRow = countTable.insertRow();
      const optionCell = countRow.insertCell();
      optionCell.textContent = option;
      const countCell = countRow.insertCell();
      countCell.textContent = breakdown[question][option];
    });

    cellCount.appendChild(countTable);
  });

  return breakdownTable;
}

function createBreakdown(questions, filteredAnswers) {
  const breakdown = {};

  questions
    .filter(question => question.type === 'multipleChoice')
    .forEach(question => {
      const options = question.options;
      breakdown[question.question] = {};

      options.forEach(option => {
        breakdown[question.question][option] = 0;
      });

      filteredAnswers.forEach(answer => {
        const questionId = answer.questionId;

        if (questionId === question.id) {
          const chosenOption = answer.answer;

          if (chosenOption !== undefined && chosenOption !== '') {
            breakdown[question.question][chosenOption]++;
          } else {
            breakdown[question.question]['Nem válaszolt'] = (breakdown[question.question]['Nem válaszolt'] || 0) + 1;
          }
        }
      });

      // Remove "Nem válaszolt" if it's 0
      if (breakdown[question.question]['Nem válaszolt'] === 0) {
        delete breakdown[question.question]['Nem válaszolt'];
      }
    });

  return breakdown;
}

function createResultsTable(questions, filteredAnswers) {
  const resultsTable = document.createElement('table');
  resultsTable.classList.add('answers-table');

  const headerRow = resultsTable.insertRow();
  questions.forEach(question => {
    const th = document.createElement('th');
    th.textContent = question.question;
    headerRow.appendChild(th);
  });

  // Create an object to store answers based on their id
  const groupedAnswers = {};

  // Group answers based on id
  filteredAnswers.forEach(answer => {
    const id = answer.id;
    if (!groupedAnswers[id]) {
      groupedAnswers[id] = [];
    }
    groupedAnswers[id].push(answer.answer);
  });

  // Create a row for each group of answers
  Object.values(groupedAnswers).forEach(group => {
    const answerRow = resultsTable.insertRow();
    group.forEach(ans => {
      const td = answerRow.insertCell();
      td.textContent = ans;
    });
  });

  return resultsTable;
}

function createNumberStatistics(questions, filteredAnswers) {
  const numberStats = {};

  questions
    .filter(question => question.type === 'numberInput')
    .forEach(question => {
      const questionId = question.id;
      const answers = filteredAnswers
        .filter(answer => answer.questionId === questionId)
        .map(answer => answer.answer);
      const cleanAnswers = answers.filter(answer => answer !== '');

      const stats = {
        count: cleanAnswers.length,
        average: calculateAverage(cleanAnswers),
        median: calculateMedian(cleanAnswers),
        modus: calculateModus(cleanAnswers),
      };

      numberStats[questionId] = stats;
    });

  return numberStats;
}

function calculateAverage(numbers) {
  const sum = numbers.reduce((acc, num) => acc + parseFloat(num), 0);
  return sum / numbers.length;
}

function calculateMedian(numbers) {
  const sortedNumbers = numbers.map(num => parseFloat(num)).sort((a, b) => a - b);
  const mid = Math.floor(sortedNumbers.length / 2);

  if (sortedNumbers.length % 2 === 0) {
    return (sortedNumbers[mid - 1] + sortedNumbers[mid]) / 2;
  } else {
    return sortedNumbers[mid];
  }
}

function calculateModus(numbers) {
  const numCount = {};
  let maxCount = 0;
  let modus = null;

  numbers.forEach(num => {
    numCount[num] = (numCount[num] || 0) + 1;
    if (numCount[num] > maxCount) {
      maxCount = numCount[num];
      modus = num;
    }
  });

  return parseInt(modus);
}

function createNumberStatsTable(questions, numberStats) {
  const numberStatsTable = document.createElement('table');
  numberStatsTable.classList.add('number-stats-table');

  const headerRow = numberStatsTable.insertRow();
  const questionHeader = headerRow.insertCell();
  questionHeader.textContent = 'Kérdés';
  const countHeader = headerRow.insertCell();
  countHeader.textContent = 'Darab';
  const averageHeader = headerRow.insertCell();
  averageHeader.textContent = 'Átlag';
  const medianHeader = headerRow.insertCell();
  medianHeader.textContent = 'Medián';
  const modusHeader = headerRow.insertCell();
  modusHeader.textContent = 'Módusz';

  Object.keys(numberStats).forEach(questionId => {
    const row = numberStatsTable.insertRow();
    const cellQuestion = row.insertCell();
    const question = questions.find(q => q.id.toString() === questionId.toString());

    const questionText = question.question;
    cellQuestion.textContent = questionText;

    const cellCount = row.insertCell();
    cellCount.textContent = numberStats[questionId].count;
    const cellAverage = row.insertCell();
    cellAverage.textContent = formatNumber(numberStats[questionId].average.toFixed(2)); // Limit average to 2 decimal places
    const cellMedian = row.insertCell();
    cellMedian.textContent = numberStats[questionId].median;
    const cellModus = row.insertCell();
    cellModus.textContent = numberStats[questionId].modus;
  });

  return numberStatsTable;
}

function formatNumber(number) {
  let formatted = parseFloat(number).toFixed(2).toString();
  formatted = formatted.replace(/\.?0+$/, '');
  return formatted;
}

function createUpdateField(questionnaireId, isActive, isPublic) {
  // Assuming updateDiv is already defined
  const updateDiv = document.getElementById('updateDiv');

  // Create form element
  const updateForm = document.createElement('form');

  // Create input for isActive
  const isActiveInput = document.createElement('input');
  isActiveInput.type = 'checkbox';
  isActiveInput.checked = isActive; // Set the initial value based on existing data
  isActiveInput.name = 'isActive';
  isActiveInput.id = 'isActive';
  const isActiveLabel = document.createElement('label');
  isActiveLabel.for = 'isActive';
  isActiveLabel.textContent = 'Aktív:';

  // Create input for isPublic
  const isPublicInput = document.createElement('input');
  isPublicInput.type = 'checkbox';
  isPublicInput.checked = isPublic; // Set the initial value based on existing data
  isPublicInput.name = 'isPublic';
  isPublicInput.id = 'isPublic';
  const isPublicLabel = document.createElement('label');
  isPublicLabel.for = 'isPublic';
  isPublicLabel.textContent = 'Nyilvánosan elérhető:';

  // Create submit button
  const submitButton = document.createElement('button');
  submitButton.type = 'submit';
  submitButton.textContent = 'Frissítés';

  // Add event listener for form submission
  updateForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent default form submission behavior
    const updatedData = {
      id: questionnaireId,
      isActive: event.target.isActive.checked,
      isPublic: event.target.isPublic.checked,
      // Add other fields as needed
    };
    // Call a function to handle the update in the database
    updateQuestionnaireData(updatedData);
  });

  // Create delete button
  const deleteButton = document.createElement('button');
  deleteButton.type = 'button'; // Set the type to button
  deleteButton.textContent = 'Kérdőív törlése';

  // Add event listener for delete button
  deleteButton.addEventListener('click', async function () {
    const confirmation = confirm('Biztos törölni akarod a kérdőívet?');

    if (confirmation) {
      deleteQuestionnaire(questionnaireId);
    }
    location.reload();
  });

  // Add inputs, labels, submit and delete button to the form
  updateForm.appendChild(isActiveLabel);
  updateForm.appendChild(isActiveInput);
  updateForm.appendChild(document.createElement('br')); // Add a line break for better readability
  updateForm.appendChild(isPublicLabel);
  updateForm.appendChild(isPublicInput);
  updateForm.appendChild(submitButton);
  updateForm.appendChild(document.createElement('br')); // Add a line break for better readability
  updateForm.appendChild(deleteButton);

  // Add the form to the updateDiv
  updateDiv.appendChild(updateForm);
}

// Function to update questionnaire data on the server
function updateQuestionnaireData(updatedData) {
  // Use fetch to send the updated data to the server (assuming your server has an endpoint for updating questionnaires)
  fetch('/update-questionnaire', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedData),
  })
    .then(response => response.json())
    .then(data => {
      //console.log('Update successful:', data);
      // Add any additional logic you need after a successful update
    })
    .catch(error => {
      console.error('Error updating questionnaire:', error);
      // Handle errors as needed
    });
}

async function deleteQuestionnaire(questionnaireId) {
  try {
    const response = await fetch(`/api/deleteQuestionnaire/${questionnaireId}`, {
      method: 'POST',
    });

    if (response.ok) {
      console.log('Questionnaire deleted successfully');
    } else {
      console.error('Error deleting questionnaire');
    }
  } catch (error) {
    console.error('Error deleting questionnaire:', error);
  }
}

let breakdown = {};
let numberStats = {};

Promise.all([fetchQuestionnaireData, fetchAnswersData])
  .then(([questionnairesData, answersData]) => {
    const questionnaire = questionnairesData.id === id ? questionnairesData : null;

    if (questionnaire) {
      const updateDiv = document.getElementById('updateDiv');
      createUpdateField(questionnaire.id, questionnaire.isActive, questionnaire.isPublic);

      const questions = questionnaire.questions;
      const filteredAnswers = answersData.filter(answer => parseInt(answer.questionnaireId) === id);

      breakdown = createBreakdown(questions, filteredAnswers);
      numberStats = createNumberStatistics(questions, filteredAnswers);

      const resultsDiv = document.getElementById('resultsDiv');

      if (resultsDiv) {
        const titleHeading = document.createElement('h2');
        titleHeading.textContent = questionnaire.title;
        resultsDiv.appendChild(titleHeading);

        const answerCountPara = document.createElement('p');
        const uniqueIds = new Set();
        filteredAnswers.forEach(answer => {
          uniqueIds.add(answer.id);
        });
        const uniqueIdsCount = uniqueIds.size;
        answerCountPara.textContent = `Kitöltések száma: ${uniqueIdsCount}`;
        resultsDiv.appendChild(answerCountPara);

        if (Object.keys(breakdown).length !== 0) {
          const breakdownTable = createBreakdownTable(breakdown);
          resultsDiv.appendChild(breakdownTable);
        }

        if (Object.keys(numberStats).length !== 0) {
          const numberStatsTable = createNumberStatsTable(questions, numberStats);
          resultsDiv.appendChild(numberStatsTable);
        }

        if (filteredAnswers.length !== 0) {
          const resultsTable = createResultsTable(questions, filteredAnswers);
          resultsDiv.appendChild(resultsTable);
        }
      } else {
        console.error('resultsDiv is null. Check the HTML for an element with id="resultsDiv".');
      }
    } else {
      console.error('No results found for this questionnaire ID.');
    }
  })
  .catch(error => {
    console.error('Error fetching data:', error);
    const errorDiv = document.createElement('p');
    errorDiv.textContent = 'Error fetching data. Please try again later.';
    const resultsDiv = document.getElementById('resultsDiv');
    if (resultsDiv) {
      resultsDiv.appendChild(errorDiv);
    } else {
      console.error('resultsDiv is null. Check the HTML for an element with id="resultsDiv".');
    }
  });