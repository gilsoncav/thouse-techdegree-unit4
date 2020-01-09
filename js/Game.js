/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */
const kGAME_PLAYER_LIVES = 5;

class Game {
    constructor() {
        this.missed = 0;
        this.phrases = [
            new Phrase('Obiwan Kenobi'),
            new Phrase('Tatooine'),
            new Phrase('Mustafar'),
            new Phrase('Bantha'),
            new Phrase('Blue Milk'),
            new Phrase('Lando Calrisian'),
            new Phrase('Speeder'),
            new Phrase('X Wing'),
            new Phrase('Dagobah'),
            new Phrase('Yoda'),
            new Phrase('Mace Windu'),
            new Phrase('Mandalor'),
            new Phrase('Boba Fett'),
            new Phrase('Naboo'),
            new Phrase('Sarlacc'),
            new Phrase('Salacious Crumb'),
            new Phrase('Jabba the Hutt'),
            new Phrase('Wampa'),
            new Phrase('Baby Yoda'),
            ];
        this.activePhrase = null;
        this.sessionActive = false;
        this.sessions = 0;
        this.wins = 0;
    }

    startGame() {
        // HIDES THE START SCREEN OVERLAY
        document.querySelector('#overlay').style.display = 'none';
        // GENERATES E NEW RANDOM PHRASE
        this.activePhrase = this.getRandomPhrase();
        // RENDERS THE PHRASE INTO THE DISPLAY
        this.activePhrase.addPhraseToDisplay();
        // Marks the flag that a game session is active
        this.sessionActive = true;
        this.sessions++;
    }

    getRandomPhrase() {
        const randomI = Math.floor(Math.random() * this.phrases.length);
        return this.phrases[randomI];
    }

    handleInteraction(button, letter) {
        // checks if the button was already chosen
        if (button.className.indexOf('chosen') !== -1 || button.className.indexOf('wrong') !== -1) {
            console.log('GAME WARNING: THIS LETTER WAS ALREADY CHOSEN');
            return;
        }

        if (this.activePhrase.checkLetter(letter)) {
            // the user guessed RIGHT!
            // marks the keyboard button as already chosen
            button.className += ' chosen';
            this.activePhrase.showMatchedLetter(letter);
            // checks if the player won
            if(this.checkForWin()) {
                // ends the game
                this.gameOver();
            }
        } else {
            // the user guessed WRONG   :(
            // if the chosen letter does not exists on the active phrase, mark it as wrong
            button.className += ' wrong';
            this.removeLife();
        }

    }

    /**
     * removes a life of the player
     */
    removeLife() {
        // TODO implement
        // increments the missed counter
        this.missed++;

        const IMGsLiveHeartsArray = Array.from(document.querySelectorAll('li.tries > img[src$="liveHeart.png"]'));
        if (IMGsLiveHeartsArray.length > 0) IMGsLiveHeartsArray[IMGsLiveHeartsArray.length - 1].src = 'images/lostHeart.png';

        // calls the game over procedure if the players ran out of lives
        if (this.missed >= kGAME_PLAYER_LIVES) {
            this.gameOver();
        }
    }

    /**
     * Checks if the player uncovered all the letters in the active phrase
     *
     */
    checkForWin() {
        const LIsLettersRemaining = document.querySelectorAll('#phrase li.letter.hide');
        return LIsLettersRemaining.length === 0;
    }

    gameOver() {
        // shows start button overlay to restart the game
        const divOverlay = document.querySelector('#overlay');
        divOverlay.style.display = 'flex';

        if (this.checkForWin()) {
            // marks the overlay with the win appearance
            divOverlay.className = 'win';
            divOverlay.querySelector('h1').textContent = 'The Galaxy is proud of you!!';
            divOverlay.querySelector('h2').textContent = this.activePhrase.phrase;
            // increments the victories counter
            this.wins++;

            // renders a new light side point
            const newPoint = document.createElement('LI');
            newPoint.className = 'point point-light';
            document.querySelector('#light-dark-side-counter .mid-filler').insertAdjacentElement('beforebegin', newPoint);
        } else {
            // marks the overlay with the lose appearance
            divOverlay.className = 'lose';
            divOverlay.querySelector('h1').textContent = 'You lose! I can feel your anger... :(';

            // renders a new dark side point
            const newPoint = document.createElement('LI');
            newPoint.className = 'point point-dark';
            document.querySelector('#light-dark-side-counter .mid-filler').insertAdjacentElement('afterend', newPoint);
        }
        // marks the game session as inactive and increments the session counter
        this.sessionActive = false;
        this.sessions++;

        // resets the wrong guessed counter missed
        this.missed = 0;

        console.log('gameOver() ===');
    }

}