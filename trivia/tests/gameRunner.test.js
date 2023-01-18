const GameRunner = require('../src/gameRunner');

let outputs = "";
const storeLog = inputs => (outputs += inputs+"\n");

global.Math.random = () => 0.5;


describe("Game runner golden master", () => {
    beforeEach(() => {
        outputs = "";
        console["log"] = jest.fn(storeLog);
    });
    test("Game runner outputs don't break", () => {
        const gameRunner = new GameRunner();
        gameRunner.play();

        expect(outputs).toMatchSnapshot();
    });

    test("Game runner outputs don't break", () => {
        let gameRunner = new GameRunner();
        gameRunner.play();
        const firstAttemptOutputs = outputs;
        outputs= "";
        gameRunner = new GameRunner();
        gameRunner.newPlay();
        const secondAttemptOutputs = outputs;

        expect(firstAttemptOutputs).toBe(secondAttemptOutputs);
    });
});