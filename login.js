document.addEventListener('DOMContentLoaded', function() {

    // Registrierung, holt benutzerdaten aus Form und sendet diese nach validierung an Server
    const registrationForm = document.querySelector('.form-box[action="/register"]');

    registrationForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const username = document.getElementById('reg-username').value;
        const password = document.getElementById('reg-password-1').value;
        const password2 = document.getElementById('reg-password-2').value;

        // Überprüfung ob die Passwörter übereinstimmen
        if (password !== password2) {
            showAlert('Die Passwörter stimmen nicht überein.');
            return;
        }

          // Überprüfung der Benutzernamenlänge und -charakter
          if (username.length < 4 || !/[a-zA-Z]/.test(username)) {
            showAlert('Der Benutzername muss mindestens 4 Zeichen lang sein und mindestens einen Buchstaben enthalten.');
            return;
        }

        // Überprüfung der Passwortlänge
        if (password.length < 8) {
            showAlert('Das Passwort muss mindestens 8 Zeichen lang sein.');
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
                setTimeout(() => { window.location.href = '/home.html'; }, 2000);
            } else {
                showAlert('Registrierung fehlgeschlagen: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Fehler bei der Registrierung:', error);
            showAlert('Fehler bei der Registrierung.');
        });
    });

    // Login, holt benutzerdaten aus Form und sendet diese an Server zum überprüfen
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
                setTimeout(() => { window.location.href = '/home.html'; }, 2000);
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