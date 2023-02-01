const Game = require("../src/game");
const Player = require("../src/player");
const QuestionsDeckFactory = require("../src/questionsDeckFactory");
const Die = require("../src/die");
const QuestionsDeck = require("../src/questionsDeck");

const storeLog = inputs => (outputs.push(inputs));

function gameWithOnePlayer() {
    return new Game(QuestionsDeckFactory.create(), new Player("Player One"));
}

function gameWithTwoPlayers() {
    return new Game(QuestionsDeckFactory.create(), new Player("Player One"), new Player("Player Two"));
}

describe("Game", () => {

    beforeEach(() => {
        outputs = [];
        console["log"] = jest.fn(storeLog);
    });

    it("should not be playable with less than two players", () => {
        const startGame = () => gameWithOnePlayer();

        expect(startGame).toThrowError("Not enough players to play");
    });

    it("should be playable with two players", () => {
        const startGame = () => gameWithTwoPlayers();

        expect(startGame).not.toThrowError("Not enough players to play");
    });

    it("should not have a winner on game started", () => {
        const game =  gameWithTwoPlayers();

        expect(game.hasAWinner()).toBeFalsy();
    })

    it("should have a winner after 6 correct answers", () => {
        const game = gameWithTwoPlayers();
        game.correctAnswer();
        game.correctAnswer();
        game.correctAnswer();
        game.correctAnswer();
        game.correctAnswer();
        game.correctAnswer();
        game.nextPlayer();
        expect(game.hasAWinner()).toBeTruthy();
    });

    it("should be possible to ask a question", () => {
        const game = gameWithTwoPlayers();
        game.roll(new Die(1));
        game.askQuestion();

        expect(outputs).toContain("Science Question 0");
    })

    it("should stop the game if there is no more questions", () => {
        const game = new Game(new QuestionsDeck(), new Player("Player One"), new Player("Player Two"));
        expect(() => game.askQuestion()).toThrowError("You can't play anymore, sorry");
    })

    it("should gain one gold coin when the player answers correctly", () => {
        const game = gameWithTwoPlayers();
        game.roll(new Die(1));
        game.askQuestion();
        game.correctAnswer();

        expect(outputs).toContain("Answer was correct!!!!");
        expect(outputs).toContain("Player One now has 1 Gold Coins.");
    })

    it ("should not be in penalty box on game start", () => {
        const game = gameWithTwoPlayers();
        
        expect(game.currentPlayerIsNotInPenaltyBox()).toBeTruthy();
    })

    it ("should be in penalty box after a wrong answer", () => {
        const game = gameWithTwoPlayers();
        game.roll(new Die(1));
        game.askQuestion();
        game.wrongAnswer();
        
        expect(outputs).toContain("Question was incorrectly answered");
        expect(outputs).toContain("Player One was sent to the penalty box");
        expect(game.currentPlayerIsNotInPenaltyBox()).toBeFalsy();
    })

    it ("should go out of the penalty box on odd roll", () => {
        const game = gameWithTwoPlayers();
        game.roll(new Die(1));
        game.askQuestion();
        game.wrongAnswer();
        game.roll(new Die(1));

        expect(outputs).toContain("Player One is getting out of the penalty box");
        expect(game.currentPlayerIsNotInPenaltyBox()).toBeTruthy();
    })

    it ("should don't go out of the penalty box on even roll", () => {
        const game = gameWithTwoPlayers();
        game.roll(new Die(1));
        game.askQuestion();
        game.wrongAnswer();
        game.roll(new Die(2));

        expect(outputs).toContain("Player One is not getting out of the penalty box");
        expect(game.currentPlayerIsNotInPenaltyBox()).toBeFalsy();
    })

    it ("should not ask question when current player is in the penalty box", () => {
        const game = gameWithTwoPlayers();
        game.roll(new Die(1));
        game.askQuestion();
        game.wrongAnswer();

        expect(()=>game.askQuestion()).toThrowError("You should go out of the penalty box first");
    })

    it ("should not answer to a question when current player is in the penalty box", () => {
        const game = gameWithTwoPlayers();
        game.roll(new Die(1));
        game.askQuestion();
        game.wrongAnswer();

        expect(()=>game.wrongAnswer()).toThrowError("You should go out of the penalty box first");
        expect(()=>game.correctAnswer()).toThrowError("You should go out of the penalty box first");
    })
    
});