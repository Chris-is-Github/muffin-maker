// Setup
const express = require('express'); // Express Framework
const bodyParser = require('body-parser'); // Middleware zur Analyse eingehender Anfragen
const fs = require('fs'); // Dateisystem-Modul zum Lesen und Schreiben von Dateien
const path = require('path'); // Modul zur Arbeit mit Dateipfaden
const session = require('express-session'); // Middleware für Sitzungsverwaltung
const bcrypt = require('bcrypt'); // Passwort Hashen
const app = express(); // Eine neue Express-Anwendung erstellen
const PORT = 3000; // Port festlegen

// Middleware zur Verarbeitung von Daten in verschiedenen Formaten
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

// Statischen Inhalt aus dem aktuellen Verzeichnis bereitstellen
app.use(express.static(path.join(__dirname, 'views')));
app.use(express.static(path.join(__dirname, 'public')));

// Route für die Startseite
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'home.html'));
});
// Server auf festgelegtem Port starten
app.listen(PORT, () => {
    console.log(`Server läuft auf Port ${PORT}`);
});

// Session-Konfiguration
app.use(session({
  secret: 'muffinMaker123', // Geheimer Schlüssel
  resave: false, // Verhindert das Sitzungen ohne Änderungen gespeichert werden
  saveUninitialized: true, // Speichert neue, aber nicht modifizierte Sitzungen
  cookie: { secure: false } // HTTPS nicht erforderlich
}));

//Login//Registrierung
let users = {}; // Objekt zur Speicherung der Benutzerdaten
try {
    const data = fs.readFileSync('./data/users.json', 'utf8'); // Benutzerdaten aus Datei lesen
    users = JSON.parse(data); // Benutzerdaten in Objekt umwandeln
} catch (err) {
    console.error('Fehler beim Lesen der Benutzerdatei, starte mit einem leeren Objekt:', err);
}

// Route für die Registrierung
app.post('/register', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    if (users[username]) {
        return res.json({ success: false, message: 'Benutzername bereits vergeben.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    users[username] = { password: hashedPassword };
    fs.writeFileSync('./data/users.json', JSON.stringify(users, null, 2));
    req.session.loggedin = true;
    req.session.username = username;

    res.json({ success: true, message: 'Registrierung erfolgreich!' });
});

// Route für den Login
app.post('/login', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    if (!users[username] || !(await bcrypt.compare(password, users[username].password))) {
      return res.json({ success: false, message: 'Benutzername oder Passwort ungültig.' });
  }

    req.session.loggedin = true;
    req.session.username = username;

    res.json({ success: true, message: 'Erfolgreich eingeloggt!', username: username });
});

// Route um den eingeloggten Benutzernamen zu erhalten
app.get('/getlogged', (req, res) => {
  if (req.session.loggedin) {
      res.send(req.session.username);
  } else {
      res.send('Login');
  }
});

// Route für das Logout
app.get('/logout', (req, res) => {
  req.session.destroy(() => {
      res.redirect('/');
  });
});

// Funktionen zum Lesen von Dateien und Generieren von Muffin-Daten
function getNamesFromFiles(folder, prefix) {
    return new Promise((resolve, reject) => {
      fs.readdir(`public/assets/Bilder/${folder}`, (err, files) => {
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
      imageUrl: `assets/Bilder/${folder}/${prefix}_${name}.png`,
      name: `${name} ${prefix}`,
      recipeUrl: `assets/Rezepte/${folder}/${prefix}_${name}_Anleitung.txt`,
      ingredientsUrl: `assets/Rezepte/${folder}/${prefix}_${name}_Zutaten.txt`
    }));
  }
  
  // Routes zur Abfrage von Muffin-, Icing- und Topping-Daten
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

  // Route zum Hinzufügen von Muffin-Daten für eingeloggte Benutzer
  app.post('/addMuffin', (req, res) => {
    if (req.session.loggedin) {
        const { icing_id, topping_id, muffinBase_id } = req.body;
        const username = req.session.username;

        if (!users[username].muffins) {
            users[username].muffins = {};
        }

        let muffinExists = false;
        for (const muffinKey in users[username].muffins) {
            const muffin = users[username].muffins[muffinKey];
            if (muffin.icing_id === icing_id && muffin.topping_id === topping_id && muffin.muffinBase_id === muffinBase_id) {
                muffinExists = true;
                break;
            }
        }

        if (!muffinExists) {
            const muffinName = `${Object.keys(users[username].muffins).length + 1}`;
            users[username].muffins[muffinName] = { icing_id, topping_id, muffinBase_id };

            fs.writeFileSync('./data/users.json', JSON.stringify(users, null, 2));

            res.json({ success: true, message: 'Muffin-Daten hinzugefügt.' });
        } else {
            res.json({ success: false, message: 'Dieser Muffin wurde bereits gespeichert.' });
        }
    } else {
        res.json({ success: false, message: 'Nicht eingeloggt.' });
    }
});

// Route zum Abrufen von gespeicherten Muffin-Daten des Benutzers
app.get('/getMyMuffins', (req, res) => {
  if (req.session.loggedin) {
      const username = req.session.username;

      if (users[username].muffins) {
          res.json({ success: true, muffins: users[username].muffins });
      } else {
          res.json({ success: false, message: 'Keine Muffins gefunden.' });
      }
  } else {
      res.json({ success: false, message: 'Nicht eingeloggt.' });
  }
});