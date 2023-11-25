const username = document.querySelector('.name');
const email = document.querySelector('.email');
const password = document.querySelector('.password');
const submitBtn = document.querySelector('.submit-btn');

window.onload = () => {
    if(sessionStorage.id){
        location.href = '/';
    }
}

submitBtn.addEventListener('click', async () => {
    try {
        const response = await fetch('/api/createUser', {
            method: 'post',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({
                username: username.value,
                password: password.value,
                email: email.value
            })
        });

        const message = await response.json();
        if (message == "Created") {
            console.log('User created successfully!');
            location.href = '/login';
        } else {
            console.log('Failed to create user');
            alertBox(message);
        }
    } catch (error) {
        console.error('An error occurred during the fetch:', error);
        // Handle unexpected errors, maybe display a generic error message.
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const inputs = document.querySelectorAll("input");
    const submitBtn = document.querySelector(".submit-btn");

    inputs.forEach((input, index) => {
        input.addEventListener("keypress", function (event) {
            if (event.key === "Enter") {
                event.preventDefault();

                // Jump to the next input
                const nextIndex = index + 1;
                if (nextIndex < inputs.length) {
                    inputs[nextIndex].focus();
                } else {
                    // If at the last input (password), trigger the submit button
                    submitBtn.click();
                }
            }
        });
    });
});

const alertBox = (data) => {
    const alertContainer = document.querySelector('.alert-box');
    const alertMsg = document.querySelector('.alert');
    alertMsg.innerHTML = data;

    alertContainer.style.top = `5%`;
    setTimeout(() => {
        alertContainer.style.top = null;
    }, 5000);
}