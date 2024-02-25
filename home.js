let i = 0;



function getbilder() {
   let e = 0;

   function myFunction(item) {
      images[e] = item;
      e++;
      console.log(images[e]); 
   }

}


function toppingright() {


   if (i > 1) {
      i = 0;
   }

   document.getElementById("muf").src = images[i];
   i++;


}

addEventListener("DOMContentLoaded", (event) => { 
   fetch('/muffins')
   .then(response => {
     if (!response.ok) {
       throw new Error('Netzwerkantwort nicht ok');
     }
     return response.json();
   })
   .then(data => {
     console.log(data);
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
     console.log(data);
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
     console.log(data);
   })
   .catch(error => {
     console.error('Fehler beim Fetchen der Muffin-Daten:', error);
   });

 });



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