fetch('/questionnaires')
    .then(response => response.json())
    .then(data => {
        const formList = document.getElementById('formList');

        const activeQuestionnaires = data.filter(form => form.isActive);

        activeQuestionnaires.forEach(form => {
            const listItem = document.createElement('li');
            const link = document.createElement('a');

            link.href = `/form/${form.id}`;
            link.textContent = form.title;

            listItem.appendChild(link);
            formList.appendChild(listItem);
        });
    })
    .catch(error => console.error('Error fetching questionnaires:', error));