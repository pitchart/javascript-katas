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
        const game = new Game(new QuestionsDeck(), new Player("Player one"), new Player("Player two"));
        expect(() => game.askQuestion()).toThrowError("You can't play anymore, sorry");
    })
});