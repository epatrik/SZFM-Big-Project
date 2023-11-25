const name = document.querySelector('.name');
const password = document.querySelector('.password');
const submitBtn = document.querySelector('.submit-btn');

window.onload = () => {
    if(sessionStorage.id){
        location.href = '/';
    }
}

submitBtn.addEventListener('click', async () => {
    try {
        const response = await fetch('/api/loginUser', {
            method: 'post',
            headers: new Headers({
                'Content-Type': 'application/json'}),
            body: JSON.stringify({
                username: name.value,
                password: password.value
            })
        })

        const loginMessage = await response.json();
        if (loginMessage.id) {
            console.log(loginMessage.username + ' logged in successfully!');
            sessionStorage.id = loginMessage.id;
            sessionStorage.username = loginMessage.username;
            location.href = '/';
        } else {
            console.log(loginMessage);
        }
    } catch (error) {
        console.error('An error occurred during the fetch:', error);
        // Handle unexpected errors, maybe display a generic error message.
    }
})

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