let i = 0;	// Start Point



<<<<<<< HEAD
=======
function getbilder() {
   let e = 0;

   function myFunction(item) {
      images[e] = item;
      e++;
      console.log(images[e]); 
   }

}

>>>>>>> 6d04592 (Changed alot)

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
       throw new Error('Netzwerkantwort war nicht ok');
     }
     return response.json();
   })
   .then(data => {
     console.log(data); // Hier kannst du mit den Daten arbeiten, z.B. sie auf deiner Webseite anzeigen
   })
   .catch(error => {
     console.error('Fehler beim Fetchen der Muffin-Daten:', error);
   });

 });