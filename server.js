//Setup
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', express.static(__dirname + '/'));
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/home.html');
});

app.listen(PORT, () => {
    console.log(`Server läuft auf Port ${PORT}`);
});


//Login//Registrierung
let users = {};
try {
    const data = fs.readFileSync('./users.json', 'utf8');
    users = JSON.parse(data);
} catch (err) {
    console.error('Fehler beim Lesen der Benutzerdatei, starte mit einem leeren Objekt:', err);
}

app.post('/register', (req, res) => {
    const username = req.body.username.toLowerCase();
    const { password } = req.body;
    if (users[username]) {
        return res.json({ success: false, message: 'Benutzername bereits vergeben.' });
    }
    // Das Passwort-Übereinstimmungsprüfung wird auf der Clientseite durchgeführt
    users[username] = { password };
    fs.writeFileSync('./users.json', JSON.stringify(users, null, 2));
    res.json({ success: true, message: 'Registrierung erfolgreich!' });
});

app.post('/login', (req, res) => {
    const username = req.body.username.toLowerCase();
    const { password } = req.body;
    if (!users[username] || users[username].password !== password) {
        return res.json({ success: false, message: 'Benutzername oder Passwort ungültig.' });
    }
    // Hier könnten Sie einen Login-Token oder eine Session-ID zurückgeben
    res.json({ success: true, message: 'Erfolgreich eingeloggt!', username: username });
});


//Muffin Objekt
function getMuffinNamesFromFiles() {
    return new Promise((resolve, reject) => {
      fs.readdir('Bilder/Muffin', (err, files) => {
        if (err) {
          reject(err);
          return;
        }
  
        // Filtern der Dateien, um nur PNG-Bilder zu behalten
        const imageFiles = files.filter(file => path.extname(file).toLowerCase() === '.png');
        // Extrahieren der Muffin-Namen aus den Dateinamen
        const muffinNames = imageFiles.map(file => path.basename(file, '.png').replace('Muffin_', ''));
        resolve(muffinNames);
      });
    });
  }
  
  function generateMuffinData(muffinNames) {
    return muffinNames.map((name, index) => ({
      id: index + 1,
      imageUrl: `Bilder/Muffin/Muffin_${name}.png`,
      name: `${name} Muffin`,
      recipeUrl: `Rezepte/Muffin/Muffin_${name}_Anleitung.txt`,
      ingredientsUrl: `Rezepte/Muffin/Muffin_${name}_Zutaten.txt`
    }));
  }
  
  app.get('/muffins', async (req, res) => {
    try {
      const muffinNames = await getMuffinNamesFromFiles();
      const muffins = generateMuffinData(muffinNames);
      res.json(muffins);
    } catch (error) {
      res.status(500).send(error.toString());
    }
  });
  