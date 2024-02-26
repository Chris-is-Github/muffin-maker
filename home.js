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

 });