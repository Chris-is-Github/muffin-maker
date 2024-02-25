const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const PORT = 3000;


const folder_icing = 'Bilder/Icing';
const folder_muffin = 'Bilder/Muffin';
const folder_topping = 'Bilder/Topping';

const folder_icing_rezept = 'Bilder/Icing';
const folder_muffin_rezept = 'Bilder/Muffin';
const folder_topping_rezept = 'Bilder/Topping';

/* let name;
let bild;
let rezept;
 */
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', express.static(__dirname + '/'));
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/home.html');
});

app.listen(PORT, () => {
    console.log(`Server läuft auf Port ${PORT}`);
});


const icing = {
   
};
const muffin = {};
const topping = {};

app.post("/home",

    function getbilder() {
        let e = 0;





        fs.readdirSync(folder_icing).forEach( 
        icing[index.name]=element 

      

        );
        
        

        function myFunction(name,bild) {
            icing[e.name] = name;
            icing[e.bild] = bild;
            icing[e.zutat] = zutat;

            e++;
            /* console.log(images[e]); */
        }

    }
);



const users = {};

app.post('/register', (req, res) => {
    const username = req.body.username.toLowerCase();
    const { password } = req.body;
    if (users[username]) {
        return res.send('Benutzername bereits vergeben.');
    }
    if (req.body.password != req.body.password2) {
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





