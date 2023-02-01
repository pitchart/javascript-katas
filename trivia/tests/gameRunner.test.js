const OldGameRunner = require('../src/old/gameRunner');
const GameRunner = require("../src/gameRunner");

let outputs = "";
const storeLog = inputs => (outputs += inputs+"\n");

global.Math.random = () => 0.5;


describe("Game runner golden master", () => {
    beforeEach(() => {
        outputs = "";
        console["log"] = jest.fn(storeLog);
    });
    test("Game runner outputs don't break", () => {
        const gameRunner = new OldGameRunner();
        gameRunner.play();

        expect(outputs).toMatchSnapshot();
    });

    test("Game runner outputs don't break", () => {
        const oldGameRunner = new OldGameRunner();
        oldGameRunner.play();
        const firstAttemptOutputs = outputs;
        outputs= "";
        const gameRunner = new GameRunner();
        gameRunner.play();
        const secondAttemptOutputs = outputs;

        expect(firstAttemptOutputs).toBe(secondAttemptOutputs);
    });
});