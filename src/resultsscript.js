const queryString = window.location.pathname;
const id = parseInt(queryString.split('/').pop()); // Parse questionnaireId as integer

const fetchQuestionnaireData = fetch('/api/questionnaireData/:id').then(response => response.json());
const fetchAnswersData = fetch('/api/answers/:id').then(response => response.json());

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
        const options = question.answers;
        breakdown[question.question] = {};
  
        options.forEach(option => {
          breakdown[question.question][option] = 0;
        });
  
        filteredAnswers.forEach(answer => {
          const index = question.id;
          const chosenOption = answer.answers[index];
          if (chosenOption !== '') {
            breakdown[question.question][chosenOption]++;
          }
        });
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
  
    filteredAnswers.forEach(answer => {
      const answerRow = resultsTable.insertRow();
      answer.answers.forEach((ans, index) => {
        const td = answerRow.insertCell();
        td.textContent = ans;
      });
    });
  
    return resultsTable;
}

function createNumberStatistics(questions, filteredAnswers) {
    const numberStats = {};
  
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
  
        return modus;
    }

    questions
    .filter(question => question.type === 'numberInput')
    .forEach(question => {
        const answers = filteredAnswers.map(answer => answer.answers[question.id]);
        const cleanAnswers = answers.filter(answer => answer !== '');

        const stats = {
            count: cleanAnswers.length,
            average: calculateAverage(cleanAnswers),
            median: calculateMedian(cleanAnswers),
            modus: calculateModus(cleanAnswers),
        };

        numberStats[question.question] = stats;
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

function createNumberStatsTable(numberStats) {
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
  
    Object.keys(numberStats).forEach(question => {
      const row = numberStatsTable.insertRow();
      const cellQuestion = row.insertCell();
      cellQuestion.textContent = question;
      const cellCount = row.insertCell();
      cellCount.textContent = numberStats[question].count;
      const cellAverage = row.insertCell();
      cellAverage.textContent = numberStats[question].average.toFixed(2); // Limit average to 2 decimal places
      const cellMedian = row.insertCell();
      cellMedian.textContent = numberStats[question].median.toFixed(2); // Limit median to 2 decimal places
      const cellModus = row.insertCell();
      cellModus.textContent = numberStats[question].modus.toFixed(2); // Limit modus to 2 decimal places
    });
  
    return numberStatsTable;
}

let breakdown = {};
let numberStats = {};

Promise.all([fetchQuestionnaireData, fetchAnswersData])
  .then(([questionnairesData, answersData]) => {
    const questionnaire = questionnairesData.find(questionnaire => questionnaire.id === id);

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
        answerCountPara.textContent = `Kitöltések száma: ${filteredAnswers.length}`;
        resultsDiv.appendChild(answerCountPara);

        if (Object.keys(breakdown).length !== 0) {
          const breakdownTable = createBreakdownTable(breakdown);
          resultsDiv.appendChild(breakdownTable);
        }

        if (Object.keys(numberStats).length !== 0) {
          const numberStatsTable = createNumberStatsTable(numberStats);
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