// Funktion zum Anzeigen einer temporären Benachrichtigung auf der Webseite
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

// Event-Listener, der beim Laden des Dokuments ausgeführt wird
document.addEventListener('DOMContentLoaded', function() {
    fetch('/getlogged') // Anfrage an den Server, um den Anmeldestatus zu erhalten
        .then(response => response.text())
        // Wenn angemeldet dann wird der Name in der Navbar angezeigt
        .then(data => {
            const loginContainer = document.querySelector('.nav-login-dropdown');
            const loginLink = document.querySelector('.nav-login');
            const meineMuffinsLink = document.querySelector('a[href="meineMuffins.html"]');
            if (data !== 'Login') {
                loginLink.textContent = data;
                loginLink.href = '#';

                const logoutDropdown = document.createElement('div');
                logoutDropdown.classList.add('nav-login-dropdown-content');
                const logoutLink = document.createElement('a');
                logoutLink.href = '/logout';
                logoutLink.textContent = 'Abmelden';
                logoutDropdown.appendChild(logoutLink);
                loginContainer.appendChild(logoutDropdown);
            }
            else {
                // Wenn benutzer nicht eingeloggt Meine Muffins sperren
                meineMuffinsLink.addEventListener('click', function(event) {
                    event.preventDefault(); 
                    showAlert('Bitte melde dich an!'); 
                });
            }
            
        });
});