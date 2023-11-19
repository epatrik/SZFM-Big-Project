console.log('Script file loaded.');
const loginButton = document.getElementById("login");
const createButton = document.getElementById("create");
const dataButton = document.getElementById("data");
const logOut = document.querySelector('.logout');

window.onload = () => {
    if(sessionStorage.id){
        console.log("User is logged in.");
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

logOut.onclick = () => {
    sessionStorage.clear();
    location.reload();
}