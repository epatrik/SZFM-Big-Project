console.log('Script file loaded.');
const loginButton = document.getElementById("login");
const createButton = document.getElementById("create");
const dataButton = document.getElementById("data");
const logOut = document.querySelector('.logout');

window.onload = () => {
    if(sessionStorage.id){
        console.log("User '" + sessionStorage.username +"' is logged in.");
        loginButton.style.display = "none";
        createButton.style.display = "block";
        dataButton.style.display = "block";
        logOut.style.display = "block";
    } else{
        console.log("User is not logged in.");
        loginButton.style.display = "block";
        createButton.style.display = "none";
        dataButton.style.display = "none";
        logOut.style.display = "none";
    }
}

logOut.addEventListener('click', async () => {
    try {
        const response = await fetch('/api/logout', {
            method: 'get',
        });

        if (response.ok) {
            console.log('Logout successful');
            sessionStorage.clear(); // Clear any client-side storage
            location.href = '/'; // Redirect to the login page or any other desired page
        } else {
            console.log('Logout failed');
        }
    } catch (error) {
        console.error('An error occurred during the fetch:', error);
        // Handle unexpected errors, maybe display a generic error message.
    }
});