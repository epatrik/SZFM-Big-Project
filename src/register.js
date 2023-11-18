const name = document.querySelector('.name');
const email = document.querySelector('.email');
const password = document.querySelector('.password');
const submitBtn = document.querySelector('.submit-btn');

submitBtn.addEventListener('click', () => {
    fetch('/createUser', {
        method: 'post',
        headers: new Headers({
            'Content-Type': 'application/json'}),
        body: JSON.stringify({
            username: name.value,
            password: password.value,
            email: email.value
        })
    })
})