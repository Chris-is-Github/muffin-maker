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

    //Registrierung
    const registrationForm = document.querySelector('.form-box[action="/register"]');

    registrationForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const username = document.getElementById('reg-username').value;
        const password = document.getElementById('reg-password-1').value;
        const password2 = document.getElementById('reg-password-2').value;

        if (password !== password2) {
            alert('Die Passwörter stimmen nicht überein.');
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
                alert('Registrierung erfolgreich. Sie können sich jetzt einloggen.');
                window.location.href = '/login.html';
            } else {
                alert('Registrierung fehlgeschlagen: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Fehler bei der Registrierung:', error);
            alert('Fehler bei der Registrierung.');
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

                window.location.href = '/home.html';

                saveUserData(username);
            } else {

                alert('Login fehlgeschlagen: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Fehler bei der Anmeldung:', error);
            alert('Fehler bei der Anmeldung.');
        });
    });



    //Speichern (noch nicht in verwendung)
    function saveUserData(username) {
        fetch('/saveUserData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                // Daten
            }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log('Benutzerdaten erfolgreich gespeichert');
            } else {
                console.error('Fehler beim Speichern der Benutzerdaten');
            }
        })
        .catch(error => {
            console.error('Fehler beim Speichern der Benutzerdaten:', error);
        });
    }
});