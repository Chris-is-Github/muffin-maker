
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
                console.error('Einfügepunkt nicht gefunden');
                return;
            }

            let liste = document.createElement('ul');
            zeilen.forEach(line => {
                // loop geht durch jede Zeile durch und fügt jede Zeile in ein <li> Element,
                // es sei denn die Zeile leer ist, dann wird eine neue Liste angefangen
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

txtInListeEinfuegen('Muffin_ChocolateChip_Zutaten.txt', 'muffin1__zutaten--einfügen');
txtInListeEinfuegen('Icing_Erdbeer_Zutaten.txt', 'icing1__zutaten--einfügen' )
txtInListeEinfuegen('Topping_Amerika_Zutaten.txt', 'topping1__zutaten--einfügen')

txtInListeEinfuegen('Muffin_ChocolateChip_Anleitung.txt', 'muffin1__anleitung--einfügen')
txtInListeEinfuegen('Icing_Erdbeer_Anleitung.txt', 'icing1__anleitung--einfügen' )
txtInListeEinfuegen('Topping_Amerika_Anleitung.txt', 'topping1__anleitung--einfügen')

