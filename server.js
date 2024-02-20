const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use('/public', express.static(__dirname + '/public'));
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/home.html');
});

app.listen(PORT, () => {
    console.log(`Server läuft auf Port ${PORT}`);
});

const users = {};

app.post('/register', (req, res) => {
    const username = req.body.username.toLowerCase();
    const { password } = req.body;
    if (users[username]) {
        return res.send('Benutzername bereits vergeben.');
    }
    if(req.body.password != req.body.password2){
        return res.send("Passwörter stimmen nicht überein");
    }
    users[username] = { password };
    fs.writeFileSync('./users.json', JSON.stringify(users, null, 2));
    res.send('Registrierung erfolgreich!');
});

app.post('/login', (req, res) => {
    const username = req.body.username.toLowerCase();
    const { password } = req.body;
    if (!users[username] || users[username].password !== password) {
        return res.send('Benutzername oder Passwort ungültig.');

    }
    res.send('Erfolgreich eingeloggt!');
});
