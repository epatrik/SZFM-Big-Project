const name = document.querySelector('.name');
const password = document.querySelector('.password');
const submitBtn = document.querySelector('.submit-btn');

submitBtn.addEventListener('click', async () => {
    try {
        const response = await fetch('/loginUser', {
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