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
        event.preventDefault(); // Verhindern der Standardformularübermittlung

        const username = document.getElementById('reg-username').value;
        const password = document.getElementById('reg-password-1').value;
        const password2 = document.getElementById('reg-password-2').value;

        // Überprüfen, ob die Passwörter übereinstimmen
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
                // Erfolgreiche Registrierung, Benutzer kann sich nun einloggen
                alert('Registrierung erfolgreich. Sie können sich jetzt einloggen.');
                // Umleitung zur Login-Seite oder zur Hauptseite
                window.location.href = '/login.html'; // Ändern Sie dies entsprechend Ihrer Dateistruktur
            } else {
                // Fehlerbehandlung, z.B. Anzeigen einer Fehlermeldung
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
                // Speichern des Benutzernamens im lokalen Speicher für zukünftige Referenz
                localStorage.setItem('loggedInUser', username);
                // Umleitung zur Hauptseite oder zur gewünschten Seite
                window.location.href = '/home.html';
                // Funktion um Benutzerdaten zu speichern (muss auf dem Server implementiert sein)
                saveUserData(username);
            } else {
                // Fehlerbehandlung, z.B. Anzeigen einer Fehlermeldung
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