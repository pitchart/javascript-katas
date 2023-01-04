const Die = require('./die');
const Game = require('./game');
const Player =  require('./player');

class GameRunner {
    constructor() {
        this.play = function () {
            var notAWinner = false;
            let game = new Game(new Player('Chet'), new Player('Pat'), new Player('Sue'));

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
