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

    res.json({ success: true, message: 'Erfolgreich eingeloggt!', username: username });
});


//Muffin Objekt
function getNamesFromFiles(folder, prefix) {
    return new Promise((resolve, reject) => {
      fs.readdir(`Bilder/${folder}`, (err, files) => {
        if (err) {
          reject(err);
          return;
        }
  

        const imageFiles = files.filter(file => path.extname(file).toLowerCase() === '.png');

        const names = imageFiles.map(file => path.basename(file, '.png').replace(`${prefix}_`, ''));
        resolve(names);
      });
    });
  }

  function generateData(names, folder, prefix) {
    return names.map((name, index) => ({
      id: index + 1,
      imageUrl: `Bilder/${folder}/${prefix}_${name}.png`,
      name: `${name} ${prefix}`,
      recipeUrl: `Rezepte/${folder}/${prefix}_${name}_Anleitung.txt`,
      ingredientsUrl: `Rezepte/${folder}/${prefix}_${name}_Zutaten.txt`
    }));
  }
  
  app.get('/muffins', async (req, res) => {
    try {
      const names = await getNamesFromFiles('Muffin', 'Muffin');
      const data = generateData(names, 'Muffin', 'Muffin');
      res.json({ muffins: data });
    } catch (error) {
      res.status(500).send(error.toString());
    }
  });
  
  app.get('/icings', async (req, res) => {
    try {
      const names = await getNamesFromFiles('Icing', 'Icing');
      const data = generateData(names, 'Icing', 'Icing');
      res.json({ icings: data });
    } catch (error) {
      res.status(500).send(error.toString());
    }
  });
  
  app.get('/toppings', async (req, res) => {
    try {
      const names = await getNamesFromFiles('Topping', 'Topping');
      const data = generateData(names, 'Topping', 'Topping');
      res.json({ toppings: data });
    } catch (error) {
      res.status(500).send(error.toString());
    }
  });