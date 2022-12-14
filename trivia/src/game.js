const Player = require('./player');
const Category = {
    SCIENCE: 'Science',
    SPORTS: 'Sports',
    POP: 'Pop',
    ROCK: 'Rock'
}

class Game {
    players = new Array();
    purses = new Array(6);
    inPenaltyBox = new Array(6);

    questions = new Map();

    currentPlayer = 0;
    isGettingOutOfPenaltyBox = false;



    constructor() {
        for (let category in Category) {
            let categoryElement = Category[category];
            this.questions.set(categoryElement, []);
            for (let i = 0; i < 50; i++) {
                this.questions.get(categoryElement).push(`${categoryElement} Question ${i}`);
            }
        }
    }

    boardSize = 12;

    moveCurrentPlayer(die) {

        this.players[this.currentPlayer].moveTo((this.players[this.currentPlayer].getPlace() + die) % this.boardSize);
        console.log(this.players[this.currentPlayer].getName()+ "'s new location is " + this.players[this.currentPlayer].getPlace());
    }


    isOdd(die) {
        return die % 2 != 0;
    }

    currentCategory = function () {
        switch (this.players[this.currentPlayer].getPlace() % 4) {
            case 0:
                return Category.POP;
            case 1:
                return Category.SCIENCE;
            case 2:
                return Category.SPORTS;
            default:
                return Category.ROCK;
        }
    };

    isPlayable = function (howManyPlayers) {
        return howManyPlayers >= 2;
    };

    didPlayerWin = function () {
        return !(this.purses[this.currentPlayer] == 6);
    };


    add = function (playerName) {
        const player = new Player(playerName);
        this.players.push(player);
        this.purses[this.howManyPlayers() - 1] = 0;
        this.inPenaltyBox[this.howManyPlayers() - 1] = false;

        console.log(player.getName() + " was added");
        console.log("They are player number " + this.players.length);

        return true;
    };

    howManyPlayers = function () {
        return this.players.length;
    };

    askQuestion = function () {
        console.log(this.questions.get(this.currentCategory()).shift());
    };


    roll = function (die) {
        console.log(this.players[this.currentPlayer].getName()+ " is the current player");
        console.log("They have rolled a " + die);

        if (this.inPenaltyBox[this.currentPlayer] && !this.isOdd(die)) {
            console.log(this.players[this.currentPlayer].getName()+ " is not getting out of the penalty box");
            this.isGettingOutOfPenaltyBox = false;
            return;
        }

        if (this.inPenaltyBox[this.currentPlayer] && this.isOdd(die)) {
            this.isGettingOutOfPenaltyBox = true;
            console.log(this.players[this.currentPlayer].getName()+ " is getting out of the penalty box");
        }

        this.moveCurrentPlayer(die);
        console.log("The category is " + this.currentCategory());
        this.askQuestion();

    };

    wasCorrectlyAnswered = function () {
        let winner = false;
        if (this.playerIsNotPenalized()) {
            console.log('Answer was correct!!!!');
            this.addCoins();
            winner = this.didPlayerWin();
        }
        this.nextPlayer();
        return winner;
    };

    playerIsNotPenalized() {
        return !this.inPenaltyBox[this.currentPlayer] || this.isGettingOutOfPenaltyBox;
    }

    addCoins() {
        this.purses[this.currentPlayer] += 1;
        console.log(this.players[this.currentPlayer].getName()+ " now has " +
            this.purses[this.currentPlayer] + " Gold Coins.");
    }

    nextPlayer() {
        this.currentPlayer += 1;
        if (this.currentPlayer == this.players.length)
            this.currentPlayer = 0;
    }

    wrongAnswer = function () {
        console.log('Question was incorrectly answered');
        console.log(this.players[this.currentPlayer].getName()+ " was sent to the penalty box");
        this.inPenaltyBox[this.currentPlayer] = true;

        this.nextPlayer();
        return true;
    };

}

module.exports = Game;