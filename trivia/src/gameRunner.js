const Die = require('./die');
const Game = require('./game');
const Player =  require('./player');
const QuestionsDeckFactory = require('./questionsDeckFactory');
const Category = require("./category");

class GameRunner {
    constructor() {
        this.play = function () {
            var notAWinner = false;
            const deck = QuestionsDeckFactory.create();

            let game = new Game(deck, new Player('Chet'), new Player('Pat'), new Player('Sue'));

            do {
                const die = new Die(Math.floor(Math.random() * 6) + 1)
                game.roll(die);

                if (Math.floor(Math.random() * 10) == 7) {
                    notAWinner = game.wrongAnswer();
                } else {
                    notAWinner = game.wasCorrectlyAnswered();
                }

            } while (notAWinner);
        };
    }
}

module.exports = GameRunner;
