function login() {
    document.getElementById('login-form').style.display = 'contents';
    document.getElementById('register-form').style.display = 'none';
}
function register() {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('register-form').style.display = 'contents';
}

function openPopup(eventId) {
    document.getElementById('eventid').value = eventId;
    document.getElementById('popup').style.display = 'block';
}

function closePopup() {
    document.getElementById('popup').style.display = 'none';
}

// Close the popup if the user clicks outside the popup content
window.onclick = function (event) {
    const popup = document.getElementById('popup');
    if (event.target === popup) {
        popup.style.display = 'none';
    }
};
