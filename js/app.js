/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */
let game;

/**
 * Handler of the click event in the START BUTTON
 *
 * Resets and start a new game
 */
document.querySelector('#btn__reset').addEventListener('click', () => {
    resetsStateAndStartsANewGame();
});

function resetsStateAndStartsANewGame() {
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
}

/**
 * Handles a click in one of the keys in the on-screen keyboard
 */
document.querySelector('#qwerty').addEventListener('click', evt => {
    // Check if it's a button element to avoid handling events in other div elements
    if (evt.target.tagName === 'BUTTON') {
        game = new Game();
        const letter = evt.target.textContent;

        game.handleInteraction(evt.target, letter);
    }


});

/**
 * Handles keyboard events.
 *
 * filter for letters and ENTER to start a new game
 */
document.addEventListener('keydown', evt => {
    console.log(`GAME: KEYBOARD KEY PRESSED evt.key=${evt.key}`);

    if (!game.sessionActive && evt.key === 'Enter') {
        resetsStateAndStartsANewGame();
    }

    const isLetter = /^[a-z]$/.test(evt.key);
    if (isLetter && game.sessionActive) {
        const button = Array.from(document.querySelectorAll('#qwerty button.key')).filter(button => button.textContent === evt.key)[0];
        game.handleInteraction(button, evt.key);
    }
});