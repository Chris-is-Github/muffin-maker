let i = 0;	// Start Point
let images = [];	// Images Array
const testFolder = 'Bilder/Muffin/';
const fs = require('fs');


function getbilder() {
   let e = 0;


   fs.readdirSync(testFolder).forEach(
      myFunction

   );

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

addEventListener("DOMContentLoaded", (event) => { getbilder(); });