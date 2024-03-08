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
    fetch('/getlogged')
        .then(response => response.text())
        .then(data => {
            const loginContainer = document.querySelector('.nav-login-dropdown');
            const loginLink = document.querySelector('.nav-login');
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
        });
});