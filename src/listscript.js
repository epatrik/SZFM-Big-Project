fetch('/forms.json')
            .then(response => response.json())
            .then(data => {
                const formList = document.getElementById('formList');

                // Loop through the JSON data
                data.forEach(form => {
                    const listItem = document.createElement('li');
                    const link = document.createElement('a');

                    // Create a hyperlink for each form title
                    link.href = `/form/${form.id}`; // Create the link with the form's id
                    link.textContent = form.title; // Set the link text to the form's title

                    listItem.appendChild(link);
                    formList.appendChild(listItem);
                });
            })
            .catch(error => console.error('Error fetching forms:', error));