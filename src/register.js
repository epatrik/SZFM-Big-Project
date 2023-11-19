const name = document.querySelector('.name');
const email = document.querySelector('.email');
const password = document.querySelector('.password');
const submitBtn = document.querySelector('.submit-btn');

submitBtn.addEventListener('click', async () => {
    try {
        const response = await fetch('/createUser', {
            method: 'post',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({
                username: name.value,
                password: password.value,
                email: email.value
            })
        });

        if (response.ok) {
            console.log('User created successfully!');
            // You might want to redirect the user or perform other actions.
        } else {
            console.error('Failed to create user:', response.statusText);
            // Handle errors, maybe display an error message to the user.
        }
    } catch (error) {
        console.error('An error occurred during the fetch:', error);
        // Handle unexpected errors, maybe display a generic error message.
    }
});