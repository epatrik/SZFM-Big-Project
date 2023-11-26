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

let breakdown = {};
let numberStats = {};

Promise.all([fetchQuestionnaireData, fetchAnswersData])
  .then(([questionnairesData, answersData]) => {
    const questionnaire = questionnairesData.id === id ? questionnairesData : null;

    if (questionnaire) {
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