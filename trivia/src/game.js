// TODO 1: Remove isGettingOutOfPenaltyBox from Game class
// TODO 2: Create value object Roll (with die and isOdd methods?)
// TODO 3: Refactor "roll" method in Game class
// TODO 4: See how the game is finished
// TODO 5: Refactor questions feature (pre-loaded questions for each category when instantiating a new Game)

const Category = {
    SCIENCE: 'Science',
    SPORTS: 'Sports',
    POP: 'Pop',
    ROCK: 'Rock'
}

class Game {
    players = new Array();

    questions = new Map();

    currentPlayer = 0;
    isGettingOutOfPenaltyBox = false;



    constructor(...players) {
        if (!this.isPlayable(players.length)) {
            throw new Error("Not enough players to play");
        }
        players.forEach(player => this.add(player));
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
        return !(this.players[this.currentPlayer].getPurse() == 6);
    };


    add = function (player) {
        this.players.push(player);

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

        if (this.players[this.currentPlayer].isInPenaltyBox() && !this.isOdd(die)) {
            console.log(this.players[this.currentPlayer].getName()+ " is not getting out of the penalty box");
            this.isGettingOutOfPenaltyBox = false;
            return;
        }

        if (this.players[this.currentPlayer].isInPenaltyBox() && this.isOdd(die)) {
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
        return !this.players[this.currentPlayer].isInPenaltyBox() || this.isGettingOutOfPenaltyBox;
    }

    addCoins() {
        this.players[this.currentPlayer].addCoin();
        console.log(this.players[this.currentPlayer].getName()+ " now has " +
            this.players[this.currentPlayer].getPurse() + " Gold Coins.");
    }

    nextPlayer() {
        this.currentPlayer += 1;
        if (this.currentPlayer == this.players.length)
            this.currentPlayer = 0;
    }

    wrongAnswer = function () {
        console.log('Question was incorrectly answered');
        console.log(this.players[this.currentPlayer].getName()+ " was sent to the penalty box");
        this.players[this.currentPlayer].goToPenaltyBox();

        this.nextPlayer();
        return true;
    };

}

module.exports = Game;