//Setup
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const session = require('express-session');
const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/', express.static(__dirname + '/'));
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/home.html');
});

app.listen(PORT, () => {
    console.log(`Server läuft auf Port ${PORT}`);
});

app.use(session({
  secret: 'muffinMaker123',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}));

//Login//Registrierung
let users = {};
try {
    const data = fs.readFileSync('./users.json', 'utf8');
    users = JSON.parse(data);
} catch (err) {
    console.error('Fehler beim Lesen der Benutzerdatei, starte mit einem leeren Objekt:', err);
}

app.post('/register', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    if (users[username]) {
        return res.json({ success: false, message: 'Benutzername bereits vergeben.' });
    }

    users[username] = { password };
    fs.writeFileSync('./users.json', JSON.stringify(users, null, 2));
    req.session.loggedin = true;
    req.session.username = username;
    res.json({ success: true, message: 'Registrierung erfolgreich!' });
});

app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    if (!users[username] || users[username].password !== password) {
        return res.json({ success: false, message: 'Benutzername oder Passwort ungültig.' });
    }

    req.session.loggedin = true;
    req.session.username = username;
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
      id: index,
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

  //Meine Muffins Speichern
  app.post('/addMuffin', (req, res) => {
    if (req.session.loggedin) {
        const { icing, topping, muffinBase } = req.body;
        const username = req.session.username;

        if (!users[username].muffins) {
            users[username].muffins = {};
        }

        const numOfMuffins = Object.keys(users[username].muffins).length;

        const muffinName = `muffin${numOfMuffins + 1}`;

        users[username].muffins[muffinName] = { icing, topping, muffinBase };

        fs.writeFileSync('./users.json', JSON.stringify(users, null, 2)); // Daten speichern

        res.json({ success: true, message: 'Muffin-Daten hinzugefügt/aktualisiert.' });
    } else {
        res.json({ success: false, message: 'Nicht eingeloggt.' });
    }
});


//getuserdata
app.post('/')