const Die = require('./die');
const Game = require('./game');
const Player = require('./player');
const QuestionsDeckFactory = require('./questionsDeckFactory');
const Category = require("./category");

class GameRunner {


    play() {
        const deck = QuestionsDeckFactory.create();
        const game = new Game(deck, new Player('Chet'), new Player('Pat'), new Player('Sue'));

        while (!game.hasAWinner()) {
            this.playCurrentPlayerTurn(game);
            if (!game.hasAWinner()) {
                game.nextPlayer();
            }
        }
    }

    /**
     *
     * @param {Game} game
     */
    playCurrentPlayerTurn(game) {
        // prerequisites : being the current player
        const die = new Die(Math.floor(Math.random() * 6) + 1)

        game.roll(die);

        // TODO : penalty box use case is missing
        game.askQuestion()
        if (this.isCorrectlyAnswered()) {
            game.correctAnswer();
            if (game.hasAWinner()) {
                // end of game
                return;
            }
        } else {
            game.wrongAnswer();
        }
    }

    isCorrectlyAnswered() {
       return Math.floor(Math.random() * 10) != 7;
    }
}

module.exports = GameRunner;
