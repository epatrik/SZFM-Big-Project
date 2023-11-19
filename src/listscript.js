fetch('/questionnaires')
    .then(response => response.json())
    .then(data => {
        const questionnaireList = document.getElementById('questionnaireList');

        const activeQuestionnaires = data.filter(questionnaire => questionnaire.isActive);

        activeQuestionnaires.forEach(questionnaire => {
            const listItem = document.createElement('li');
            const link = document.createElement('a');

            link.href = `/questionnaire/${questionnaire.id}`;
            link.textContent = questionnaire.title;

            listItem.appendChild(link);
            questionnaireList.appendChild(listItem);
        });
    })
    .catch(error => console.error('Error fetching questionnaires:', error));