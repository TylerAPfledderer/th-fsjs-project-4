"use strict";

const { startGame, handleInteraction } = new Game();
const keyboardButtons = document.querySelectorAll(".key");

/**
 * Event listener on the "Start Game" overlay button.
 * Removes the overlay.
 * Creates Game instance and displays random phrase.
 */
document.querySelector("#btn__reset").addEventListener("click", function() {
    if (this.textContent === "New Game") {
        document.querySelector("#phrase ul").innerHTML = '';

        document.querySelectorAll(".tries img[src$='lostHeart.png']").forEach(img => {
            img.setAttribute("src", "images/liveHeart.png");
        });

        document.querySelectorAll(".key").forEach(key => {
            key.disabled = false;
            key.classList.remove("chosen", "wrong");
        });
    }
    startGame();
});

/**
 * Event listener attached to each keyboard button on the page.
 * Run the Game object's interaction method on the selected button.
 */
keyboardButtons.forEach(button => {
    button.addEventListener("click", function() {
        handleInteraction(this);
    });
});

/**
 * Event listener for keyboard interaction when selecting letters
 */
document.addEventListener("keyup", ({key}) => {
    document.querySelectorAll(".key").forEach(button => {
        if (button.textContent === key) handleInteraction(button);
    })
});