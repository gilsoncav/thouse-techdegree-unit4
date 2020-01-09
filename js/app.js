/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */
let game = null;

/**
 * Handler of the click event in the START BUTTON
 *
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

    // resets the life hearts
    const IMGsLiveHeartsArray = Array.from(document.querySelectorAll('li.tries > img'));
    IMGsLiveHeartsArray.forEach(img => img.src = 'images/liveHeart.png');

    game.startGame();
});

/**
 * Handles a click in one of the keys in the on-screen keyboard
 */
document.querySelector('#qwerty').addEventListener('click', evt => {
    // Check if it's a button element to avoid handling events in other div elements
    if (evt.target.tagName === 'BUTTON') {
        const letter = evt.target.textContent;

        game.handleInteraction(evt.target, letter);
    }
});

document.addEventListener('keydown', evt => {
    const isLetter = /^[a-z]$/.test(evt.key);
    if (isLetter) {
        const button = Array.from(document.querySelectorAll('#qwerty button.key')).filter(button => button.textContent === evt.key)[0];
        game.handleInteraction(button, evt.key);
    }
});