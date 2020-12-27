"use strict";

// const phrase = new Phrase("This Phrase");

// phrase.addPhraseToDisplay();

document.querySelector("#qwerty").addEventListener("click", ({target}) => {
    if (target.tagName === "BUTTON") {
        phrase.checkLetter(target.textContent);
    }
});