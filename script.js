function showAlert(message) {
    const alertBox = document.createElement('div');
    alertBox.textContent = message;
    alertBox.style.position = 'fixed';
    alertBox.style.left = '20px';
    alertBox.style.bottom = '20px';
    alertBox.style.backgroundColor = 'lightgreen';
    alertBox.style.padding = '10px';

    document.body.appendChild(alertBox);

    setTimeout(() => {
        alertBox.remove();
    }, 3000);
}


document.addEventListener('DOMContentLoaded', function() {

    // Registrierung
    const registrationForm = document.querySelector('.form-box[action="/register"]');

    registrationForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const username = document.getElementById('reg-username').value;
        const password = document.getElementById('reg-password-1').value;
        const password2 = document.getElementById('reg-password-2').value;

        if (password !== password2) {
            showAlert('Die Passwörter stimmen nicht überein.');
            return;
        }

        fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                showAlert('Registrierung erfolgreich. Sie werden jetzt zur Homepage weitergeleitet.');
                setTimeout(() => { window.location.href = '/home.html'; }, 3000);
            } else {
                showAlert('Registrierung fehlgeschlagen: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Fehler bei der Registrierung:', error);
            showAlert('Fehler bei der Registrierung.');
        });
    });

    // Login
    const loginForm = document.querySelector('.form-box[action="/login"]');

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;

        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                localStorage.setItem('loggedInUser', username);
                showAlert('Erfolgreich eingeloggt! Sie werden jetzt zur Homepage weitergeleitet.');
                setTimeout(() => { window.location.href = '/home.html'; }, 3000);
            } else {
                showAlert('Login fehlgeschlagen: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Fehler bei der Anmeldung:', error);
            showAlert('Fehler bei der Anmeldung.');
        });
    });
});