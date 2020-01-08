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
            new Phrase('Lando Calrisian')
            ];
        this.activePhrase = null;
    }

    startGame() {
        // HIDES THE START SCREEN OVERLAY
        document.querySelector('#overlay').style.display = 'none';
        // GENERATES E NEW RANDOM PHRASE
        this.activePhrase = this.getRandomPhrase();
        // RENDERS THE PHRASE INTO THE DISPLAY
        this.activePhrase.addPhraseToDisplay();
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

        // marks the keyboard button as already chosen
        if (this.activePhrase.checkLetter(letter)) {
            button.className += ' chosen';
            this.activePhrase.showMatchedLetter(letter);
            // checks if the player won
            if(this.checkForWin()) {
                // ends the game
                this.gameOver();
            }
        } else {
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
        // TODO implement
        const divOverlay = document.querySelector('#overlay');
        divOverlay.style.display = 'flex';
        if (this.checkForWin()) {
            divOverlay.className = 'win';
            divOverlay.querySelector('h1').textContent = 'You Win!!';
        } else {
            divOverlay.className = 'lose';
            divOverlay.querySelector('h1').textContent = 'You Lose!! :(';
        }

        console.log('gameOver() ===');
    }

}