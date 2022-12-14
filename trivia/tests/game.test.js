const Game = require("../src/game");
const Player = require("../src/player");

describe("Game", () => {

    it("should not be playable with less than two players", () => {
        const startGame = () => new Game(new Player("Player One"));

        expect(startGame).toThrowError("Not enough players to play");
    });

    it("should be playable with two players", () => {
        const startGame = () => new Game(new Player("Player One"), new Player("Player Two"));

        expect(startGame).not.toThrowError("Not enough players to play");
    });

});