// Initialisierung von Variablen für Muffin-, Topping- und Icing-Zahlen sowie Arrays für Daten
let muffin_zahl = 0;
let topping_zahl = 0;
let icing_zahl = 0;

let topping = [];
let muffin = [];
let icing = [];

let icing_id;
let topping_id;
let muffinBase_id;


// Fetch-Anfragen für Muffin-, Topping- und Icing-Daten
fetch("/muffins")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Netzwerkantwort nicht ok");
    }
    return response.json();
  })
  .then((data) => {
    muffin = data.muffins;
    //Anfangs Muffin der auf der Homepage angezeigt werden 
    document.getElementById("muffin-home").src = muffin[0].imageUrl;
    document.getElementById("text-muffin").textContent = muffin[0].name;
    txtInListeEinfuegen(muffin[0].ingredientsUrl, "muffin1zutaten--einfügen");
  })
  .catch((error) => {
    showAlert("Fehler beim Fetchen der Muffin-Daten:", error);
  });

fetch("/toppings")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Netzwerkantwort nicht ok");
    }
    return response.json();
  })
  .then((data) => {
    //Anfangs Toppings der auf der Homepage angezeigt werden 
    topping = data.toppings;
    document.getElementById("topping-home").src = topping[0].imageUrl;
    document.getElementById("text-topping").textContent = topping[0].name;
    txtInListeEinfuegen(topping[0].ingredientsUrl, "topping1zutaten--einfügen");
  })
  .catch((error) => {
    showAlert("Fehler beim Fetchen der Muffin-Daten:", error);
  });

fetch("/icings")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Netzwerkantwort nicht ok");
    }
    return response.json();
  })
  .then((data) => {
    //Anfangs Icing der auf der Homepage angezeigt werden 
    icing = data.icings;
    document.getElementById("icing-home").src = icing[0].imageUrl;
    document.getElementById("text-icing").textContent = icing[0].name;
    txtInListeEinfuegen(icing[0].ingredientsUrl, "icing1zutaten--einfügen");
  })
  .catch((error) => {
    showAlert("Fehler beim Fetchen der Muffin-Daten:", error);
  });


  // Fallunterscheidung für verschiedene Buttons
function change_muffin(button) {
  switch (button) {
    //Button nach links gedrückt
    case 1:
      icing_zahl--;
      if (icing_zahl < 0) {
        icing_zahl = icing.length - 1;
      }
      document.getElementById("icing-home").src = icing[icing_zahl].imageUrl;
      document.getElementById("text-icing").textContent = icing[icing_zahl].name;
      icing_zutaten_change();
      break;

    case 2:
      //Button nach rechts gedrückt
      icing_zahl++;
      if (icing_zahl > icing.length - 1) {
        icing_zahl = 0;
      }
      document.getElementById("icing-home").src = icing[icing_zahl].imageUrl;
      document.getElementById("text-icing").textContent = icing[icing_zahl].name;
      icing_zutaten_change();
      break;

    case 3:
      topping_zahl--;
      if (topping_zahl < 0) {
        topping_zahl = topping.length - 1;
      }
      document.getElementById("topping-home").src = topping[topping_zahl].imageUrl;
      document.getElementById("text-topping").textContent = topping[topping_zahl].name;
      topping_zutaten_change();
      break;

    case 4:
      topping_zahl++;
      if (topping_zahl > topping.length - 1) {
        topping_zahl= 0;
      }
      document.getElementById("topping-home").src = topping[topping_zahl].imageUrl;
      document.getElementById("text-topping").textContent = topping[topping_zahl].name;
      topping_zutaten_change();
      break;
    case 5:
      muffin_zahl--;
      if (muffin_zahl < 0) {
        muffin_zahl = muffin.length - 1;
      }
      document.getElementById("muffin-home").src = muffin[muffin_zahl].imageUrl;
      document.getElementById("text-muffin").textContent = muffin[muffin_zahl].name;
      muffin_zutaten_change();

      break;
    case 6:
      muffin_zahl++;
      if (muffin_zahl > muffin.length - 1) {
        muffin_zahl = 0;
      }
      document.getElementById("muffin-home").src = muffin[muffin_zahl].imageUrl;
      document.getElementById("text-muffin").textContent = muffin[muffin_zahl].name;
      muffin_zutaten_change();
      break;

    default:
      break;
  }
}




function topping_zutaten_change() {
  let mufifnzutaten = document.getElementById("topping1zutaten--einfügen");
  mufifnzutaten.removeChild(mufifnzutaten.firstChild);
  txtInListeEinfuegen(topping[topping_zahl].ingredientsUrl, "topping1zutaten--einfügen");
}

function icing_zutaten_change() {
  let mufifnzutaten = document.getElementById("icing1zutaten--einfügen");
  mufifnzutaten.removeChild(mufifnzutaten.firstChild);
  txtInListeEinfuegen(icing[icing_zahl].ingredientsUrl, "icing1zutaten--einfügen");
}
function muffin_zutaten_change() {
  let mufifnzutaten = document.getElementById("muffin1zutaten--einfügen");
  mufifnzutaten.removeChild(mufifnzutaten.firstChild);
  txtInListeEinfuegen(muffin[muffin_zahl].ingredientsUrl, "muffin1zutaten--einfügen");
}


// Funktion zum Einfügen von Texten in eine Liste
function txtInListeEinfuegen(txtDatei, einfuegeID) {
  // Funktion fügt txt Datei in html, bei einem bestimmten Element als Liste ein
  fetch(txtDatei)
    .then((response) => response.text())
    .then((inhalt) => {
      const zeilen = inhalt.split("\n");
      // "zeilen" beinhaltet alle Zeilen aus der txt-Datei
      const einfuegePunkt = document.getElementById(einfuegeID);
      // definiert Ort im HTML Dokument, wo die Liste eingefügt werden soll

      if (!einfuegePunkt) {
        console.error("Einfüge Punkt nicht gefunden");
        return;
      }

      let liste = document.createElement("ul");

      for (let i = 0; i < 3 && i < zeilen.length; i++) {
        const line = zeilen[i];
        if (line.trim() === "") {
          einfuegePunkt.appendChild(liste);
          liste = document.createElement("ul");
        } else {
          const li = document.createElement("li");
          li.textContent = line.trim();
          liste.appendChild(li);
        }
      }
      einfuegePunkt.appendChild(liste);
    })

    .catch((error) => showAlert("Fehler beim Laden der Datei:", error));
}

// Funktion zum Speichern eines Muffins
function saveMuffin() {
  let icing_id = icing[icing_zahl].id;
  let topping_id = topping[topping_zahl].id;
  let muffinBase_id = muffin[muffin_zahl].id;

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ icing_id, topping_id, muffinBase_id }),
    credentials: "include",
  };

  fetch("/addMuffin", requestOptions)
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        showAlert("Muffin erfolgreich hinzugefügt!");
      } else {
        showAlert("Fehler beim Hinzufügen des Muffins" + ": " + data.message);
      }
    })
    .catch((error) =>
      showAlert("Fehler beim Hinzufügen des Muffins:", error)
    );
}
