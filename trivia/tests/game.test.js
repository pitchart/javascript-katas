const Game = require("../src/game");
const Player = require("../src/player");
const QuestionsDeckFactory = require("../src/questionsDeckFactory");

describe("Game", () => {

    it("should not be playable with less than two players", () => {
        const startGame = () => new Game(QuestionsDeckFactory.create(), new Player("Player One"));

        expect(startGame).toThrowError("Not enough players to play");
    });

    it("should be playable with two players", () => {
        const startGame = () => new Game(QuestionsDeckFactory.create(), new Player("Player One"), new Player("Player Two"));

        expect(startGame).not.toThrowError("Not enough players to play");
    });

    it("should not have a winner on game started", () => {
        const game =  new Game(QuestionsDeckFactory.create(), new Player("Player One"), new Player("Player Two"));

        expect(game.hasAWinner()).toBeFalsy();
    })

    it("should ...", () => {
        const game = new Game(QuestionsDeckFactory.create(), new Player("Player One"), new Player("Player Two"));
        game.correctAnswer();
        game.correctAnswer();
        game.correctAnswer();
        game.correctAnswer();
        game.correctAnswer();
        game.correctAnswer();
        game.nextPlayer();
        expect(game.hasAWinner()).toBeTruthy();
    });

});