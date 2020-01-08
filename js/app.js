/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */
let game = null;

/**
 * Resets and start a new game
 */
document.querySelector('#btn__reset').addEventListener('click', () => {
   game = new Game();

   // removes all current display elements of letters of the last active phrase
   const LIsPhrase = Array.from(document.querySelectorAll('#phrase li'));
   LIsPhrase.forEach(li => li.parentElement && li.parentElement.removeChild(li));

   // resets the state of all on-screen keyboard buttons
   const buttonsKeyboard = Array.from(document.querySelectorAll('#qwerty button'));
   buttonsKeyboard.forEach(button => button.className = 'key');

   game.startGame();
});

document.querySelector('#qwerty').addEventListener('click', evt => {
    // Check if it's a button element to avoid handling events in other div elements
    if (evt.target.tagName === 'BUTTON') {
        const letter = evt.target.textContent;

        game.handleInteraction(evt.target, letter);
    }
});