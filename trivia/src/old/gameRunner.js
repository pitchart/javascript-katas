const Die = require('../die');
const Game = require('./game');
const Player = require('../player');
const QuestionsDeckFactory = require('../questionsDeckFactory');
const Category = require("../category");

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

}

module.exports = GameRunner;
