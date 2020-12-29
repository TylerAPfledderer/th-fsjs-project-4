class Game {
    constructor() {
        this.missed = 0;
        this.phrases = [
            "Happy Coding",
            "Never Give Up",
            "Let it Go",
            "Piece of Cake",
            "Back to Square One"
        ];
        this.activePhrase = this.getRandomPhrase();
    }

    /**
     * Function to remove the overlay and set the phrase display 
     */
    startGame = () => {
        document.querySelector("#overlay").style.display = "none";
        this.activePhrase = this.getRandomPhrase();
        this.activePhrase.addPhraseToDisplay();
    }

    /**
     * Function to choose a random phrase from the array of phrases in the constructor.
     * @return {Object} Class -- Returns an instance of the Phrase object 
     *                              with the random phrase as the argument.
     */
    getRandomPhrase = () => {
        const randomPhrase = this.phrases[Math.floor(Math.random() * this.phrases.length)];
        return new Phrase(randomPhrase);
    }

    /**
     * Function to run the checks against the selected letter and update the page
     *   Also checks if the game is over, either with all letters matched or out of lives.
     * @param {HTMLElement} selectedButton - The on-screen button element selected by the user
     */
    handleInteraction = selectedButton => {
        // Prevent selected button from being clicked again
        selectedButton.disabled = true;

        if (!this.activePhrase.checkLetter(selectedButton.textContent)) {
            selectedButton.classList.add("wrong");
            this.removeLife();
            return;
        }

        selectedButton.classList.add("chosen");
        this.activePhrase.showMatchedLetter(selectedButton.textContent);
        if (this.checkForWin()) {
            this.gameOver(true);
        }
    }

    /**
     * Function to replace a liveHeart image with a lostHeart image
     *   Checks if max misses have been met.
     */
    removeLife = () => {
        document.querySelector(".tries img[src$='liveHeart.png']")
            .setAttribute("src", "images/lostHeart.png");
        this.missed++;

        if (this.missed === 5) {
            this.gameOver(false);
        }
    }

    /**
     * Function to check if all letters in active phrase were selected.
     */
    checkForWin = () => {
        return document.querySelectorAll(".show").length === document.querySelectorAll(".letter").length;
    }

    /**
     * Function to show overlay with win/lose styling and message
     * @param {Boolean} endResult - Looks for a true or false argument depending on how the function is called.
     */
    gameOver = endResult => {
        const overlay = document.querySelector("#overlay");
        const gameOverMessage = document.querySelector("#game-over-message");

        overlay.classList.remove("win", "lose");

        function updateOverlay(gameClass, gameMessage) {
            overlay.style.display = '';
            overlay.classList.add(gameClass);
            gameOverMessage.textContent = gameMessage;
            document.querySelector("#btn__reset").textContent = "New Game";
        }
        endResult 
            ? updateOverlay("win", "You Win!")
            : updateOverlay("lose", "Sorry, Try Again!");

        // -- Reset the board -- //
        document.querySelectorAll(".tries img[src$='lostHeart.png']").forEach(img => {
            img.setAttribute("src", "images/liveHeart.png");
        });
        document.querySelector("#phrase ul").innerHTML = '';

        document.querySelectorAll(".key").forEach(key => {
            key.disabled = false;
            key.classList.remove("chosen", "wrong");
        });

        this.missed = 0;
    }
}
