let i = 0;
let topping = [];
let muffin = [];
let icing = [];

let icing_id  ;
let topping_id ;
let muffinBase_id ;

fetch('/muffins')
  .then(response => {
    if (!response.ok) {
      throw new Error('Netzwerkantwort nicht ok');
    }
    return response.json();
  })
  .then(data => {
    muffin = data.muffins;
    document.getElementById("muffin-home").src = muffin[0].imageUrl;
    document.getElementById("text-muffin").textContent = muffin[0].name;
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
    document.getElementById("topping-home").src = topping[0].imageUrl;
    document.getElementById("text-topping").textContent = topping[0].name;
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
    document.getElementById("icing-home").src = icing[0].imageUrl;
    document.getElementById("text-icing").textContent = icing[0].name;
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
      document.getElementById("text-icing").textContent = icing[i].name;
     break;

    case 2:
      i++;
      if (i > icing.length - 1) {
        i = 0;
      }
      document.getElementById("icing-home").src = icing[i].imageUrl;
      document.getElementById("text-icing").textContent = icing[i].name;
      break;



    case 3:
      i--;
      if (i < 0) {
        i = topping.length - 1;
      }
      document.getElementById("topping-home").src = topping[i].imageUrl;
      document.getElementById("text-topping").textContent = topping[i].name;
      break;

    case 4:
      i++;
      if (i > topping.length - 1) {
        i = 0;
      }
      document.getElementById("topping-home").src = topping[i].imageUrl;
      document.getElementById("text-topping").textContent = topping[i].name;
      break;
    case 5:
      i--;
      if (i < 0) {
        i = muffin.length - 1;
      }
      document.getElementById("muffin-home").src = muffin[i].imageUrl;
      document.getElementById("text-muffin").textContent = muffin[i].name;

      break;
    case 6:
      i++;
      if (i > muffin.length - 1) {
        i = 0;
      }
      document.getElementById("muffin-home").src = muffin[i].imageUrl;
      document.getElementById("text-muffin").textContent = muffin[i].name;
      break;


    default:
      break;
  }



}

function safe_muffin(){



}






// muffin Speichern (noch nicht getestet)

function safe_muffin(){

  

  
  let icing_id = icing[i].id; 
  let topping_id = topping[i].id; 
  let muffinBase_id = muffin[i].id; 

  /* console.log(icing);  */
  
  console.log(topping_id); 
  console.log(muffinBase_id); 
  console.log(icing_id); 
  
  const requestOptions = {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ icing_id, topping_id, muffinBase_id }),
  credentials: 'include' 
};

fetch('/addMuffin', requestOptions)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Fehler beim Hinzufügen des Muffins:', error)); 

}