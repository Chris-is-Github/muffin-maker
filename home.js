let i = 0;	// Start Point




function toppingright() {


   if (i > 1) {
      i = 0;
   }

   document.getElementById("muf").src = images[i];
   i++;


}

addEventListener("DOMContentLoaded", (event) => { getbilder(); });