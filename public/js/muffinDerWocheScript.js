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

//Einfügen aller txt Datien an dem jeweiligen Ort
txtInListeEinfuegen('Rezepte/Muffin/Muffin_TrippelSchoko_Zutaten.txt', 'muffinDerWoche--zutaten--muffin');
txtInListeEinfuegen('Rezepte/Icing/Icing_Erdbeer_Zutaten.txt', 'muffinDerWoche--zutaten--icing' )
txtInListeEinfuegen('Rezepte/Topping/Topping_ZweiSchoko_Zutaten.txt', 'muffinDerWoche--zutaten--topping')

txtInListeEinfuegen('Rezepte/Muffin/Muffin_TrippelSchoko_Anleitung.txt', 'muffinDerWoche--rezept--muffin');
txtInListeEinfuegen('Rezepte/Icing/Icing_Erdbeer_Anleitung.txt', 'muffinDerWoche--rezept--icing' )
txtInListeEinfuegen('Rezepte/Topping/Topping_ZweiSchoko_Anleitung.txt', 'muffinDerWoche--rezept--topping')