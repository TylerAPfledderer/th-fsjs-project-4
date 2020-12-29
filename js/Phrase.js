class Phrase {
    
    constructor(phrase) {
        this.phrase = phrase;
    }
    
    /**
     * Takes randomly chosen phrase and adds it to the display.
     * Implemented as li elements with classes to denote letters and spaces.
     */
    addPhraseToDisplay = () => {
        const phraseArr = this.phrase.split('');
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
     * Checks if the selected letter matches ones in the given phrase using RegExp
     * @param {String} textContent - The textContent method connected to the clicked letter button
     * @return {Boolean} boolean - For checkForWin method and update number of hearts
     */
    checkLetter = textContent => {
        const regex = new RegExp(`.*[${textContent}].*`, "i"); // i.e. /.*[i].*/i
        return regex.test(this.phrase);
    }

    /**
     * Displays the matched letter(s) in the phrase display
     * @param {Element} letter - the element containing the matched letter
     */
    showMatchedLetter(textContent) {
        const phraseLetters = document.querySelectorAll(".letter");
        phraseLetters.forEach(letter => {
            if (textContent === letter.dataset.letter) {
                letter.classList.add("show");
            }
        });
    }
}