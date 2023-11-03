const queryString = window.location.pathname;
const index = queryString.split('/').pop();

fetch('/forms.json')
    .then(response => response.json())
    .then(data => {
        const specificData = data[index];
    
        const dataContainer = document.getElementById('dataContainer');
        const keys = Object.keys(specificData);
    
        keys.forEach(key => {
            const para = document.createElement('p');
            para.textContent = `${key}: ${specificData[key]}`;
            dataContainer.appendChild(para);
        });
    })
    .catch(error => console.error('Error fetching data:', error));