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

    startGame = () => {
        document.querySelector("#overlay").style.display = "none";
        this.activePhrase = this.getRandomPhrase();
        this.activePhrase.addPhraseToDisplay();
    }

    getRandomPhrase = () => {
        const randomPhrase = this.phrases[Math.floor(Math.random() * this.phrases.length)];
        return new Phrase(randomPhrase);
    }

    handleInteraction = selectedButton => {
        // Prevent selected button from being clicked again
        selectedButton.disabled = true;

        if (!this.activePhrase.checkLetter(selectedButton.textContent)) {
            selectedButton.classList.add("wrong");
            this.removeLife();
            return;
        }

        selectedButton.classList.add("chosen");
        this.activePhrase.showMatchedLetter(selectedButton);
        if (this.checkForWin()) {
            this.gameOver(true);
        }
    }

    removeLife = () => {
        document.querySelector(".tries img[src$='liveHeart.png']")
            .setAttribute("src", "images/lostHeart.png");
        this.missed++;

        if (this.missed === 5) {
            this.gameOver(false);
        }
    }

    checkForWin = () => {
        return document.querySelectorAll(".show").length === document.querySelectorAll(".letter").length;
    }

    gameOver = endResult => {
        const overlay = document.querySelector("#overlay");
        const gameOverMessage = document.querySelector("#game-over-message");
        function updateOverlay(gameClass, gameMessage) {
            overlay.style.display = '';
            overlay.classList.add(gameClass);
            gameOverMessage.textContent = gameMessage;
        }
        endResult 
            ? updateOverlay("win", "You Win!")
            : updateOverlay("lose", "Sorry, Try Again!");
    }
}
