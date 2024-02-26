

function buttonListener(buttonID, bildID, muffinDropDownID){
    const myButton = document.getElementById(buttonID);
    myButton.addEventListener('click', function() {
        // Listener wartet auf einen Klick auf den Pfeil Button um dann die Anleitung und die Zutaten des Muffins einzublenden
        const pfeilBild = document.getElementById(bildID);
        const dropDownContent = document.getElementById(muffinDropDownID);


        let styleDropDownContent = window.getComputedStyle(dropDownContent);
        // bekommt aktueller CSS Style von den Zutaten
        if (styleDropDownContent.display === 'none') {
            // wenn die Zutaten nicht zu sehen sind, werden die Zutaten & Anleitung angezeigt
            dropDownContent.style.display = 'grid';


            pfeilBild.classList.add('pfeilButton__bild--unten');
            // verwendet das Style 'pfeilButton__bild--unten' auf den Button, um ihn nach untern zu drehen
        } else {
            // wenn die Zutaten zu sehen sind, werden die Zutaten & Anleitung wieder versteckt
            dropDownContent.style.display = 'none';


            pfeilBild.classList.remove('pfeilButton__bild--unten');
            // nimmt das Style 'pfeilButton__bild--unten' weider weg, um den Button zurückzudrehen
        }
    });
}

//Aufruf des Listeners für jeden Muffin
buttonListener('buttonDropDown1', 'pfeilBild1', 'muffin1__dropDown')
buttonListener('buttonDropDown2', 'pfeilBild2', 'muffin2__dropDown')
buttonListener('buttonDropDown3', 'pfeilBild3', 'muffin3__dropDown')
buttonListener('buttonDropDown4', 'pfeilBild4', 'muffin4__dropDown')