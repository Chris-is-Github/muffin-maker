let muffins = [];
let icings = [];
let toppings = [];

function createMuffinSection(idSuffix, muffinID, icingID, toppingID) {
    const section = document.createElement('section');
    section.className = 'muffin';
    section.id = `muffin${idSuffix}`;

    const divName = document.createElement('div');
    divName.className = 'name';
    divName.id = `name${idSuffix}`;
    section.appendChild(divName);

    const divBild = document.createElement('div');
    divBild.className = 'bild';
    divBild.id = `muffin${idSuffix}__bild`;
    divName.appendChild(divBild);

    const imgMuffin = document.createElement('img');
    imgMuffin.className = 'bild__muffin';
    imgMuffin.src = muffins[muffinID].imageUrl;
    imgMuffin.alt = 'Muffin Bild';
    divBild.appendChild(imgMuffin);

    const imgIcing = document.createElement('img');
    imgIcing.className = 'bild__icing';
    imgIcing.src = icings[icingID].imageUrl;
    imgIcing.alt = 'Icing Bild';
    divBild.appendChild(imgIcing);

    const imgTopping = document.createElement('img');
    imgTopping.className = 'bild__topping';
    imgTopping.src = toppings[toppingID].imageUrl;
    imgTopping.alt = 'Topping Bild';
    divBild.appendChild(imgTopping);

    const h2 = document.createElement('h2');
    h2.className = 'name--style';
    h2.id = `name${idSuffix}__titel`;
    h2.textContent = muffins[muffinID].name + " " + icings[icingID].name + " " + toppings[toppingID].name;
    divName.appendChild(h2);

    const button = document.createElement('button');
    button.id = `buttonDropDown${idSuffix}`;
    button.className = 'pfeilButton';
    divName.appendChild(button);

    const imgPfeil = document.createElement('img');
    imgPfeil.id = `pfeilBild${idSuffix}`;
    imgPfeil.className = 'pfeilButton__bild--rechts';
    imgPfeil.src = '../Bilder/pfeilRechts.png';
    imgPfeil.alt = 'Pfeil Button';
    button.appendChild(imgPfeil);

    const divDropDown = document.createElement('div');
    divDropDown.className = 'dropDown';
    divDropDown.id = `muffin${idSuffix}__dropDown`;
    section.appendChild(divDropDown);

    // Zutaten-Container
    const zutaten = document.createElement('div');
    zutaten.className = 'zutaten';
    zutaten.id = `muffin${idSuffix}__zutaten`;

    const zutatenTitel = document.createElement('h3');
    zutatenTitel.className = 'zutaten__titel';
    zutatenTitel.textContent = 'Zutaten';

    const zutatenListe = document.createElement('section');
    zutatenListe.className = 'zutaten__liste';

    const zutatenInfo = document.createElement('p');
    zutatenInfo.innerHTML = 'Zutaten für <b>12</b> Muffins';

    const muffinHeader = document.createElement('h4');
    muffinHeader.className = 'zutaten__überschrift';
    muffinHeader.textContent = 'Muffin';

    const muffinZutatenSection = document.createElement('section');
    muffinZutatenSection.id = `muffin${idSuffix}__zutaten--einfügen`;

    const icingHeader = document.createElement('h4');
    icingHeader.className = 'zutaten__überschrift';
    icingHeader.textContent = 'Icing';

    const icingZutatenSection = document.createElement('section');
    icingZutatenSection.id = `icing${idSuffix}__zutaten--einfügen`;

    const toppingHeader = document.createElement('h4');
    toppingHeader.className = 'zutaten__überschrift';
    toppingHeader.textContent = 'Topping';

    const toppingZutatenSection = document.createElement('section');
    toppingZutatenSection.id = `topping${idSuffix}__zutaten--einfügen`;

    zutatenListe.append(zutatenInfo, muffinHeader, muffinZutatenSection, icingHeader, icingZutatenSection, toppingHeader, toppingZutatenSection);
    zutaten.append(zutatenTitel, zutatenListe);

    // Anleitungs-Container
    const anleitung = document.createElement('div');
    anleitung.className = 'anleitung';
    anleitung.id = `muffin${idSuffix}__anleitung`;

    const anleitungTitel = document.createElement('h3');
    anleitungTitel.className = 'anleitung__titel';
    anleitungTitel.textContent = 'Anleitung';

    const anleitungListe = document.createElement('section');
    anleitungListe.className = 'anleitung_liste';

    const muffinAnleitungHeader = document.createElement('h4');
    muffinAnleitungHeader.className = 'anleitung__überschrift';
    muffinAnleitungHeader.textContent = 'Muffin';

    const muffinAnleitungSection = document.createElement('section');
    muffinAnleitungSection.id = `muffin${idSuffix}__anleitung--einfügen`;

    const icingAnleitungHeader = document.createElement('h4');
    icingAnleitungHeader.className = 'anleitung__überschrift';
    icingAnleitungHeader.textContent = 'Icing';

    const icingAnleitungSection = document.createElement('section');
    icingAnleitungSection.id = `icing${idSuffix}__anleitung--einfügen`;

    const toppingAnleitungHeader = document.createElement('h4');
    toppingAnleitungHeader.className = 'anleitung__überschrift';
    toppingAnleitungHeader.textContent = 'Topping';

    const toppingAnleitungSection = document.createElement('section');
    toppingAnleitungSection.id = `topping${idSuffix}__anleitung--einfügen`;

    anleitungListe.append(muffinAnleitungHeader, muffinAnleitungSection, icingAnleitungHeader, icingAnleitungSection, toppingAnleitungHeader, toppingAnleitungSection);
    anleitung.append(anleitungTitel, anleitungListe);

    document.body.appendChild(section);
}

function txtInListeEinfuegen(txtDatei, einfuegeID) {
    // Funktion fügt txt Datei in html, bei einem bestimmten Element als Liste ein
    fetch(txtDatei)
        .then(response => response.text())
        .then(inhalt => {
            const zeilen = inhalt.split('\n');
            // "zeilen" beinhaltet alle Zeilen aus der txt-Datei
            const einfuegePunkt = document.getElementById(einfuegeID);
            // definiert Ort im HTML Dokument, wo die Liste eingefügt werden soll

            if (!einfuegePunkt) {
                console.error('Einfüge Punkt nicht gefunden');
                return;
            }

            let liste = document.createElement('ul');
            zeilen.forEach(line => {
                // loop geht durch jede Zeile durch und fügt jede Zeile in ein <li> Element,
                // es sei denn die Zeile ist leer, dann wird eine neue Liste angefangen
                if (line.trim() === '') {
                    einfuegePunkt.appendChild(liste);
                    liste = document.createElement('ul');
                } else {
                    const li = document.createElement('li');
                    li.textContent = line.trim();
                    liste.appendChild(li);
                }
            });
            einfuegePunkt.appendChild(liste);
        })
        .catch(error => console.error('Fehler beim Laden der Datei:', error));
}

async function fetchData() {
    try {
        const muffinResponse = await fetch('/muffins');
        if (!muffinResponse.ok) throw new Error('Netzwerkantwort für Muffins nicht ok');
        const muffinData = await muffinResponse.json();
        muffins = muffinData.muffins;

        const toppingResponse = await fetch('/toppings');
        if (!toppingResponse.ok) throw new Error('Netzwerkantwort für Toppings nicht ok');
        const toppingData = await toppingResponse.json();
        toppings = toppingData.toppings;

        const icingResponse = await fetch('/icings');
        if (!icingResponse.ok) throw new Error('Netzwerkantwort für Icings nicht ok');
        const icingData = await icingResponse.json();
        icings = icingData.icings;

        console.log(muffins)
        
        createMuffinSection(1, 3, 3, 4);
    } catch (error) {
        console.error('Fehler beim Laden der Daten:', error);
    }
}

/* txtInListeEinfuegen(muffins[ID].recipeUrl, `muffin${idSuffix}__zutaten--einfügen`);
txtInListeEinfuegen(icings[ID].recipeUrl, `icing${idSuffix}__zutaten--einfügen`)
txtInListeEinfuegen(toppings[ID].recipeUrl, `topping${idSuffix}__zutaten--einfügen`)

txtInListeEinfuegen(muffins[ID].ingredientsUrl, `muffin${idSuffix}__anleitung--einfügen`)
txtInListeEinfuegen(muffins[ID].ingredientsUrl, `icing${idSuffix}__anleitung--einfügen` )
txtInListeEinfuegen(muffins[ID].ingredientsUrl, `topping${idSuffix}__anleitung--einfügen`) */


fetchData();