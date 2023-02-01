// TODO 4: See how the game is finished
// TODO 5: Can't answer to a question if no question asked
// TODO XX: Skip console and manage a buffer
// TODO: this.players[this.currentPlayer] do better
// TODO: Test data builder game.test.js  

const Category = require("./category");

class Game {
    players = new Array();
    deck;

    currentPlayer = 0;



    constructor(deck, ...players) {
        if (!this.isPlayable(players.length)) {
            throw new Error("Not enough players to play");
        }
        players.forEach(player => this.addPlayer(player));

        this.deck = deck;

    }

    boardSize = 12;


    isPlayable = function (howManyPlayers) {
        return howManyPlayers >= 2;
    };

    addPlayer = function (player) {
        this.players.push(player);

        console.log(player.getName() + " was added");
        console.log("They are player number " + this.players.length);

        return true;
    };

    hasAWinner() {
        for(const player of this.players){
            if(player.getPurse()>=6){
                return true;
            }
        }
        return false;
    }

    roll = function (die) {
        const currentPlayerInstance = this.players[this.currentPlayer];
        console.log(currentPlayerInstance.getName()+ " is the current player");
        console.log("They have rolled a " + die.value);

        if (currentPlayerInstance.isInPenaltyBox() && !die.isOdd()) {
            console.log(currentPlayerInstance.getName()+ " is not getting out of the penalty box");
            return;
        }

        if (currentPlayerInstance.isInPenaltyBox() && die.isOdd()) {
            console.log(currentPlayerInstance.getName()+ " is getting out of the penalty box");
            currentPlayerInstance.leavePenaltyBox();
        }

        this.moveCurrentPlayer(die);
        console.log("The category is " + this.currentCategory());
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

    moveCurrentPlayer = function(die) {
        this.players[this.currentPlayer].moveTo((this.players[this.currentPlayer].getPlace() + die.value) % this.boardSize);
        console.log(this.players[this.currentPlayer].getName()+ "'s new location is " + this.players[this.currentPlayer].getPlace());
    }

    askQuestion = function () {
        this.assertIsNotInPenaltyBox();
        try {
            console.log(this.deck.getNextQuestion(this.currentCategory()));
        } catch (err) {
            throw "You can't play anymore, sorry";
        }
    }

    wrongAnswer = function () {
        this.assertIsNotInPenaltyBox();
        console.log('Question was incorrectly answered');
        console.log(this.players[this.currentPlayer].getName()+ " was sent to the penalty box");
        this.players[this.currentPlayer].goToPenaltyBox();
    }

    correctAnswer = function () {
        this.assertIsNotInPenaltyBox();
        console.log('Answer was correct!!!!');
        this.addCoins();
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
    currentPlayerIsNotInPenaltyBox(){
        return !this.players[this.currentPlayer].isInPenaltyBox();
    }

    assertIsNotInPenaltyBox(){
        if (!this.currentPlayerIsNotInPenaltyBox()){
            throw new Error("You should go out of the penalty box first");
        }
    }
}

module.exports=Game;