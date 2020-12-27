class Phrase {
    
    constructor(parameter) {
        this.parameter = parameter;
    }
    
    /**
     * Takes randomly chosen phrase and adds it to the display.
     * Implemented as li elements with classes to denote letters and spaces.
     */
    addPhraseToDisplay = () => {
        const phraseArr = this.parameter.split('');
        let phraseList = [];

        phraseArr.forEach(letter => {
            if (letter === " ") {
                return phraseList.push(`<li class="space">&nbsp;</li>`);
            }
            phraseList.push(`<li class="letter" data-letter="${letter.toLowerCase()}">${letter}</li>`);
        });

        document.querySelector("#phrase ul").innerHTML = phraseList.join('');
    }

    /**
     * Checks if the selected letter matches ones in the given phrase
     * @param {Object} textContent - The textContent method connected to the clicked letter button
     * @return {Boolean} boolean - For checkForWin method and update number of hearts
     */
    checkLetter = textContent => {
        let matched = false;
        const phraseLetters = document.querySelectorAll(".letter");
        phraseLetters.forEach(letter => {
            if (textContent === letter.dataset.letter) {
                matched = true;
            }
        });

        return matched;
    }

    /**
     * Displays the matched letter(s) in the phrase display
     * @param {Element} letter - the element containing the matched letter
     */
    showMatchedLetter(letter) {
        letter.classList.add("show");
    }
}
