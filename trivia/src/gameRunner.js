const Die = require('./die');
const Game = require('./game');
const Player = require('./player');
const QuestionsDeckFactory = require('./questionsDeckFactory');
const Category = require("./category");

class GameRunner {
    play() {
        let notAWinner = false;
        const deck = QuestionsDeckFactory.create();

        const game = new Game(deck, new Player('Chet'), new Player('Pat'), new Player('Sue'));

        do {
            const die = new Die(Math.floor(Math.random() * 6) + 1)
            game.roll(die);

            if (Math.floor(Math.random() * 10) == 7) {
                notAWinner = game.wrongAnswer();
            } else {
                notAWinner = game.correctAnswer();
            }

        } while (notAWinner);
    }

    newPlay() {
        const deck = QuestionsDeckFactory.create();
        const game = new Game(deck, new Player('Chet'), new Player('Pat'), new Player('Sue'));

        while (!game.didCurrentPlayerWin()) {
            this.playCurrentPlayerTurn(game);
            if (!game.didCurrentPlayerWin()) {
                game.nextPlayer();
            }
        }
    }
    playCurrentPlayerTurn(game) {
        // prerequisites : being the current player
        const die = new Die(Math.floor(Math.random() * 6) + 1)

        game.roll(die);

        // TODO : penalty box use case is missing
        game.askQuestion()
        if (this.isCorrectlyAnswered()) {
            game.correctAnswer();
            if (game.didCurrentPlayerWin()) {
                // end of game
                return;
            }
        } else {
            game.wrongAnswer();
        }
    }

    isCorrectlyAnswered() {
        return Math.floor(Math.random() * 10) == 7;
    }
}

module.exports = GameRunner;
