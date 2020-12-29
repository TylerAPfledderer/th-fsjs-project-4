"use strict";

const game = new Game();
const keyboardButtons = document.querySelectorAll(".key");

/**
 * Event listener on the "Start Game" overlay button.
 * Removes the overlay.
 * Creates Game instance and displays random phrase.
 */
document.querySelector("#btn__reset").addEventListener("click", function() {
    game.startGame();
});

/**
 * Event listener attached to each keyboard button on the page.
 * Run the Game object's interaction method on the selected button.
 */
keyboardButtons.forEach(button => {
    button.addEventListener("click", function() {
        game.handleInteraction(this);
    });
});

/**
 * Event listener for keyboard interaction when selecting letters
 */
document.addEventListener("keyup", ({key}) => {
    document.querySelectorAll(".key").forEach(button => {
        if (button.textContent === key && !button.disabled) game.handleInteraction(button);
    })
});