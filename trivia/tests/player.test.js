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

    it("should add a coin to the purse", () => {
        const player = new Player('Player One')
        player.addCoin();

        expect(player.getPurse()).toBe(1);
    });

    it("should go to penalty box", () => {
        const player = new Player('Player One')
        player.goToPenaltyBox();

        expect(player.isInPenaltyBox()).toBe(true);
    });

    it("should leave penalty box", () => {
        const player = new Player('Player One')
        player.goToPenaltyBox();
        player.leavePenaltyBox();

        expect(player.isInPenaltyBox()).toBe(false);
    });
});