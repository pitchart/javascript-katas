const Player = require('../src/player');


describe("Player", () => {
    it("should be initialized", () => {
        const player = new Player('Player One')

        expect(player.getName()).toBe('Player One');
        expect(player.getPlace()).toBe(0);
        expect(player.getPurse()).toBe(0);
        expect(player.isInPenaltyBox()).toBe(false);
    });

    it("should moved to a new place", () => {
        const player = new Player('Player One')
        player.moveTo(7);

        expect(player.getPlace()).toBe(7);
    });
});