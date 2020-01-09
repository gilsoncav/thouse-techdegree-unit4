/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

class Phrase {
    constructor(phrase) {
        if (!phrase || phrase.length === 3) throw new Error('ERROR: needs to be a phrase with at least 3 letters');

        this.phrase = phrase.toLowerCase();
    }

    get phraseArray() {
        return Array.from(this.phrase);
    }

    /**
     * Render the placeholder for each character of the phrase in the screen for the player
     * each placeholder comes with a class `hide` by default
     */
    addPhraseToDisplay() {
        const divPhraseUL = document.querySelector('#phrase > ul');

        this.phraseArray.forEach(char => {
            // creates a new LI element to display the letter
           const newLI = document.createElement('li');

           newLI.textContent = char;
           // sets the class if it's a regular char or space char
           char !== ' ' ? newLI.className = `hide letter ${char}` : newLI.className = 'space';

           // adds the new LI element to the proper place in the screen
            divPhraseUL.appendChild(newLI);
        });

    }

    /**
     * Checks if the provided letter matches a letter in the phrase
     *
     * @param letter
     */
    checkLetter(letter) {
        return this.phraseArray.indexOf(letter) !== -1;
    }

    /**
     * Renders the actual letters instead of the hiding placeholder if the letter
     * exists in the phrase
     *
     * @param letter
     */
    showMatchedLetter(letter) {
        // SELECT ALL ELEMENTS WITH THE MATCHING CLASS (WITH THE letter PARAM)
        const LIsLetters = document.querySelectorAll(`.letter.${letter}`);
        // UNHIDE ALL SELECTED ELEMENTS
        LIsLetters.forEach(li => li.className = `show letter ${letter}`);

    }


}