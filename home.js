let i = 0;
let topping = [];
let muffin = [];
let icing = [];

fetch('/muffins')
  .then(response => {
    if (!response.ok) {
      throw new Error('Netzwerkantwort nicht ok');
    }
    return response.json();
  })
  .then(data => {
    muffin = data.muffins;
    console.log(muffin);
  })
  .catch(error => {
    console.error('Fehler beim Fetchen der Muffin-Daten:', error);
  });

fetch('/toppings')
  .then(response => {
    if (!response.ok) {
      throw new Error('Netzwerkantwort nicht ok');
    }
    return response.json();
  })
  .then(data => {
    topping = data.toppings;
    console.log(topping);
  })
  .catch(error => {
    console.error('Fehler beim Fetchen der Muffin-Daten:', error);
  });

fetch('/icings')
  .then(response => {
    if (!response.ok) {
      throw new Error('Netzwerkantwort nicht ok');
    }
    return response.json();
  })
  .then(data => {
    icing = data.icings;
    console.log(icing);
  })
  .catch(error => {
    console.error('Fehler beim Fetchen der Muffin-Daten:', error);
  });



function change_muffin(button) {

  switch (button) {

    case 1:
      i--;
      if (i < 0) {
        i = icing.length - 1;
      }
      document.getElementById("icing-home").src = icing[i].imageUrl;
     break;

    case 2:
      i++;
      if (i > icing.length - 1) {
        i = 0;
      }
      document.getElementById("icing-home").src = icing[i].imageUrl;
      break;



    case 3:
      i--;
      if (i < 0) {
        i = topping.length - 1;
      }
      document.getElementById("topping-home").src = topping[i].imageUrl;

      break;

    case 4:
      i++;
      if (i > topping.length - 1) {
        i = 0;
      }
      document.getElementById("topping-home").src = topping[i].imageUrl;
      break;
    case 5:
      i--;
      if (i < 0) {
        i = muffin.length - 1;
      }
      document.getElementById("muffin-home").src = muffin[i].imageUrl;

      break;
    case 6:
      i++;
      if (i > muffin.length - 1) {
        i = 0;
      }
      document.getElementById("muffin-home").src = muffin[i].imageUrl;
      break;


    default:
      break;
  }



}








// muffin Speichern (noch nicht getestet)

/*  const requestOptions = {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ icing, topping, muffinBase }),
  credentials: 'include' 
};

fetch('/addMuffin', requestOptions)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Fehler beim Hinzufügen des Muffins:', error)); */